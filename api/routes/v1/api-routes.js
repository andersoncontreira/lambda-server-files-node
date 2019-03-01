
class ApiRoutes {

	static mapRoutes (router) {

		router.get('/api/v1', (req, res) => res.send('hello'));

	    router.get('/api/v1/version', (req, res) => res.send({version: '1'}));

	    router.post('/api/v1/echo', (req, res) => res.send({...req.body}));

	    console.log('mapping /api/v1')
	}
}

module.exports = ApiRoutes