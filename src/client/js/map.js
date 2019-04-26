var autocomplete;
var competitor_array = [];
var infowindow;
/*var options = {
  types: ["(cities)"],
  zoom: 4,
  center: { lat: 35.024, lng: -111.887 },
  styles: [
    { elementType: "geometry", stylers: [{ color: "#212121" }] },
    { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#212121" }] },
    {
      featureType: "administrative",
      elementType: "geometry",
      stylers: [{ color: "#757575" }]
    },
    {
      featureType: "administrative.country",
      elementType: "labels.text.fill",
      stylers: [{ color: "#9e9e9e" }]
    },
    {
      featureType: "administrative.land_parcel",
      stylers: [{ visibility: "off" }]
    },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [{ color: "#bdbdbd" }]
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#757575" }]
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#181818" }]
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [{ color: "#616161" }]
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#1b1b1b" }]
    },
    {
      featureType: "road",
      elementType: "geometry.fill",
      stylers: [{ color: "#2c2c2c" }]
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [{ color: "#8a8a8a" }]
    },
    {
      featureType: "road.arterial",
      elementType: "geometry",
      stylers: [{ color: "#373737" }]
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#3c3c3c" }]
    },
    {
      featureType: "road.highway.controlled_access",
      elementType: "geometry",
      stylers: [{ color: "#4e4e4e" }]
    },
    {
      featureType: "road.local",
      elementType: "labels.text.fill",
      stylers: [{ color: "#616161" }]
    },
    {
      featureType: "transit",
      elementType: "labels.text.fill",
      stylers: [{ color: "#757575" }]
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#000000" }]
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#3d3d3d" }]
    }
  ]
};*/

var options = {
<<<<<<< Updated upstream
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
=======
  types: ["(cities)"],
  zoom: 4,
  center: { lat: 35.024, lng: -111.887 },
  style: [
    {
      elementType: "geometry",
      stylers: [
        {
          color: "#ebe3cd"
        }
      ]
    },
    {
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#523735"
        }
      ]
    },
    {
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#f5f1e6"
        }
      ]
    },
    {
      featureType: "administrative",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#c9b2a6"
        }
      ]
    },
    {
      featureType: "administrative.land_parcel",
      stylers: [
        {
          visibility: "off"
        }
      ]
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#dcd2be"
        }
      ]
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#ae9e90"
        }
      ]
    },
    {
      featureType: "administrative.neighborhood",
      stylers: [
        {
          visibility: "off"
        }
      ]
    },
    {
      featureType: "landscape.natural",
      elementType: "geometry",
      stylers: [
        {
          color: "#dfd2ae"
        }
      ]
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [
        {
          color: "#dfd2ae"
        }
      ]
    },
    {
      featureType: "poi",
      elementType: "labels.text",
      stylers: [
        {
          visibility: "off"
        }
      ]
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#93817c"
        }
      ]
    },
    {
      featureType: "poi.business",
      stylers: [
        {
          visibility: "off"
        }
      ]
    },
    {
      featureType: "poi.park",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#a5b076"
        }
      ]
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#447530"
        }
      ]
    },
    {
      featureType: "road",
      stylers: [
        {
          visibility: "off"
        }
      ]
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        {
          color: "#f5f1e6"
        }
      ]
    },
    {
      featureType: "road",
      elementType: "labels",
      stylers: [
        {
          visibility: "off"
        }
      ]
    },
    {
      featureType: "road",
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off"
        }
      ]
    },
    {
      featureType: "road.arterial",
      elementType: "geometry",
      stylers: [
        {
          color: "#fdfcf8"
        }
      ]
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [
        {
          color: "#f8c967"
        },
        {
          visibility: "off"
        }
      ]
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#e9bc62"
        }
      ]
    },
    {
      featureType: "road.highway.controlled_access",
      elementType: "geometry",
      stylers: [
        {
          color: "#e98d58"
        }
      ]
    },
    {
      featureType: "road.highway.controlled_access",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#db8555"
        }
      ]
    },
    {
      featureType: "road.local",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#806b63"
        }
      ]
    },
    {
      featureType: "transit",
      stylers: [
        {
          visibility: "off"
        }
      ]
    },
    {
      featureType: "transit.line",
      elementType: "geometry",
      stylers: [
        {
          color: "#dfd2ae"
        }
      ]
    },
    {
      featureType: "transit.line",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#8f7d77"
        }
      ]
    },
    {
      featureType: "transit.line",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#ebe3cd"
        }
      ]
    },
    {
      featureType: "transit.station",
      elementType: "geometry",
      stylers: [
        {
          color: "#dfd2ae"
        }
      ]
    },
    {
      featureType: "water",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#b9d3c2"
        }
      ]
    },
    {
      featureType: "water",
      elementType: "labels.text",
      stylers: [
        {
          visibility: "off"
        }
      ]
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#92998d"
        }
      ]
    }
  ]
};

