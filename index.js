let map;

var noPoi = [
  {
    featureType: "poi",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "poi.business",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "all",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
];

// const styles = {
//   default: [],
//   hide: [
//     {
//       featureType: "poi.business",
//       stylers: [{ visibility: "off" }],
//     },
//     {
//       featureType: "transit",
//       elementType: "labels.icon",
//       stylers: [{ visibility: "off" }],
//     },
//   ],
// };

var styles = [
  {
    stylers: [{ visibility: "simplified" }, { saturation: -100 }],
  },
  {
    featureType: "road.local",
    elementType: "labels.text",
    stylers: [{ visibility: "on" }],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text",
    stylers: [{ visibility: "on" }],
  },
  {
    featureType: "road.arterial",
    stylers: [{ visibility: "on" }],
  },
  {
    featureType: "poi",
    stylers: [{ visibility: "on" }, { lightness: 25 }],
  },
  {
    featureType: "poi",
    stylers: [{ lightness: 1 }],
  },
];

var showShape = [
  {
    featureType: "all",
    stylers: [{ visibility: "off" }],
  },
];

// To do

// Adjust right dimensions for map (height weight)
// Center map correctly
// get rid of zoom, little yellow guy, fullscreen, map and satellite headers
// Get coordinates for your buildings
// Add event listener for click (double click)
// Validate coordinates when clicking building

const locations = {
  library: [34.24004645303595, -118.52886318087684],
};

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 34.241270697715954, lng: -118.52817287375724 },
    zoom: 16.7,
    disableDefaultUI: true,
    gestureHandling: "none",
    zoomControl: false,
  });

  //   const rectangle = new google.maps.Rectangle({
  //     strokeColor: "#FF0000",
  //     strokeOpacity: 0.8,
  //     strokeWeight: 2,
  //     fillColor: "#FF0000",
  //     fillOpacity: 0.35,
  //     map,
  //     bounds: {
  //       north: 34.2405,
  //       south: 34.2395,
  //       east: -118.5285,
  //       west: -118.5301,
  //     },
  //   });

  google.maps.event.addListener(map, "dblclick", drawShape);

  function drawShape(e) {
    var latitude = e.latLng.lat();

    console.log("Drawing a shape in the map");
    console.log(latitude);
  }

  //   rectangle.setOptions({ styles: showShape });
  map.setOptions({ styles: noPoi });
}
