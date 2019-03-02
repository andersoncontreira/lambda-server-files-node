const ApiResponse = require('./../../api-response')

class IndexController {

    static index(request, response) {

        let apiResponse = new ApiResponse(request, response)
		
		apiResponse.body = {
			'v1' : 'OK'
		}
		
		apiResponse.json()
    }

}

module.exports = IndexController