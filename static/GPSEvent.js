console.log("is this working?");

var map;
var geocoder;
var marker;

var action = function () {
    console.log("button action begun");
    geocoder = new google.maps.Geocoder();
    var address;

    var mapOptions = {
	     zoom: 14
    };

    map = document.getElementById('map-test');

    if (!navigator.geolocation){
       map.innerHTML = "Geolocation is not supported by this browser. Please update to experience our awesomeness.";
       return;
    }


    var ahShit = function() {
      map.innerHTML = "We were unable to retrieve your location, our apologies.";
	console.log("ah noes,its an error");
	return new google.maps.LatLng(51.208317, 3.224883);
    };
    
    
    var hellYeah = function(position) {
        mappy = new google.maps.Map(map, mapOptions);
	
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
	var locationArray = [latitude, longitude];
	
        var location = new google.maps.LatLng(latitude, longitude);
        mappy.setCenter(location);
        console.log('map function finished. Latitude is: ' + latitude + " Longitude is: " + longitude);
	console.log(location);
	geocoder.geocode({'latLng': location}, function(results, status){
	    if (status == google.maps.GeocoderStatus.OK){
		if (results[0]) {
              marker = new google.maps.Marker({
		position: geographicCoord,
		map: mappy
              });
		    console.log('assign address');
		    address = results[0].formatted_address;
		    console.log(results[0].formatted_address);
		    var wordPlace = document.getElementById('map-location');
		    var mapi = document.getElementById('map-test');
		    console.log(address);
		    wordPlace.innerHTML = address;
		    console.log(map);
		}
	    } else {
		alert("Geocoder failed due to: " + status);
		address = "An error has arisen with the location identification.";
	    }
	});

	console.log('address actions completed');
        return locationArray
    };
    
    var geographicCoord = navigator.geolocation.getCurrentPosition( hellYeah, ahShit);
    console.log('locating complete.');
    console.log("button action complete");
}

<<<<<<< HEAD
=======
var disctance = function (origin, destination){
    var service = google.maps.DistanceMatrixService();

    service.getDistanceMatrix(
	{
	    origins: origin,
	    destinations: destination,
	    unitSystem: google.maps.UnitSystem.IMPERIAL
	}, callback);
    
    function callback (response, status) {
	if (status == google.maps.GeocoderStatus.OK){
	    var origins = response.originAddress;
	    var destinations = response.destinationAddresses;
	    
	    for (var i = 0; i < origins.length; i++){
		var results = response.rows[i].elements;
		for (var j = 0; j < results.length; j++){
		    var element = results[j];
		    var distance = element.distance.text;
		    var duration = element.duration.text;
		    var from = origins[i];
		    var to = origins[i];
		}
	    }
	}
	else {
	    alert("Distance Calculation failed due to: " + status);
	}
    }
}

>>>>>>> 872006ab3736bc76b914cc01d999aeef371cd1b7
/*var showPosition = function(position) {
    var lat = document.getElementById("lat");
    var long = document.getElementById("long");

    lat.value = position.coords.latitude;
    console.log(lat.value + "Hellooooo");
    long.value = position.coords.longitude;
    console.log(long.value + "heyyyyyyyyy");}

    function getLocation() {
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
    }
    }
var x = showPosition(position)
x()*/
