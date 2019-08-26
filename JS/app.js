const markers = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        name: 'Council Crest Park',
        activities: ['Hiking', 'Biking', 'Sightseeing']
      },
      geometry: {
        type: 'Point',
        coordinates: [-122.70796179771423, 45.49890250697032]
      }
    },
    {
      type: 'Feature',
      properties: {
        name: 'Pittock Mansion',
        activities: ['Hiking']
      },
      geometry: {
        type: 'Point',
        coordinates: [-122.71966695785521, 45.521638658391744]
      }
    },
    {
      type: 'Feature',
      properties: {
        name: 'Audubon Society',
        activities: ['Hiking', 'Bird Watching']
      },
      geometry: {
        type: 'Point',
        coordinates: [-122.73010611534117, 45.526712438356405]
      }
    },
    {
      type: 'Feature',
      properties: {
        name: 'Wildwood Trail at Forest Park',
        activities: ['Hiking', 'Trail Running', 'Mountain Biking']
      },
      geometry: {
        type: 'Point',
        coordinates: [-122.74485826492311, 45.549339682038905]
      }
    },
    {
      type: 'Feature',
      properties: {
        name: 'Tryon Creek State Park',
        activities: ['Hiking', 'Bird Watching']
      },
      geometry: {
        type: 'Point',
        coordinates: [-122.6756626367569, 45.44132939561415]
      }
    },
    {
      type: 'Feature',
      properties: {
        name: 'Powell Butte',
        activities: ['Hiking', 'Sightseeing']
      },
      geometry: {
        type: 'Point',
        coordinates: [-122.49722599983215, 45.490742621217265]
      }
    },
    {
      type: 'Feature',
      properties: {
        name: 'Mount Tabor',
        activities: ['Hiking', 'Sightseeing', 'Biking']
      },
      geometry: {
        type: 'Point',
        coordinates: [-122.59961128234862, 45.513316668631674]
      }
    },
    {
      type: 'Feature',
      properties: {
        name: 'Mount Talbert',
        activities: ['Hiking', 'Trail Running', 'Mountain Biking']
      },
      geometry: {
        type: 'Point',
        coordinates: [-122.55257606506348, 45.42062422307843]
      }
    },
    {
      type: 'Feature',
      properties: {
        name: 'Saltzman Trail at Forest Park',
        activities: ['Hiking', 'Trail Running', 'Mountain Biking']
      },
      geometry: {
        type: 'Point',
        coordinates: [-122.75343060493468, 45.56642994989069]
      }
    },
    {
      type: 'Feature',
      properties: {
        name: 'Kelly Point Park',
        activities: ['Hiking', 'Swimming', 'Bird Watching']
      },
      geometry: {
        type: 'Point',
        coordinates: [-122.76329040527344, 45.64608830455222]
      }
    }
  ]
};

let filteredMarkers = [];
const inputText = document.getElementById('menu-filter');

mapboxgl.accessToken =
  'pk.eyJ1IjoieWxpam9raWMiLCJhIjoiY2p6YXMzOWYyMDA0bTNocnBkcWE5bThvbSJ9.tIcLrrsbnckIrFS_4D8Sug';

const map = new mapboxgl.Map({
  container: 'map', // Container ID
  style: 'mapbox://styles/mapbox/dark-v10', // Map style
  center: [-122.675, 45.525], // Starting position [lng, lat]
  zoom: 10 // Starting zoom level
});

const popup = new mapboxgl.Popup({
  closeButton: true
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
    item.className = 'menu-items';
    let name = feature.properties.name;
    let LayerID = name;
    item.textContent = name;
    item.addEventListener('click', () => {
      popup.setLngLat(feature.geometry.coordinates);
      popup.setHTML(
        `<ul>
          <li>Name: ${feature.properties.name}</li>
          <li>Activities: ${feature.properties.activities}</li>
        </ul>`
      );
      popup.addTo(map);
    });
    menuItems.appendChild(item);

    if (!map.getLayer(LayerID)) {
      map.addLayer({
        id: LayerID,
        source: 'markers',
        type: 'circle',
        paint: {
          'circle-radius': 10,
          'circle-color': '#BADA55'
        },
        filter: ['==', 'name', name]
      });
      filteredMarkers.push(LayerID);
    }
  });
});

//Function to filter items in navBar
function filterInput() {
  let input = document.getElementById('menu-filter').value;
  input = input.toLowerCase();
  let names = document.getElementsByClassName('menu-items');

  for (let i = 0; i < names.length; i++) {
    if (!names[i].innerHTML.toLowerCase().includes(input)) {
      names[i].style.display = 'none';
    } else {
      names[i].style.display = 'list-item';
    }
  }

  let matchExp = new RegExp(input, 'gi');
  let matchedID = filteredMarkers.filter(layer => matchExp.test(layer));
  filteredMarkers.forEach(function(layerID) {
    if (matchedID.includes(layerID)) {
      map.setLayoutProperty(layerID, 'visibility', 'visible');
    } else {
      map.setLayoutProperty(layerID, 'visibility', 'none');
    }
  });
}
