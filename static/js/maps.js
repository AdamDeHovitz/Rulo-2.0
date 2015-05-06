
var map;
var geocoder = new google.maps.Geocoder();
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

}

var placeMarker = function(){    
    var address = document.getElementById("address");
    var a = address.value;
    address.value = "";
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
	    addPlace(marker.getPosition());
	    //}

	} else {
	    alert('Geocode was not successful for the following reason: ' 
		  + status);
	}
    });
}

var markCurrent = function(){
    if ("geolocation" in navigator) {
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
	    console.log(marker.getPosition());
	    addPlace(marker.getPosition());
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
    

}

var addPlace = function(latlong){
    geocoder.geocode({'location': latlong}, function(results,status){
	if (status == google.maps.GeocoderStatus.OK) {
	    var address = results[0].formatted_address;

	    var li = document.createElement("li");
	    var node = document.createTextNode(address);
	    li.appendChild(node);

	    var element = document.getElementById("list");
	    element.appendChild(li);

	    //var list = document.getElementById("list");
	    /*var li = document.createElement("li");
	    var node = document.createTextNode(address);
	    list.appendChild(li.appendChild(node));*/
	    //list.append("<li>"+address+"<li>");
	} else {
	    console.log("no work");
	}
    });
}


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
document.getElementById("mark-address").addEventListener("click",placeMarker);
document.getElementById("current").addEventListener("click",markCurrent);
