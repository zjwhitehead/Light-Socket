console.log("loaded js");

$(document).ready(function() {
	var socket = io();

	$("#led-on").click(function(){ 
    socket.emit('led control', 'on');

	});
	$("#led-off").click(function(){ 
    socket.emit('led control', 'off');
	});

	socket.on('led message', function(msg){
		if (msg == "on") {
			$('#led').addClass("led-on");
		}
		else if(msg == "off"){
			$('#led').removeClass("led-on");
		}
  });
});