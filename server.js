const server = require('./function/server-files');
const Context = require('./helpers/aws/mocks/context')
const Event = require('./helpers/aws/mocks/event')

const isInLambda = !!process.env.LAMBDA_TASK_ROOT;
if (!isInLambda) {
	
	let event = Event;
	let context = Context;

	function callback(error, response) {

		//console.log('server callback', error, response)
		console.log('call callback')
		response.end()

	}

	server.execute(event, context, callback);
}
