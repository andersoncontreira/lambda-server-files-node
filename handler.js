//https://dev.to/brightdevs/how-to-convert-an-express-app-to-aws-lambda--44gc
const server = require('./function/server-files');

module.exports.handler = function (event, context, callback) {

	server.execute(event, context)

 //    callback(null, response)
}
