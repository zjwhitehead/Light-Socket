console.log("loaded js");

$(document).ready(function() {
	$("#led-on").click(function(){ 
		$.getJSON( "/toggle-led/on", function(data, status ) {
		  if (data.success == "true"){
	   		alertSuccess(data.led.toString());
		  }
		  else{
	   		alertFailure();
		  }
		  console.log(data);
		});
	});
	$("#led-off").click(function(){ 
	  $.getJSON( "/toggle-led/off", function(data, status ) {
		  if (data.success == "true"){
	   		alertSuccess(data.led.toString());
		  }
		  else{
	   		alertFailure();
		  }
		  console.log(data);
		});
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