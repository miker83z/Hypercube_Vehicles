//>browserify test_vehicles.js -o bundle_test.js
var Vehicle = require('./Vehicle.js')

/*
pathNames.forEach((pathName) =>
    vehicles.push(new Vehicle(pathName)));

vehicles.forEach((vehicle) => console.log(vehicle.num_percorso, vehicle.coord,))
*/

function init_vehicles() {

    //const pathNames = [1, 2, 3, 4, 5, 6];    //tipologie di veicoli
    //const num_vehicles = [3, 3, 3, 3, 3, 3]  //num di veicoli da create

    const pathNames = [1, 2];    //tipologie di veicoli
    const num_vehicles = [3, 3]  //num di veicoli da create


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


//console.log(vehicles[0].coord[0])
//TODO: inserire dati su iota e calcolare latenza


global.start_insert_test = function () {

    vehicles = init_vehicles()
    console.log("Test start");

    vehicles.forEach(element => {

        var i = 0;

        (function loop() {
            //console.log("------------------------");
            //console.log("Tappa:", i, "-", "Tipo veicolo", element.num_percorso, element.coord[i])
            var data = JSON.stringify({ 'lat': element.coord[i].lat, "lng": element.coord[i].lng })
            insert_test_request(data)

            if (++i < element.coord.length) {
                setTimeout(loop, 3000);  // call myself in 3 seconds time if required
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

function insert_test_request(data) {
    $.ajax({
        type: 'POST',
        url: "/insertTest",
        contentType: 'application/json',
        data: data,
        success: function (data) {
            console.log("success")

        },
        error: function (err) {
            console.log("errore", err)
        }
    });

}

