// GET - API GeoIpify
const callGeoIpify = (ipAddress) => {
    return fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_GGvVwQpnkx7ZlyALmgX1MDy8NsACf&ipAddress=${ipAddress}`)
        .then(response => response.json())
        .then(data => {
            return data.location
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Generating the map
const renderMap = async (ipAddress) => {

    let data = await callGeoIpify(ipAddress)
    let lat = data.lat
    let lng = data.lng
    let region = data.region
    let city = data.city
    let country = data.country

    map.setView([lat, lng], 15)

    // Elimina objetos anteriores si existen
    if (marker){
        marker.remove()
    }
    if (circle){
        circle.remove()
    }

    if (popup){
        popup.remove()
    }


    // Location
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);

    // Marker
    var marker = L.marker([lat, lng]).addTo(map);

    // Circle
    var circle = L.circle([lat, lng], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 500
    }).addTo(map);

    // Popups
    marker.bindPopup(`<b>${city}</b><br>${country}`).openPopup();

    // Popup Click event
    var popup = L.popup();
    function onMapClick(e) {
        popup
            .setLatLng(e.latlng)
            .setContent("You clicked the map at " + e.latlng.toString())
            .openOn(map);
    }

    map.on('click', onMapClick);
}

// Event Listener
const button = document.querySelector("#submit")
const inputText = document.querySelector("#input")


button.addEventListener("click", (e) => {
    e.preventDefault() // Evita que recargue la ventana
    let ipAddress = inputText.value
    renderMap(ipAddress)
})

// Initialing the map
var map = L.map('map').setView([0, 0], 2.5);
// Location
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);
