var autocomplete;
var competitor_array = {};
var infowindow;
var competitors;
var bounds = [];
var newLat;
var newLng;
var myCoor = [];

var options = {
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
  newLat = business.latitude;
  newLng = business.longitude;

  myCoor.push(newLat, newLng);

  infowindow = new google.maps.InfoWindow();

  var biz_info =
    //business.name +
    //", " +
    business.city +
    ", " +
    business.state +
    " <br />Address: " +
    business.address +
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
    dashboard_load(marker.business_id, infowindow.getContent(), bounds, myCoor);
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

  bounds.push(minLat, minLng, maxLat, maxLng);

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

  competitors = competitors.slice(0, 100);
  var i;

  for (i = 0; i < Math.min(100, Object.keys(competitors).length); i++) {
    if (business.business_id == competitors[i].business_id) continue;
    var marker_color = "http://maps.google.com/mapfiles/ms/icons/";

    var marker = new google.maps.Marker({
      //icon: { url: marker_color },
      index: i,
      position: new google.maps.LatLng(
        competitors[i].latitude,
        competitors[i].longitude
      ),
      map: mapa,
      business_id: competitors[i].business_id
    });

    if (competitors[marker.index].stars >= 3.5) marker_color += "green-dot.png";
    else marker_color += "yellow-dot.png";
    marker.setIcon(marker_color);



    var competitor_info =
      //competitors[marker.index].business_id +
      //"<br />" +
      competitors[marker.index].name +
      ", " +
      competitors[marker.index].city +
      ", " +
      competitors[marker.index].state +
      " <br />Address: " +
      competitors[marker.index].address +
      "<br />Yelp Rating: " +
      competitors[marker.index].stars;

    competitor_array[marker.index]=competitor_info;
    marker.setMap(mapa);

    google.maps.event.addListener(
      marker,
      "mouseover",
      (function(marker) {
        return function() {
          infowindow.setContent(competitor_array[marker.index]);
          infowindow.open(map, marker);
        };
      })(marker, i)
    );
    marker.addListener("mouseout", function() {
      infowindow.close();
    });

    google.maps.event.addListener(
      marker,
      "click",
      (function(marker, i) {
        return function() {
          mapa.setCenter(marker.getPosition());
          dashboard_load(
            competitors[i].business_id,
            infowindow.getContent(),
            bounds,
            myCoor
          );
        };
      })(marker, i)
    );
  }
}
