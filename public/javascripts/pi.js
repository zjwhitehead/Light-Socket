console.log("loaded js");

$(document).ready(function() {
	var socket = io();

	$("#led-on").click(function(){ 
    socket.emit('led control', 'on');
    console.log("Set on");

	});
	$("#led-off").click(function(){ 
    socket.emit('led control', 'off');
    console.log("Set off");
	});

	socket.on('led message', function(msg){
		alertSuccess(msg);
  });

	function alertSuccess(status) {
		$('.alerts').append(
    '<div class="alert alert-success alert-dismissable">'+
        '<button type="button" class="close" ' + 
                'data-dismiss="alert" aria-hidden="true">' + 
            '&times;' + 
        '</button>' + 
        'LED Toggled ' + status +
     '</div>');
	}
	function alertFailure() {
		$('.alerts').append(
    '<div class="alert alert-danger alert-dismissable">'+
        '<button type="button" class="close" ' + 
                'data-dismiss="alert" aria-hidden="true">' + 
            '&times;' + 
        '</button>' + 
        'LED Toggle Failed' +
     '</div>');
	}
});