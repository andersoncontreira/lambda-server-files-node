const express = require('express');
const serverlessExpress = require('aws-serverless-express');
const bodyParser = require('body-parser')

const v1ApiRoutes = require('../api/routes/v1/api-routes')

function mapRoutes(){

    const router = new express.Router();

	v1ApiRoutes.mapRoutes(router);

    return router;
}


exports.execute = function (event, context) {

	const app = express();
	
	app.use(mapRoutes());

	//static files
	app.use("/", express.static('public'));

    app.use(bodyParser.json({limit: '20mb'}));
    app.use(bodyParser.urlencoded({limit: '20mb', extended: false }));
    


	const isInLambda = !!process.env.LAMBDA_TASK_ROOT;
	if (isInLambda) {
		const server = serverlessExpress.createServer(app);
		serverlessExpress.proxy(server, event, context)    
	} else {
	    app.listen(3000, () => console.log(`Listening on 3000`));
	}
}