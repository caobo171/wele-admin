const proxy = require('http-proxy-middleware')

module.exports = function (app) {
	app.use(proxy(['/shopify', '/graphql','/image-proxy', '/api','/adu'], {
		'target': 'http://localhost:8080/',
		'secure': false
	}))
}