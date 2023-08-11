// GET - API GeoIpify
const callGeoIpify = () => {
    return fetch('https://geo.ipify.org/api/v2/country,city?apiKey=at_GGvVwQpnkx7ZlyALmgX1MDy8NsACf&ipAddress=190.143.246.119')
        .then(response => response.json())
        .then(data => {
            let lat = data.location.lat;
            let lng = data.location.lng;
            return [lat, lng]
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

const func = async () => {
    const result = await callGeoIpify()
    console.log(result)
}