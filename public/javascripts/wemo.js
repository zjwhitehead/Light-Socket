console.log("loaded wemo js");

$(document).ready(function() {
	var socket = io();

	$("#wemo-on").click(function(){ 
    	socket.emit('wemo control', 'on');

	});
	$("#wemo-off").click(function(){ 
    	socket.emit('wemo control', 'off');
	});

	socket.on('wemo message', function(msg){
		console.log("message = ", msg);
		if (msg == "on") {
			$('#wemo').addClass("led-on");
		}
		else if(msg == "off"){
			$('#wemo').removeClass("led-on");
		}
  });
});