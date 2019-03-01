//https://dev.to/brightdevs/how-to-convert-an-express-app-to-aws-lambda--44gc
const server = require('./function/server-files');

const VERSION = '1.0'
const ARCH_VERSION = 'v1'

module.exports.handler = function (event, context, callback) {

	server.execute(event, context)

	// let body = 'dev..'
 //      let statusCode = 200
 //      let headers = {
 //        //'Content-type': 'application/json',
 //        'Access-Control-Allow-Origin': '*',
 //        'Access-Control-Allow-Credentials': true,
 //        "Custom-Service-Version": VERSION,
 //        "Custom-Service-Arch-Version": ARCH_VERSION
 //      }

 //     body = event ;

 //     response = createJsonResponse(headers, statusCode, body) 

 //    callback(null, response)
}

function createResponse(headers, statusCode, body) {
	
	headers['Content-type'] = 'text/html'
	
    let response = {}
    
    response.statusCode = statusCode
    response.headers = headers
    response.body = body

    return response
}

function createJsonResponse(headers, statusCode, body) {
	
	headers['Content-type'] = 'application/json'
	
    let response = {}

    response.statusCode = statusCode
    response.headers = headers
    //response.body = JSON.stringify(body)
    response.body = body
    
    return response

}