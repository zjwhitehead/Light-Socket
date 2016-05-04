module.exports = function(io) {
  var app = require('express');
  var router = app.Router();

	/* GET home page. */
	router.get('/', function(req, res, next) {
	  	res.render('index', { title: 'Pi Light Control' });
	});

		/* GET home page. */
	router.get('/wemo', function(req, res, next) {
	  	res.render('wemo', { title: 'Wemo Light Control' });
	});

	router.get('/trafficlight', function(req, res, next) {
	  	res.render('trafficlight', { title: 'Traffic Light Control' });
	});

    return router;
}
