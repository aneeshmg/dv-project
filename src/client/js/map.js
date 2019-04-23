function initMap(){
	var options = {
		types: ['(cities)'],
		zoom:5,
		center: {lat: 35.024, lng: -111.887},
		styles: 
		[
		  {"elementType": "geometry","stylers": [{"color": "#212121"}]},
		  {"elementType": "labels.icon","stylers": [{"visibility": "off"}]},
		  {"elementType": "labels.text.fill","stylers": [{"color": "#757575"}]},
		  {"elementType": "labels.text.stroke","stylers": [{"color": "#212121"}]},
		  {"featureType": "administrative","elementType": "geometry","stylers": [{"color": "#757575"}]},
		  {"featureType": "administrative.country","elementType": "labels.text.fill","stylers": [{"color": "#9e9e9e"}]},
		  {"featureType": "administrative.land_parcel","stylers": [{"visibility": "off"}]},
		  {"featureType": "administrative.locality","elementType": "labels.text.fill","stylers": [{"color": "#bdbdbd"}]},
		  {"featureType": "poi","elementType": "labels.text.fill","stylers": [{"color": "#757575"}]},
		  {"featureType": "poi.park","elementType": "geometry","stylers": [{"color": "#181818"}]},
		  {"featureType": "poi.park","elementType": "labels.text.fill","stylers": [{"color": "#616161"}]},
		  {"featureType": "poi.park","elementType": "labels.text.stroke","stylers": [{"color": "#1b1b1b"}]},
		  {"featureType": "road","elementType": "geometry.fill","stylers": [{"color": "#2c2c2c"}]},
		  {"featureType": "road","elementType": "labels.text.fill","stylers": [{"color": "#8a8a8a"}]},
		  {"featureType": "road.arterial","elementType": "geometry","stylers": [{"color": "#373737"}]},
		  {"featureType": "road.highway","elementType": "geometry","stylers": [{"color": "#3c3c3c"}]},
		  {"featureType": "road.highway.controlled_access","elementType": "geometry","stylers": [{"color": "#4e4e4e"}]},
		  {"featureType": "road.local","elementType": "labels.text.fill","stylers": [{"color": "#616161"}]},
		  {"featureType": "transit","elementType": "labels.text.fill","stylers": [{"color": "#757575"}]},
		  {"featureType": "water","elementType": "geometry","stylers": [{"color": "#000000"}]},
		  {"featureType": "water","elementType": "labels.text.fill","stylers": [{"color": "#3d3d3d"}]}
		]}
	autocomplete = new google.maps.places.Autocomplete((document.getElementById('autocomplete')),options);
	autocomplete.setFields(['address_components', 'geometry', 'icon', 'name']);

  	google.maps.event.addListener(autocomplete, 'place_changed', function() {  	
	  	var place = autocomplete.getPlace();
	  	document.getElementById('para').innerHTML = "City: "+place.address_components[0].long_name+"<br />State: "+place.address_components[2].long_name+
	  	"<br />Country: "+place.address_components[3].long_name+map.getBounds();
	  	if (place.geometry.viewport) {map.fitBounds(place.geometry.viewport);}
	  	else{map.setCenter(place.geometry.location);map.setZoom(3);}
	  	var locations = [[33.390542, -111.974856],[33.423036, -111.959052],[33.328249, -111.957507],[33.300513, -111.887478],[33.350198, -111.959302]];
	    var marker, i;
	    for (i = 0; i < locations.length; i++) {  
	      marker = new google.maps.Marker({
	        position: new google.maps.LatLng(locations[i][0], locations[i][1]),
	        map: map
	      });}});
	var map = new google.maps.Map(document.getElementById('map'), options);
}