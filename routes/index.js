module.exports = function(io) {
    var app = require('express');
    var router = app.Router();
	//var GPIO = require('onoff').Gpio;

	/* GET home page. */
	router.get('/', function(req, res, next) {
	  res.render('index', { title: 'Pi Control' });
	});

	router.get('/toggle-led/off', function(req, res, next) {
		//var    led = new GPIO(14, 'out');
		//led.writeSync(0);
	  	res.json({"success":"true", "led":"off"});
	});

	router.get('/toggle-led/on', function(req, res, next) {
		//var    led = new GPIO(14, 'out');
		//led.writeSync(1);
	  	res.json({"success":"true", "led":"on"});
	});
	
    io.on('connection', function(socket) { 
        console.log("Connected in router");
    });

    return router;
}
