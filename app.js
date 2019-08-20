function openSideMenu() {
  document.getElementById('side-menu').style.width = '250px';

  document.getElementById('main').style.marginLeft = '250px';
}

function closeSideMenu() {
  document.getElementById('side-menu').style.width = '0px';

  document.getElementById('main').style.marginLeft = '0px';
}

mapboxgl.accessToken =
  'pk.eyJ1IjoieWxpam9raWMiLCJhIjoiY2p6YXMzOWYyMDA0bTNocnBkcWE5bThvbSJ9.tIcLrrsbnckIrFS_4D8Sug';

const map = new mapboxgl.Map({
  container: 'map', // Container ID
  style: 'mapbox://styles/mapbox/outdoors-v11', // Map style to use
  center: [-122.675, 45.5051], // Starting position [lng, lat]
  zoom: 12 // Starting zoom level
});

const marker = new mapboxgl.Marker() // initialize a new marker
  .setLngLat([-122.675, 45.5051]) // Marker [lng, lat] coordinates
  .addTo(map); // Add the marker to the map

const geocoder = new MapboxGeocoder({
  // Initialize the geocoder
  accessToken: mapboxgl.accessToken, // Set the access token
  mapboxgl: mapboxgl, // Set the mapbox-gl instance
  marker: false, // Do not use the default marker style
  placeholder: 'Search places in Portland',
  bbox: [-122.9, 45.3, -122.3, 45.6], // Boundary for search
  proximity: {
    longitude: -122.675,
    latitude: 45.5051
  }
});

// Add the geocoder to the map
map.addControl(geocoder);

// After the map style has loaded on the page,
// add a source layer and default styling for a single point
map.on('load', function() {
  map.addSource('single-point', {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: []
    }
  });

  map.addLayer({
    id: 'point',
    source: 'single-point',
    type: 'circle',
    paint: {
      'circle-radius': 10,
      'circle-color': '#448ee4'
    }
  });

  // Listen for the `result` event from the Geocoder
  // `result` event is triggered when a user makes a selection
  //  Add a marker at the result's coordinates
  geocoder.on('result', function(e) {
    map.getSource('single-point').setData(e.result.geometry);
  });
});
