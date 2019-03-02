const express = require('express');
const serverlessExpress = require('aws-serverless-express');
const bodyParser = require('body-parser')

const v1ApiRoutes = require('../api/http/routes/v1/api-routes')
const corsMiddleware = require('../api/http/middlewares/cors-middleware')
const customHeadersMiddleware = require('../api/http/middlewares/custom-headers-middleware')
const convertBinaryFilesToBase64 = require('../api/http/middlewares/convert-binary-files-to-base64-middleware')

const router = new express.Router();

//App Variables
process.env.VERSION = '1.0.0'
process.env.ARCH_VERSION = 'v1'

function mapRoutes(){

	v1ApiRoutes.mapRoutes(router);

    return router;
}


exports.execute = function (event, context, callback) {

	const app = express();
	
	//custom middlewares
    app.use(function(req, res, next) {console.log('request: ' + req.path); next()})
    app.use(corsMiddleware.filter)
    app.use(customHeadersMiddleware.apply)
    

    //handle static image files to base64
    //Limitação do API Gateway
    if (process.env.USE_BASE64) {
    	convertBinaryFilesToBase64.callback = callback
    	app.use(convertBinaryFilesToBase64.apply)	
    }


	//server static files
	app.use("/", express.static('public'));

	//middlewares
    app.use(bodyParser.json({limit: '20mb'}));
    app.use(bodyParser.urlencoded({limit: '20mb', extended: false }));
        
    //routes
	app.use(mapRoutes());

    // lambda check
	const isInLambda = !!process.env.LAMBDA_TASK_ROOT;
	if (isInLambda) {
		
		const binaryMimeTypes = [
		  'image/*',
		  'image/jpeg',
		  'image/png',
		  'image/svg+xml',
		];

		const server = serverlessExpress.createServer(app,null, binaryMimeTypes);
		serverlessExpress.proxy(server, event, context)    
	} else {
	    app.listen(3000, () => console.log(`Listening on 3000`));
	}
}