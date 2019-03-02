const fs = require("fs")
const mime = require('mime-types')
const ApiResponse = require('./../api-response')

let imageTypes = /image\/*/

let devMode = true

var callback = null

class ConvertBinaryFilesToBase64 {

	static get callback() {
		return callback
	}

	static set callback(cb) {
		callback = cb
	}

	static apply (request, response, next) {

		const isInLambda = !!process.env.LAMBDA_TASK_ROOT;
		//Se não for a lambda function não precisa fazer essa trativa	
		if (!isInLambda && devMode == false) {
			console.log('skip conversion')
			next();
			return;
		}

		try {

			let filePath = process.cwd() + '/public'
			filePath += request.path

			console.log('filePath: ',filePath)

			

			if (fs.existsSync(filePath)) {
    			//file exists
    			
    			// pega o mimetype
    			let mimetype = mime.lookup(filePath)

    			console.log('mimetype: ',mimetype)

				//verifica se é uma imagem
    			if(mimetype.match(imageTypes)) {

					console.log("mimetype do tipo imagem")    				
    				fs.readFile(filePath, 'utf8', (error, data) => {

						if (error) {
							console.error("Error", error.message)	

    						let apiResponse = new ApiResponse(request, response)
    						apiResponse.body = "Unable to ready the image file"
    						apiResponse.json()	

						} else {

							let base64Encoded = Buffer.from(data).toString('base64')
    						let apiResponse = new ApiResponse(request, response, callback)
    						apiResponse.image(mimetype, base64Encoded)		

						}
						
    				});

    				
    			} else {
    				next();
    			}
  			} else {
  				next();
  			}
		
		} catch(err) {
  			console.error(err)
  			next();
		}

		
	}
}

module.exports = ConvertBinaryFilesToBase64

// let result = "data:image/png;base64,....".replace(/data:image\/png;base64,/, '');
//   return {
//     statusCode: 200,
//     headers: {
//       'Content-Type': 'image/png'
//     },
//     body: result,
//     isBase64Encoded: true
//   }