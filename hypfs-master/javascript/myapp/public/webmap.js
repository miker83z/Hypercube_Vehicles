//REMEMBER: npm run build
/*

var L = require('leaflet');

// Creates a leaflet map binded to an html <div> with id "map
var mymap = L.map('map').setView([43.659752, -79.378161], 20);


L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZmVkZXJpY2EwOTYiLCJhIjoiY2tudTFjNDN6MDhmdjJ1cm1qZGZ4aW15eCJ9.3Pv_3Qn0oSh37OUCDSgWrg'
}).addTo(mymap);

var marker = L.marker([43.659752, -79.378161]).addTo(mymap);


marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
var circle = L.circle([43.659752, -79.378161], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 50
}).addTo(mymap);



function getPoint() {

    $.ajax({
        type: 'POST',
        data: JSON.stringify("ciaoooo"),
        url: '/getPoint',
        success: function (data) {
            console.log(data);
            L.marker([51.5, -0.09]).addTo(mymap);
         
        }
    });
}


*/
