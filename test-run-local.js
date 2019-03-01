const server = require('./function/server-files');

const isInLambda = !!process.env.LAMBDA_TASK_ROOT;
if (!isInLambda) {
	let event = null;
	let context = null;
	server.execute(event, context);
}
