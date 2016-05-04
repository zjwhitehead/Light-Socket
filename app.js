var express      = require( "express"   );
var socket_io    = require( "socket.io" );

// Express
var app          = express();

// Socket.io
var io           = socket_io();
app.io           = io;

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//var GPIO = require('onoff').Gpio;

var routes = require('./routes/index')(io);
var iot = require('./lib/iot');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

var thingShadows = iot.shadow();

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


//var led_red = new GPIO(4, 'out');
//var led_yellow = new GPIO(17, 'out');
//var led_green = new GPIO(27, 'out');

io.on('connection', function(socket) {
    socket.on('traffic control', function(msg){
      if (msg) {
        //var TrafficLightState = {"state":{"desired":{msg}}};
        //clientTokenUpdate = thingShadows.update('TrafficLight', TrafficLightState  );
      }

      io.emit('traffic message', msg);
    });


    socket.on('led control', function(msg){
      //use the GPIO pin number your led is connected to
      //var led = new GPIO(14, 'out');

      if (msg == "on") {
        //led.writeSync(1);

        console.log('turned on ');
      }
      else if(msg == "off"){
        //led.writeSync(0);
        console.log('turned off');
      }
      io.emit('led message', msg);
    });

    socket.on('wemo control', function(msg){
      if (msg == "on") {
       // led.writeSync(1);
        wemoClient.setBinaryState(1);
        console.log('turned on ');

      }
      else if(msg == "off"){
       // led.writeSync(0);
        wemoClient.setBinaryState(0);

        console.log('turned off');
      }

      wemoClient.on('binaryState', function(value) {
        if (value == 1) {
          io.emit('wemo message', "on");
        }else{
          io.emit('wemo message', "off");
        }
      });
  });
});

var clientTokenUpdate;

thingShadows.on('connect', function() {
  console.log("connected to aws iot");
//
// After connecting to the AWS IoT platform, register interest in the
// Thing Shadow named 'RGBLedLamp'.
//
  thingShadows.register( 'TrafficLight' );
//
// 5 seconds after registering, update the Thing Shadow named
// 'RGBLedLamp' with the latest device state and save the clientToken
// so that we can correlate it with status or timeout events.
//
// Note that the delay is not required for subsequent updates; only
// the first update after a Thing Shadow registration using default
// parameters requires a delay.  See API documentation for the update
// method for more details.
//
    setTimeout( function() {

// The update method returns a clientToken; if non-null, this value will
// be sent in a 'status' event when the operation completes, allowing you
// to know whether or not the update was successful.  If the update method
// returns null, it's because another operation is currently in progress and
// you'll need to wait until it completes (or times out) before updating the
// shadow.
//
       if (clientTokenUpdate === null)
       {
          console.log('update shadow failed, operation still in progress');
       }
       }, 5000 );
    });

thingShadows.on('status',
    function(thingName, stat, clientToken, stateObject) {
       console.log('received '+stat+' on '+thingName+': '+
                   JSON.stringify(stateObject));
  //
  // These events report the status of update(), get(), and delete()
  // calls.  The clientToken value associated with the event will have
  // the same value which was returned in an earlier call to get(),
  // update(), or delete().  Use status events to keep track of the
  // status of shadow operations.
  //
    });

thingShadows.on('delta',
    function(thingName, stateObject) {
       console.log('received got an update on '+thingName+': '+
                   JSON.stringify(stateObject.state));
        updateLeds(stateObject.state);
    });

thingShadows.on('timeout',
    function(thingName, clientToken) {
       console.log('received timeout on '+thingName+
                   ' with token: '+ clientToken);

  // In the event that a shadow operation times out, you'll receive
  // one of these events.  The clientToken value associated with the
  // event will have the same value which was returned in an earlier
  // call to get(), update(), or delete().
  //
    });

function updateLeds(data) {
  if (data) {
    console.log("new data");
    if (data.red !== undefined){
      console.log("got red ", data.red ? 1 :0);
      //led_red.writeSync( data.red ? 1 :0);
    }
    if (data.yellow !== undefined){
        console.log("got yellow ", data.yellow ? 1 :0);
        //led_yellow.writeSync( data.yellow ? 1 :0);
    }
    if (data.green !== undefined){
      console.log("got green ", data.green ? 1 :0);
      //led_green.writeSync( data.green ? 1 :0);
    }
  }
}

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});



module.exports = app;
