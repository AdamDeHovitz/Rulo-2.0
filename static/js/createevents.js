var map;
var geocoder = new google.maps.Geocoder();
// https://developers.google.com/maps/documentation/geocoding/

var data = {}; //keep track of global data (location, markers)
//things: userCurrent, marker, latlong


var defaultMarker = {
    animation: google.maps.Animation.DROP,
    draggable: false
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

          if (data.marker != null) { data.marker.setMap(null); }
		      var marker = new google.maps.Marker({
		           map: map,
		           position: results[0].geometry.location,
		           animation: defaultMarker.animation,
		           draggable: defaultMarker.draggable
		       });
           var m = marker.getPosition();
           displayRouteInfo(m);
           data.latlong = m;
        	 map.panTo(m);
        	 data.marker = marker;


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
       if (data.marker != null) { data.marker.setMap(null); }
	     var marker = new google.maps.Marker({
		       map: map,
		       position: initialLocation,
		       animation: defaultMarker.animation,
		       draggable: defaultMarker.draggable,
		       icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
	    });
      data.latlong = marker.getPosition();
      data.marker = marker;
      data.userCurrent = marker.getPosition();
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

/*var addPlace = function(latlong){
    data.place = latlong;
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
}*/

var displayRouteInfo = function(dest){
    if ("geolocation" in navigator) {
       browserSupportFlag = true;
	     navigator.geolocation.getCurrentPosition(function(position) {
	         var initialLocation = new google.maps.LatLng(position.coords.latitude,
              position.coords.longitude);
           var mode = "";
           var radios = document.getElementsByName("mode");
           for (var i = 0; i < radios.length; i++){
      	      if (radios[i].checked){ mode = radios[i].value; }
           };
           if (mode == "") { mode = "DRIVING"};
          service.getDistanceMatrix({
                   origins: [initialLocation],
              		 destinations: [dest],
              		 travelMode: mode,
              		 unitSystem: google.maps.UnitSystem.IMPERIAL,
            }, callback);
          	    // after successful call to API, calls function callback
          function callback(response, status) {
             var element = response.rows[0].elements[0];
             var distance = element.distance.text;
             var time = element.duration.text;
             var div = document.getElementById("route-info");
             div.innerHTML = "Distance: "+distance+"<br>Time: "+time;
          };
       });

    }
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
            };
       },
       getDistance : function(){ return distance; },
    	 getTime : function(){ return time; }
    }
}



var getRoute = function(){
    var mode;
    var radios = document.getElementsByName("mode");
    for (var i = 0; i < radios.length; i++){
	      if (radios[i].checked){
	      mode = radios[i].value
	      }
    }
    var p1 = document.getElementById("place1").value;
    var p2 = document.getElementById("place2").value;
    var r = route(p1, p2, mode);
    r.calculate();
    return r;
}


//------- @ADAM THIS IS WHAT WE NEED TO SEND TO PYTHON ---------

var newEvent = function(){
    var e = {};
    e.ename = document.getElementById("ename").value;
    e.desc = document.getElementById("desc").value;
    e.numb = document.getElementById("numb").value;
    e.price = document.getElementById("price").value;
    e.latlong = data.latlong;

    if (data.latlong == data.userCurrent){
       e.userlocs = [];
       //e.userlocs.append({user:<username>, loc: data.userCurrent})
    }
    //check to make sure none are blank
}



google.maps.event.addDomListener(window, 'load', initialize);
document.getElementById("mark-address").addEventListener("click",placeMarker);
document.getElementById("current").addEventListener("click",markCurrent);
document.getElementById("go").addEventListener("click",newEvent);

/*
IN MARIONETTE:




*/
