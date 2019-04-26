var options = {
	types: ['(cities)'],
	zoom: 4,
	center: {
		lat: 35.024,
		lng: -111.887
	},
	styles: [{
			"elementType": "geometry",
			"stylers": [{
				"color": "#212121"
			}]
		},
		{
			"elementType": "labels.icon",
			"stylers": [{
				"visibility": "off"
			}]
		},
		{
			"elementType": "labels.text.fill",
			"stylers": [{
				"color": "#757575"
			}]
		},
		{
			"elementType": "labels.text.stroke",
			"stylers": [{
				"color": "#212121"
			}]
		},
		{
			"featureType": "administrative",
			"elementType": "geometry",
			"stylers": [{
				"color": "#757575"
			}]
		},
		{
			"featureType": "administrative.country",
			"elementType": "labels.text.fill",
			"stylers": [{
				"color": "#9e9e9e"
			}]
		},
		{
			"featureType": "administrative.land_parcel",
			"stylers": [{
				"visibility": "off"
			}]
		},
		{
			"featureType": "administrative.locality",
			"elementType": "labels.text.fill",
			"stylers": [{
				"color": "#bdbdbd"
			}]
		},
		{
			"featureType": "poi",
			"elementType": "labels.text.fill",
			"stylers": [{
				"color": "#757575"
			}]
		},
		{
			"featureType": "poi.park",
			"elementType": "geometry",
			"stylers": [{
				"color": "#181818"
			}]
		},
		{
			"featureType": "poi.park",
			"elementType": "labels.text.fill",
			"stylers": [{
				"color": "#616161"
			}]
		},
		{
			"featureType": "poi.park",
			"elementType": "labels.text.stroke",
			"stylers": [{
				"color": "#1b1b1b"
			}]
		},
		{
			"featureType": "road",
			"elementType": "geometry.fill",
			"stylers": [{
				"color": "#2c2c2c"
			}]
		},
		{
			"featureType": "road",
			"elementType": "labels.text.fill",
			"stylers": [{
				"color": "#8a8a8a"
			}]
		},
		{
			"featureType": "road.arterial",
			"elementType": "geometry",
			"stylers": [{
				"color": "#373737"
			}]
		},
		{
			"featureType": "road.highway",
			"elementType": "geometry",
			"stylers": [{
				"color": "#3c3c3c"
			}]
		},
		{
			"featureType": "road.highway.controlled_access",
			"elementType": "geometry",
			"stylers": [{
				"color": "#4e4e4e"
			}]
		},
		{
			"featureType": "road.local",
			"elementType": "labels.text.fill",
			"stylers": [{
				"color": "#616161"
			}]
		},
		{
			"featureType": "transit",
			"elementType": "labels.text.fill",
			"stylers": [{
				"color": "#757575"
			}]
		},
		{
			"featureType": "water",
			"elementType": "geometry",
			"stylers": [{
				"color": "#000000"
			}]
		},
		{
			"featureType": "water",
			"elementType": "labels.text.fill",
			"stylers": [{
				"color": "#3d3d3d"
			}]
		}
	]
}

function initMap() {
	var map = new google.maps.Map(document.getElementById('map'), options);
	autocomplete = new google.maps.places.Autocomplete((document.getElementById('autocomplete')));
	autocomplete.setFields(['address_components', 'geometry', 'icon', 'name']);
	autocomplete.bindTo('bounds', map);
}

function plot_business(business) {
	var newLat = business.latitude
	var newLng = business.longitude

	var biz_info = business.name + ", " + business.city + ", " + business.state + " <br />Address: " + business.address + "<br />lat: " + business.latitude + "  lng: " + business.longitude + "<br />Yelp Rating: " + business.stars
	var mapa = new google.maps.Map(document.getElementById("map"), options);
	mapa.setCenter({
		lat: newLat,
		lng: newLng
	});
	mapa.setZoom(12)
	google.maps.event.addListenerOnce(mapa, 'bounds_changed', function () {
		plot_business_within_bound(mapa, business)
	});
	console.log(business.business_id)
	var marker = new google.maps.Marker({
		position: new google.maps.LatLng(newLat, newLng),
		map: mapa,
		business_id: business.business_id
	});
	var infowindow = new google.maps.InfoWindow({
		content: biz_info
	});
	marker.addListener('mouseover', function () {
		infowindow.open(mapa, this);
	});
	marker.addListener('mouseout', function () {
		infowindow.close();
	});
	marker.addListener('click', function () {
		mapa.setCenter(marker.getPosition());
		document.getElementById("par").innerHTML =
			dashboard_load(marker.business_id, infowindow.getContent())
	});
	marker.setMap(mapa)
}

function plot_business_by_location(place) {
	//remove_markers();
	var mapb = new google.maps.Map(document.getElementById("map"), options);
	mapb.fitBounds(place);
}

function plot_business_within_bound(mapa, business) {
	//remove_markers();
	minLat = mapa.getBounds().getSouthWest().lat();
	minLng = mapa.getBounds().getSouthWest().lng();
	maxLat = mapa.getBounds().getNorthEast().lat();
	maxLng = mapa.getBounds().getNorthEast().lng();
	var competitors;
	$.ajax({
		'async': false,
		'type': "GET",
		'global': false,
		'url': "http://localhost:4000/getBusinessesWithinLoc/" + minLat + "/" + minLng + "/" + maxLat + "/" + maxLng,
		'success': function (data) {
			competitors = data;
		}
	});

	var i;
	var infowindow;
	for (i = 0; i < Math.min(50, Object.keys(competitors).length); i++) {
		infowindow = null;
		if (business.business_id == competitors[i].business_id)
			continue;
		var marker_color = "http://maps.google.com/mapfiles/ms/icons/";
		if (competitors[i].stars >= 3.5)
			marker_color += "green-dot.png"
		else
			marker_color += "yellow-dot.png"
		var marker = new google.maps.Marker({
			icon: {
				url: marker_color
			},
			position: new google.maps.LatLng(competitors[i].latitude, competitors[i].longitude),
			map: mapa,
			business_id: competitors[i].business_id
		});
		var competitor_info = competitors[i].name + ", " + competitors[i].city + ", " + competitors[i].state + " <br />Address: " + competitors[i].address + "<br />lat: " + competitors[i].latitude + "  lng: " + competitors[i].longitude + "<br />Yelp Rating: " + competitors[i].stars
		infowindow = new google.maps.InfoWindow({
			content: competitor_info
		});
		marker.addListener('mouseover', function () {
			infowindow.open(mapa, this);
		});
		marker.addListener('mouseout', function () {
			infowindow.close();
		});
		marker.addListener('click', function () {
			mapa.setCenter(marker.getPosition());
			document.getElementById("par").innerHTML = marker.business_id
			dashboard_load(marker.business_id, infowindow.getContent())
		});
		marker.setMap(mapa)
	}
}