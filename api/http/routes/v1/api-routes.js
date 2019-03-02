let IndexController = require('./../../controllers/v1/index-controller')
let ApiController = require('./../../controllers/api-controller')


class ApiRoutes {

	static mapRoutes (router) {

		
		router.get('/api/', (request, response) => ApiController.index(request, response));
		router.get('/api/test-html', (request, response) => ApiController.html(request, response));
		router.get('/api/test-xml', (request, response) => ApiController.xml(request, response));

		router.get('/api/ping', (request, response) => ApiController.ping(request, response));

		router.get('/api/v1', (req, res) => IndexController.index(req, res));

	    router.get('/api/v1/version', (req, res) => ApiController.index(req, res));

	    router.post('/api/v1/echo', (req, res) => res.send({...req.body}));

	    console.log('mapping /api/v1 ?')
	}
}

module.exports = ApiRoutes