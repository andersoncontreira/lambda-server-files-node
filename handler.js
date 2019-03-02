//https://dev.to/brightdevs/how-to-convert-an-express-app-to-aws-lambda--44gc
const server = require('./function/server-files');

module.exports.handler = function (event, context, callback) {

	let customCallback = function (error, response) {
		console.log('custom callback')

		if (error) {
			
			context.fail(error)
			
		} else {

			context.succeed(response)
		}

		callback(error, response)
		
	}
	server.execute(event, context, customCallback)
	//callback(null, 'test')

}
