let map;
let rectangle;
let quiz;
let textElement;
let question;
let questionNum = 0;
let matchCoordinates;
let latitude;
let longitude;
let color;
let score = 0;
let matchLocation = false;
let randomLocation;



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

const obj = {
  Library: [34.2405,34.2395,-118.5285,-118.5301],
  BayramianHall: [34.2407, 34.2399, -118.5301, -118.5314],
  SierraCenter: [34.2390, 34.2387, -118.5310, -118.5314],
  JeromeHall: [34.2390, 34.2388, -118.5303, -118.5309],
  MB1: [34.2396, 34.2385, -118.5276, -118.5287],
  SequoiaHall: [34.2407, 34.2401, -118.5276, -118.5284],
  MB2: [34.2425, 34.2410, -118.5301, -118.5316],
  JacarandaHall: [34.2420, 34.2410, -118.5278, -118.5294],
  Matadome: [34.2426 ,34.2413, -118.5253, -118.5270],
  MB3: [34.2404, 34.2392, -118.5252, -118.5272],
  SRC: [34.2406, 34.2393, -118.5247, -118.5251],
  PhysicalPlant: [34.2441, 34.2429, -118.5304, -118.5316],
  ArtDesign: [34.2441, 34.2429, -118.5294, -118.5303],
  MB4: [34.2441, 34.2429, -118.5282, -118.5292],
};

const locations = [
  {
    name: "Library",
    coordinates: [34.2405,34.2395,-118.5285,-118.5301],
    marked: false,
  },
  {
    name: "Bayramian Hall",
    coordinates: [34.2407, 34.2399, -118.5301, -118.5314],
    marked: false,
  },
  {
    name: "Sierra Center",
    coordinates: [34.2390, 34.2387, -118.5310, -118.5314],
    marked: false,
  },
  {
    name: "Jerome Richfield Hall", 
    coordinates: [34.2390, 34.2388, -118.5303, -118.5309],
    marked: false,
  },
  {
    name: "Sequoia Hall", 
    coordinates: [34.2407, 34.2401, -118.5276, -118.5284],
    marked: false,
  },
  {
    name: "Jacaranda Hall", 
    coordinates: [34.2420, 34.2410, -118.5278, -118.5294], 
    marked: false,
  },
  {
    name: "Matadome", 
    coordinates: [34.2426 ,34.2413, -118.5253, -118.5270], 
    marked: false,
  },
  {
    name: "SRC", 
    coordinates: [34.2406, 34.2393, -118.5247, -118.5251], 
    marked: false,
  },
  {
    name: "Physical Plant Management", 
    coordinates: [34.2441, 34.2429, -118.5304, -118.5316], 
    marked: false,
  },
  {
    name: "Art and Design Center", 
    coordinates: [34.2441, 34.2429, -118.5294, -118.5303], 
    marked: false,
  },
  {
    name: "MB1", 
    coordinates: [34.2396, 34.2385, -118.5276, -118.5287],
    marked: false,
  },
  { 
    name: "MB2", 
    coordinates: [34.2425, 34.2410, -118.5301, -118.5316],
    marked: false,
  },
  {
    name: "MB3", 
    coordinates: [34.2404, 34.2392, -118.5252, -118.5272], 
    marked: false,
  },
  {
    name: "MB4", 
    coordinates: [34.2441, 34.2429, -118.5282, -118.5292], 
    marked: false,
  },
];

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 34.241270697715954, lng: -118.52817287375724 },
    zoom: 16.7,
    disableDefaultUI: true,
    gestureHandling: "none",
    zoomControl: false,
  });

  // EDIT

  quiz = document.querySelector("#quiz");
  // textElement = document.createElement("p");
  // question = document.createTextNode("Where is the Library?");

  // textElement.append(question);
  // quiz.append(textElement);

  // matchCoordinates = locations.Library;

  // EDIT

  nextQuestion();

  google.maps.event.addListener(map, "dblclick", drawShape);

  //   rectangle.setOptions({ styles: showShape });
  map.setOptions({ styles: noPoi });
}

function drawShape(e) {

  // while (questionNum != 5)

  latitude = e.latLng.lat();
  longitude = e.latLng.lng();

  console.log("Drawing a shape in the map");
  console.log(latitude, longitude);

  let loc = checkLocation(latitude, longitude);

  if (matchLocation === true)
    color = '#84FA07';
  else 
    color = '#FF0000';

  if (loc) {
    rectangle = new google.maps.Rectangle({
      strokeColor: color,
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: color,
      fillOpacity: 0.35,
      map,
      bounds: {
        north: loc[0],
        south: loc[1],
        east: loc[2],
        west: loc[3],
      },
    });
  } else {
    console.log("Clicked Unknown Location");
  }

  questionNum++;
  randomLocation.marked = true;

  if (questionNum < 5) 
    nextQuestion();
  else if (questionNum === 5)
    printScore(); 
  else 
    console.log("Game is over. Refresh to start over.");

  matchLocation = false;

}

function checkLocation(lat, lng) {
  if ((lat <= matchCoordinates[0] && lat >= matchCoordinates[1]) && (lng >= matchCoordinates[3] && lng <= matchCoordinates[2])) {
    matchLocation = true;
    score++;
    return matchCoordinates;
  }
  else {
    for (var b in locations) {
      let building = locations[b].coordinates;
      matchLocation = false;

      // console.log("Checking building: " + key);
      // console.log("Building coordinates:"); 
      // console.log(building);

      if ((lat <= building[0] && lat >= building[1]) && (lng >= building[3] && lng <= building[2])) {
        console.log("Found the " + b.name + " building")
        return building;
      }
    }
    return null;
  }
}

function nextQuestion() {
  
  textElement = document.createElement("p");

  getRandomLocation();
  matchCoordinates = randomLocation.coordinates;

  question = document.createTextNode("Where is the " + randomLocation.name + " bldg?");
  
  // if (questionNum === 1) {
  //   question = document.createTextNode("Where is Jacaranda Hall?");
  //   matchCoordinates = locations.JacarandaHall;
  // }
  // else if (questionNum === 2) {
  //   question = document.createTextNode("Where is the Student Recreation Center?");
  //   matchCoordinates = locations.SRC;
  // }
  // else if (questionNum === 3) {
  //   question = document.createTextNode("Where is the Project Plant Management Bldg?");
  //   matchCoordinates = locations.PhysicalPlant;
  // }
  // else if (questionNum === 4) {
  //   question = document.createTextNode("Where is the Matadome?");
  //   matchCoordinates = locations.Matadome;
  // }

  textElement.append(question);
  quiz.append(textElement);
}

function printScore() {
  let result = document.createTextNode("Your score is " + score + " out of 5 correct answers.");
  textElement = document.createElement("h2");
  textElement.append(result);
  quiz.append(textElement);
  
}

function getRandomLocation() {

  let num = Math.floor(Math.random() * 10);

  randomLocation = locations[num];

  while (randomLocation.marked) {
    num = Math.floor(Math.random() * 10);
    randomLocation = locations[num];
  }
  
}
