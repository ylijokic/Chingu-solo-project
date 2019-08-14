const mymap = L.map('mapid').setView([45.52, -122.67], 11);

L.tileLayer(
  'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken:
      'pk.eyJ1IjoieWxpam9raWMiLCJhIjoiY2p6YXMzOWYyMDA0bTNocnBkcWE5bThvbSJ9.tIcLrrsbnckIrFS_4D8Sug'
  }
).addTo(mymap);

const circle = L.circle([45.52, -122.67], {
  color: 'red',
  fillColor: '#f03',
  fillOpacity: 0.5,
  radius: 3000
}).addTo(mymap);

const popup = L.popup();

function onMapClick(e) {
  popup
    .setLatLng(e.latlng)
    .setContent('You clicked the map at ' + e.latlng.toString())
    .openOn(mymap);
}

mymap.on('click', onMapClick);
