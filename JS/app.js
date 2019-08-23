const markers = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        name: 'Council Crest Park'
      },
      geometry: {
        type: 'Point',
        coordinates: [-122.70796179771423, 45.49890250697032]
      }
    },
    {
      type: 'Feature',
      properties: {
        name: 'Pittock Mansion Trail'
      },
      geometry: {
        type: 'Point',
        coordinates: [-122.71966695785521, 45.521638658391744]
      }
    },
    {
      type: 'Feature',
      properties: {
        name: 'Audubon Society Trails'
      },
      geometry: {
        type: 'Point',
        coordinates: [-122.73010611534117, 45.526712438356405]
      }
    },
    {
      type: 'Feature',
      properties: {
        name: 'Wildwood Trail'
      },
      geometry: {
        type: 'Point',
        coordinates: [-122.74485826492311, 45.549339682038905]
      }
    },
    {
      type: 'Feature',
      properties: {
        name: 'Tryon Creek State Park'
      },
      geometry: {
        type: 'Point',
        coordinates: [-122.6756626367569, 45.44132939561415]
      }
    },
    {
      type: 'Feature',
      properties: {
        name: 'Powell Butte Park'
      },
      geometry: {
        type: 'Point',
        coordinates: [-122.49722599983215, 45.490742621217265]
      }
    },
    {
      type: 'Feature',
      properties: {
        name: 'Mount Tabor Park'
      },
      geometry: {
        type: 'Point',
        coordinates: [-122.59961128234862, 45.513316668631674]
      }
    },
    {
      type: 'Feature',
      properties: {
        name: 'Mount Talbert Park'
      },
      geometry: {
        type: 'Point',
        coordinates: [-122.55257606506348, 45.42062422307843]
      }
    },
    {
      type: 'Feature',
      properties: {
        name: 'Saltzman Trail at North Forest Park'
      },
      geometry: {
        type: 'Point',
        coordinates: [-122.75343060493468, 45.56642994989069]
      }
    },
    {
      type: 'Feature',
      properties: {
        name: 'Milo McIver State Park'
      },
      geometry: {
        type: 'Point',
        coordinates: [-122.37758874893187, 45.309349030516124]
      }
    }
  ]
};

mapboxgl.accessToken =
  'pk.eyJ1IjoieWxpam9raWMiLCJhIjoiY2p6YXMzOWYyMDA0bTNocnBkcWE5bThvbSJ9.tIcLrrsbnckIrFS_4D8Sug';

const map = new mapboxgl.Map({
  container: 'map', // Container ID
  style: 'mapbox://styles/mapbox/dark-v10', // Map style
  center: [-122.675, 45.5051], // Starting position [lng, lat]
  zoom: 10 // Starting zoom level
});

const popup = new mapboxgl.Popup({
  closeButton: false
});

const menuItems = document.getElementById('menu-item');

// After the map style has loaded on the page,
// add a source layer and default styling for a single point
map.on('load', () => {
  map.addSource('markers', {
    type: 'geojson',
    data: markers
  });

  menuItems.innerHTML = '';

  markers.features.forEach(feature => {
    let item = document.createElement('a');
    let name = feature.properties.name;
    item.textContent = name;
    item.addEventListener('click', () => {
      popup.setLngLat(feature.geometry.coordinates);
      popup.setText(feature.properties.name);
      popup.addTo(map);
    });
    menuItems.appendChild(item);
  });

  map.addLayer({
    id: 'points',
    source: 'markers',
    type: 'circle',
    paint: {
      'circle-radius': 10,
      'circle-color': '#BADA55'
    }
  });
});
