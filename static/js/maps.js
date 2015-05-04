
var map;
var geocoder;
var defaultMarker = {
    animation: google.maps.Animation.DROP,
    draggable: true
}

var initialize = function(){
    var mapOptions = {
        center: { lat: 40.8, lng: -73.95 },
        zoom: 12,
	mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById('map-canvas'),
				  mapOptions);

    /*currentLocation = loadLocation(setMarker(marker), function(error){	
	switch(error.code) {
	case error.PERMISSION_DENIED:
	    console.log("User denied permission.");
	    break;
	case error.POSITION_UNAVAILABLE:
	    console.log("Geolocation/GPS unavailable.");
	    break;
	case error.TIMEOUT:
	    console.log("Geolocation request timed out.");
	    break;
	case error.UNKNOWN_ERROR:
	    console.log("Something wack happened.");
	    break;
    	}*/
    if (navigator.geolocation) {
	browserSupportFlag = true;
	navigator.geolocation.getCurrentPosition(function(position) {
	    initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
	    map.setCenter(initialLocation);
	    var marker = new google.maps.Marker({
		    map: map,
		    position: initialLocation,
		    animation: defaultMarker.animation,
		    draggable: defaultMarker.draggable
	    });
	}, function() {
	    //handleNoGeolocation(browserSupportFlag);
	    console.log("nope");
	});
    }
    // Browser doesn't support Geolocation
    else {
	browserSupportFlag = false;
	//handleNoGeolocation(browserSupportFlag);
	console.log("nope");
    }


/*var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var location = new google.maps.LatLng(latitude, longitude);    
    console.log(location);
    */

    /*var marker = new google.maps.Marker({
	position: location,         
	map: map,
	title: 'Hello World!'
    });*/
}

var placeMarker = function(){    
    var address = document.getElementById("address");
    var a = address.value;
    address.value = "";
    console.log(a);
    geocoder = new google.maps.Geocoder();
    geocoder.geocode( { 'address': a}, function(results, status) {
	if (status == google.maps.GeocoderStatus.OK) {
	    //for (var i = 0; i < results.length; i++){
		var marker = new google.maps.Marker({
		    map: map,
		    position: results[0].geometry.location,
		    animation: defaultMarker.animation,
		    draggable: defaultMarker.draggable
		});
	    map.panTo(marker.getPosition());
	    //}

	} else {
	    alert('Geocode was not successful for the following reason: ' 
		  + status);
	}
    });
}

function loadLocation (callback, error){
    latlng = {};

    function getLocation(pos){
	latlng["latitude"] = pos.coords.latitude;
	latlng["longitude"] = pos.coords.longitude;
	callback(latlng);
    }

    var load = function() {
	if (navigator.geolocation) {
	    console.log("Loading location now....");
	    navigator.geolocation.getCurrentPosition(getLocation, error);
	}
    }();

};


//function
/*function loadScript(){
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp' +
      '&signed_in=true&callback=initialize';
    document.body.appendChild(script);
}

window.onload = loadScript;*/

google.maps.event.addDomListener(window, 'load', initialize);
document.getElementById("submitadd").addEventListener("click",placeMarker);
