// Elements infos box
const ipAddress = document.querySelector('#ipAddress');
const currentTown = document.querySelector('#current_town');
const currentZone = document.querySelector('#current_zone');
const currentIsp = document.querySelector('#current_isp');

// Elements form
const enteredIp = document.querySelector('.header_search__input');
const searchBtn = document.querySelector('.header_search__btn');

var mymap = L.map('mapid').setView([-17.5408563, -39.7685152], 13);

L.tileLayer(
  'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken:
      'pk.eyJ1Ijoiam9hYnNlbmEiLCJhIjoiY2tnbnZ1MTY4MDg0MDJ6czN4cDU3dzhoYyJ9.R5KQSbRxWWisrchXCv28cg',
  }
).addTo(mymap);

const updateMarker = (updateMarker = [-17.5408563, -39.7685152]) => {
  mymap.setView(updateMarker, 13);
  L.marker(updateMarker).addTo(mymap);
};

const getIp = (defaultIp) => {
  if (defaultIp === undefined) {
    var ipUrl = `https://geo.ipify.org/api/v1?apiKey=at_fkrlvfpirtP6pOCGSplVjaRU9sbmg`;
  } else {
    var ipUrl = `https://geo.ipify.org/api/v1?apiKey=at_fkrlvfpirtP6pOCGSplVjaRU9sbmg&ipAddress=${defaultIp}`;
  }

  fetch(ipUrl)
    .then((response) => response.json())
    .then((data) => {
      ipAddress.innerHTML = data.ip;
      currentTown.innerHTML = `${data.location.city}, ${data.location.country}, ${data.location.postalCode}`;
      currentZone.innerHTML = data.location.timezone;
      currentIsp.innerHTML = data.isp;

      // Update MapMaker
      updateMarker([data.location.lat, data.location.lng]);
    })
    .catch((error) => {
      alert('Ip not valid');
      console.log(error);
    });
};

// getIp();
document.addEventListener('load', updateMarker());

searchBtn.addEventListener('click', (event) => {
  event.preventDefault();

  if (enteredIp.value != '' && enteredIp.value != null) {
    getIp(enteredIp.value);
    return;
  }
  alert('Please enter a valid IP Address');
});
