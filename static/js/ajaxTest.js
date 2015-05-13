
$(function() {
    $('a#calculate').bind('click', function() {
	$.getJSON($SCRIPT_ROOT + '/_add_numbers', { //the url is the app.py function that analyzes it
            a: $('input[name="a"]').val(), //here is where you need to grab data from the html
            b: $('input[name="b"]').val()
	}, function(data) {
            $("#result").text(data.result);  //Currently set to insert the return from the python into the result data
	});
	return false;
    });
});
