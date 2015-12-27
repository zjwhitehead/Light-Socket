var express = require('express');
var router = express.Router();
//var GPIO = require('onoff').Gpio;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/toggle-led-off', function(req, res, next) {
	//var    led = new GPIO(14, 'out');
	//led.writeSync(0);
  	res.render('index', { alert: 'Toggled off' });
});

router.get('/toggle-led-on', function(req, res, next) {
	//var    led = new GPIO(14, 'out');
	//led.writeSync(1);
  	res.render('index', { alert: 'Toggled on' });
});

module.exports = router;
