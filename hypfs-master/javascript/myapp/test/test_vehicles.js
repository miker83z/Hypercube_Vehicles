//browserify test_vehicles.js -o bundle_test.js  
//browserify C:\Users\Amministratore\Desktop\IOTA_DHT\hypfs-master\javascript\myapp\test\test_vehicles.js >C:\Users\Amministratore\Desktop\IOTA_DHT\hypfs-master\javascript\myapp\public\bundle_test.js
var Vehicle = require('./Vehicle.js')
var intersections = require('./intersections.js')



//Init vehicles for testing
function init_vehicles() {

    const pathNames = [1, 2, 3, 4, 5, 6];    //types of vehicles
    const num_vehicles = [10, 10, 10, 10, 10, 10]  //num of vehicles

    //const pathNames = [1];    
    //const num_vehicles = [1]  

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

//Start insert test
global.start_insert_test = function () {

    vehicles = init_vehicles()
    console.log("Test started");
    
    vehicles.forEach(element => {

        var i = 0;

        (function loop() {

            contains(intersections.intersections, element.coord[i], element, i)

            if (++i < element.coord.length) {
                setTimeout(loop, 3*60*1000);  // call  in 3 seconds time
            } else {
                console.log("END TEST.")

            }
        })();


    });

}


//check if the coordinates coincide with the pathole
function contains(markers, obj, element, tappa) {
    var i = markers.length;
    while (i--) {
        if (markers[i].lat === obj.lat && markers[i].lng === obj.lng) {
            console.log("Tipo veicolo:", element.num_percorso, "Tappa:", tappa, "Matches:", obj)

            var data = JSON.stringify({ 'lat': obj.lat, "lng": obj.lng })
            var url = "/insertTestMam"

            test_request(data, url, "insert")

        }
    }
    //return "false";
}

//Test start superset Search
global.start_search_test = function () {

    vehicles = init_vehicles()
    console.log("Test search started");

    vehicles.forEach(element => {

        var i = 0;
        (function loop() {

            console.log(element.coord[i], element.num_percorso)

            var data = JSON.stringify({ 'point': { 'lat': element.coord[i].lat, "lng": element.coord[i].lng }, 'threshold': 5 })
            var url = "/superset_search_mam"

            test_request(data, url, "superset_search")

            if (++i < element.coord.length) {
                setTimeout(loop, 3*60*1000);  // call in 3 seconds time if required
            } else {
                console.log("END TEST.")
            }
        })();
    });
}


var num_success = 0
function test_request(data, url, operation) {

    $.ajax({
        type: 'POST',
        url: url,
        contentType: 'application/json',
        data: data,
        success: function (data) {
            num_success = num_success + 1
            console.log("success", num_success)
            if (data === false) {
                console.log("No result found")

            } else {

                switch (operation) {
                    case "insert":
                        console.log(data)
                        break;
                    case "superset_search":
                        console.log("num messaggi:", data.data.length)
                        console.log( data.data)

                        break;
                    default:
                    // code block
                }
            }
        },
        error: function (err) {
            console.log("errore", err)
        }
    });
}