function initMap() {
  var map = new google.maps.Map(document.getElementById("map"), options);
  autocomplete = new google.maps.places.Autocomplete(
    document.getElementById("autocomplete")
  );
  autocomplete.bindTo("bounds", map);
  autocomplete.setFields(["address_components", "geometry", "icon", "name"]);
}

function plot_business(business) {
  var newLat = business.latitude;
  var newLng = business.longitude;

  infowindow = new google.maps.InfoWindow();

  var biz_info =
    "Business ID: " +
    business.business_id +
    "<br /><br />" +
    business.name +
    ", " +
    business.city +
    ", " +
    business.state +
    " <br />Address: " +
    business.address +
    "<br />lat: " +
    business.latitude +
    "  lng: " +
    business.longitude +
    "<br />Yelp Rating: " +
    business.stars;
  var mapa = new google.maps.Map(document.getElementById("map"), options);
  mapa.setCenter({ lat: newLat, lng: newLng });
  mapa.setZoom(12);
  google.maps.event.addListenerOnce(mapa, "bounds_changed", function() {
    plot_business_within_bound(mapa, business);
  });
  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(newLat, newLng),
    map: mapa,
    business_id: business.business_id
  });
  marker.addListener("mouseover", function() {
    infowindow.setContent(biz_info);
    infowindow.open(mapa, this);
  });
  marker.addListener("mouseout", function() {
    infowindow.close();
  });
  marker.addListener("click", function() {
    mapa.setCenter(marker.getPosition());
    dashboard_load(marker.business_id, infowindow.getContent());
  });
  marker.setMap(mapa);
}

function plot_business_by_location() {
  var mapb = new google.maps.Map(document.getElementById("map"), options);
  mapb.fitBounds(place);
  var place = autocomplete.getPlace();
  document.getElementById("par").innerHTML = place;
}

function plot_business_within_bound(mapa, business) {
  infowindow = new google.maps.InfoWindow();
  //remove_markers();
  minLat = mapa
    .getBounds()
    .getSouthWest()
    .lat();
  minLng = mapa
    .getBounds()
    .getSouthWest()
    .lng();
  maxLat = mapa
    .getBounds()
    .getNorthEast()
    .lat();
  maxLng = mapa
    .getBounds()
    .getNorthEast()
    .lng();
  var competitors;
  $.ajax({
    async: false,
    type: "GET",
    global: false,
    url:
      "http://localhost:4000/getBusinessesWithinLoc/" +
      minLat +
      "/" +
      minLng +
      "/" +
      maxLat +
      "/" +
      maxLng,
    success: function(data) {
      competitors = data;
    }
  });

  var i;
  for (i = 0; i < Math.min(100, Object.keys(competitors).length); i++) {
    if (business.business_id == competitors[i].business_id) continue;
    var marker_color = "http://maps.google.com/mapfiles/ms/icons/";
    if (competitors[i].stars >= 3.5) marker_color += "green-dot.png";
    else marker_color += "yellow-dot.png";
    var marker = new google.maps.Marker({
      icon: { url: marker_color },
      position: new google.maps.LatLng(
        competitors[i].latitude,
        competitors[i].longitude
      ),
      map: mapa,
      business_id: competitors[i].business_id
    });
    var competitor_info =
      "Business ID: " +
      competitors[i].business_id +
      "<br /><br />" +
      competitors[i].name +
      ", " +
      competitors[i].city +
      ", " +
      competitors[i].state +
      " <br />Address: " +
      competitors[i].address +
      "<br />lat: " +
      competitors[i].latitude +
      "  lng: " +
      competitors[i].longitude +
      "<br />Yelp Rating: " +
      competitors[i].stars;

    marker.setMap(mapa);

    google.maps.event.addListener(
      marker,
      "mouseover",
      (function(marker, i) {
        return function() {
          infowindow.setContent(competitor_array[i]);
          infowindow.open(map, marker);
        };
      })(marker, i)
    );
    marker.addListener("mouseout", function() {
      infowindow.close();
    });

    marker.addListener("click", function() {
      var temp = infowindow.getContent().split("<br />")[0];
      var temp_id = temp.split(": ")[1];
      dashboard_load(temp_id, infowindow.getContent());
    });
    competitor_array.push(competitor_info);
  }
}
>>>>>>> Stashed changes
