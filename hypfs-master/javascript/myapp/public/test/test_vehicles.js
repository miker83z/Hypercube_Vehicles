//browserify test_vehicles.js -o bundle_test.js
var Vehicle = require('./Vehicle.js')
var intersections = require('./intersections.js')


//Istanzio Array di veicoli da testare
function init_vehicles() {

    const pathNames = [1, 2, 3, 4, 5, 6];    //tipologie di veicoli
    const num_vehicles = [3, 3, 3, 3, 3, 3]  //num di veicoli da create
    //const pathNames = [1, 2];    //tipologie di veicoli
    //const num_vehicles = [2, 2]  //num di veicoli da create

    let vehicles = [];

    for (let i = 0; i < num_vehicles.length; i++) {
        let j = 0
        while (j < num_vehicles[i]) {
            //pathNames.forEach((pathName) =>
            vehicles.push(new Vehicle(pathNames[i]));
            j++
        }
    }
    return vehicles

}

//Test insert


global.start_insert_test = function () {

    vehicles = init_vehicles()
    console.log("Test started");

    vehicles.forEach(element => {

        var i = 0;

        (function loop() {

            contains(intersections.intersections, element.coord[i], element, i)

            if (++i < element.coord.length) {
                setTimeout(loop, 30000);  // call myself in 3 seconds time if required
            }
        })();
    });
}


//Funzione che verifica se la coord del veicolo coincide con un pothole

function contains(markers, obj, element, tappa) {
    var i = markers.length;
    while (i--) {
        if (markers[i].lat === obj.lat && markers[i].lng === obj.lng) {
            // return a[i].lenm, a[i].lng;
            console.log("Tipo veicolo:", element.num_percorso, "Tappa:", tappa, "Matches:", obj)

            var data = JSON.stringify({ 'lat': obj.lat, "lng": obj.lng })
            var url = "/insertTest"

            test_request(data, url)

        }
    }
    //return "false";
}

//Test supersetSearch

global.start_search_test = function () {

    vehicles = init_vehicles()
    console.log("Test search started");

    vehicles.forEach(element => {

        var i = 0;

        (function loop() {

            console.log(element.coord[i], element.num_percorso)

            var data = JSON.stringify({ 'point': { 'lat': element.coord[i].lat, "lng": element.coord[i].lng }, 'threshold': 5 })
            var url = "/superset_search_test"

            test_request(data, url)

            if (++i < element.coord.length) {
                setTimeout(loop, 60000);  // call myself in 3 seconds time if required
            }
        })();
    });
}


/*
var s = [0, 1, 2];
var i = 0;


(function loop() {
    console.log(s[i])
    if (++i < s.length) {
        setTimeout(loop, 3000);  // call myself in 3 seconds time if required
    }
})();      // above function expression is called immediately to start it off
*/
var num_success = 0
function test_request(data, url) {

    $.ajax({
        type: 'POST',
        url: url,
        contentType: 'application/json',
        data: data,
        success: function (data) {
            num_success = num_success + 1
            console.log("success", num_success)
            console.log("num messaggi:", data.data.length)

        },
        error: function (err) {
            console.log("errore", err)
        }
    });

}


