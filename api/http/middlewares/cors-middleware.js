//cors-middleware
class CorsMiddleware {
	
	static filter(request, response, next) {

		console.log('CorsMiddleware.filter ... ')

		// cors headers
 		response.setHeader('Access-Control-Allow-Origin', '*')
 		response.setHeader('Access-Control-Allow-Credentials', 'true')

		//something to do here
		
		//next middleware
		next()
		return
	}
}

module.exports = CorsMiddleware