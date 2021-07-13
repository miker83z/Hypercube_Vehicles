///browserify requests.js -o bundle.js 
var OpenLocationCode = require('open-location-code').OpenLocationCode
var intersections = require('../test/intersections.js')

function client_request(url, data, operation) {
    console.log("data on client request", data)
    $.ajax({
        type: 'POST',
        url: url,
        contentType: 'application/json',
        data: data,
        success: function (data) {
            console.log("success")
            output_data(operation, data)

        },
        error: function (err) {
            console.log("errore", err)
        }
    });

}
//Single test

global.choose_operation = function (operation) {
    var url;
    var data;

    switch (operation) {

        //Random point
        case "insert":
            url = '/insert'
            
            break;
        case "pin_search":

            url = '/pin_search'
            data = JSON.stringify({ 'keyword': '8FXX4275+WC', "threshold": -1 })

            break;
        case "superset_search":

            url = '/superset_search'
            data = JSON.stringify({ 'keyword': '8FXX4275+WC', "threshold": 5 })
            break;

        case "remove":

            url = '/remove'
            data = JSON.stringify({ 'keyword': '8FQJ3600+', "obj": "9MTZIQWB9Q9IONIEDDRY9MLMWWKCK9EVVSRZOKWAUETQYYJDRABPU9DSIV9LBSDBBXBADXGHJWTFSFVWQ" })
            break;

    }
    client_request(url, data, operation)

}


global.output_data = function (operation, data) {
    console.log(data)

    switch (operation) {

        case "pin_search":
        case "superset_search":

            var messages = []
            for (i = 0; i < data.length; i++) {
                for (j = 0; j < data[i].length; j++) {
                    console.log(data[i][j])
                    messages.push(data[i][j])
                }
            }

            for (element of messages) {
                //console.log(element)

                coord = decodeOLC(element.message)
                L.marker([coord.latitudeCenter, coord.longitudeCenter]).addTo(layerGroup);
                //marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
            }

            break;

        case "clear":
            // remove all the markers in one go
            layerGroup.clearLayers();
            break;
        default:
            break;

    }
}


function decodeOLC(code) {

    const openLocationCode = new OpenLocationCode();
    const coord = openLocationCode.decode(code)
    return coord

}

//Insert transactions in DHT 
global.insert_intersections = function (operation) {
    console.log("Insert intersections")

    url = '/insertTestMam'
    intersections.intersections.forEach(element => {
        data = JSON.stringify({ 'lat': element.lat, "lng": element.lng })
        client_request(url, data, operation)
    });
}


