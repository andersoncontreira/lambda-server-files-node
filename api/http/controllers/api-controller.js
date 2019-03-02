const fs = require('fs')
const ApiResponse = require('./../api-response')

if (typeof(process.env.VERSION) === "undefined") {
	process.env.VERSION = "1.0.0"
}


/**
 * 
 */
class ApiController {
	
	/**
	 * 
	 */ 
	static index(request, response) {
		
		let apiResponse = new ApiResponse(request, response)
		
		apiResponse.body = {
			'ApiVersion' : process.env.VERSION
		}
		
		apiResponse.json()
	}

	/**
	 * 
	 */ 
	static ping(request, response) {
		let apiResponse = new ApiResponse(request, response)
		
		apiResponse.body = 'PONG'

		apiResponse.json()
	}

	/**
	 * 
	 */ 
	static xml(request, response) {
		let apiResponse = new ApiResponse(request, response)
		
		console.log(process.cwd())
		fs.readFile(process.cwd() + '/samples/xml-sample.xml', (err, data) => {

  			if (err) throw err;
  			apiResponse.body = data	

  			apiResponse.xml()

		});
		
		
	}

	/**
	 * 
	 */ 
	static html(request, response) {
		let apiResponse = new ApiResponse(request, response)
		
		apiResponse.body = '<html><head><title>test</title></head><body>test</body></html>'

		apiResponse.html()
	}
}


module.exports = ApiController


