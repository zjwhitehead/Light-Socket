$(document).ready(function() {
	var socket = io();

	$("#red-light").change(function() {
		var message = {"red": this.checked}
    	socket.emit('traffic control', message);
	});

	$("#yellow-light").change(function() {
		var message = {"yellow": this.checked}
    	socket.emit('traffic control', message);
	});

	$("#green-light").change(function() {
		var message = {"green": this.checked}
    	socket.emit('traffic control', message);
	});

});