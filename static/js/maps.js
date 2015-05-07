var map;
var geocoder = new google.maps.Geocoder(); 
// https://developers.google.com/maps/documentation/geocoding/

var defaultMarker = {
    animation: google.maps.Animation.DROP,
    draggable: true
}

/*
marker = new google.maps.Marker({
    icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
    other colors: red, purple, yellow, green
});
*/

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
    var place1 = document.getElementById("place1");
    var a = place1.value;
    if (a == ""){
	console.log("put in an address"); //can you flash from javascript?
    } else { 
	place1.value = "";
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
		draggable: defaultMarker.draggable,
		icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
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
	   
	} else {
	    console.log("no work");
	}
    });
}



var service = new google.maps.DistanceMatrixService();



var route = function(origin, destination, mode){
    return {
	origin : origin,
	destination : destination,
	mode : google.maps.TravelMode[mode],
	time : "",
	distance : "",
	calculate : function(){
	    service.getDistanceMatrix({
		origins: [this.origin],
		destinations: [this.destination],
		travelMode: this.mode,
		unitSystem: google.maps.UnitSystem.IMPERIAL,
	    }, callback);
	    // after successful call to API, calls function callback
	    function callback(response, status) {		
		var element = response.rows[0].elements[0];
		this.distance = element.distance.text;		
		this.time = element.duration.text;		
	    } 
	},
	getDistance : function(){ return distance; },
	getTime : function(){ return time; }
	
    }
}

var r = route("275 W. 96th St. NY","345 Chambers St. NY","BICYCLING");
r.calculate();


var getDistance = function(origin, destination, mode){
    //origin and destination can be any type of maps object thing
    //mode can be: WALKING, DRIVING (default), BICYCLING
    //google.maps.TravelMode.WALKING 
    //var distance;
    //var time;
    service.getDistanceMatrix({
	origins: [origin],
	destinations: [destination],
	travelMode: google.maps.TravelMode.DRIVING,
	//transitOptions: TransitOptions,
	unitSystem: google.maps.UnitSystem.IMPERIAL,
    }, callback);
    // after successful call to API
    function callback(response, status) {
	var element = response.rows[0].elements[0];
        route.distance = element.distance.text;
        route.time = element.duration.text;

	//console.log("time: "+time);
	//console.log("distance: "+distance);
	
	//return {"time": time, "distance":distance};
    } 
    
}


google.maps.event.addDomListener(window, 'load', initialize);
document.getElementById("mark-address").addEventListener("click",placeMarker);
document.getElementById("current").addEventListener("click",markCurrent);

