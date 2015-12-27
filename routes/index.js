module.exports = function(io) {
    var app = require('express');
    var router = app.Router();
	//var GPIO = require('onoff').Gpio;

	/* GET home page. */
	router.get('/', function(req, res, next) {
	  	res.render('index', { title: 'Pi Control' });
	});

    return router;
}
