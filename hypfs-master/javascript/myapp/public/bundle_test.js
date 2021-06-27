(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var paths = require('./path');

class Vehicle {
    constructor(num_percorso) {
        this.num_percorso = num_percorso;
        this.coord = this.show_coords(num_percorso)

    }

    show_coords(num_percorso) {

        switch (num_percorso) {
            case 1:
                return paths.path1
            case 2:
                return paths.path2
            case 3:
                return paths.path3
            case 4:
                return paths.path4
            case 5:
                return paths.path5
            case 6:
                return paths.path6
            case 7:
            case 8:
            case 9:
            case 10:

            default:
            // code block
        }

    }
}

module.exports = Vehicle
},{"./path":3}],2:[function(require,module,exports){
var paths = require('./path');


mypath_label = ["path1", "path2", "path3", "path4", "path5", "path6"]
mypath = [paths.path1, paths.path2, paths.path3, paths.path4, paths.path5, paths.path6]

//cerco i punti in comuner tra i path
intersections = []
for (let i = 0; i < mypath.length; i++) {
    for (let k = i + 1; k < mypath.length; k++) {

        if (mypath[i].filter(item1 => mypath[k].some(item2 => item1.lat === item2.lat && item1.lng === item2.lng)) != "") {
            //console.log("Punti in comune:", mypath_label[i], mypath_label[k], mypath[i].filter(item1 => mypath[k].some(item2 => item1.lat === item2.lat && item1.lng === item2.lng)))

            intersections.push(mypath[i].filter(item1 => mypath[k].some(item2 => item1.lat === item2.lat && item1.lng === item2.lng)))
        }
    }
}

//metto tutti gli elementi in comune in un unico array
intersections = intersections.flat(1); //The depth level specifying how deep a nested array structure should be flattened. Defaults to 1.

//rimuovo i duplicati prima di fare inserimento  marker pothole

intersections = intersections.filter((thing, index, self) =>
    index === self.findIndex((t) => (
        t.lat === thing.lat && t.lng === thing.lng
    ))
)

console.log("Intersezioni:", intersections)



module.exports = {intersections}
},{"./path":3}],3:[function(require,module,exports){

/*
path1 = [

    {
        "lat": 44.38755,
        "lng": 11.63314
    },
    {
        "lat": 44.3875,
        "lng": 11.63316
    },
    {
        "lat": 44.38707,
        "lng": 11.63334
    },
    {
        "lat": 44.38696,
        "lng": 11.63336
    }
],
    path2 = [

        {
            "lat": 44.43794,
            "lng": 11.22212
        },
        {
            "lat": 44.38696,
            "lng": 11.63336
        },
        {
            "lat": 44.4378,
            "lng": 11.22261
        },

        {
            "lat": 44.43786,
            "lng": 11.22246
        }
        
  
    ],
    path3 = [
        {
            "lat": 44.29928,
            "lng": 12.17796
        },
        {
            "lat": 44.4378,
            "lng": 11.22261
        },
        {
            "lat": 44.29988,
            "lng": 12.17813
        },
        {
            "lat": 44.30023,
            "lng": 12.17823
        },

    ]
path4 = [

    {
        "lat": 44.44746,
        "lng": 10.94609
    },
    {
        "lat": 44.44728,
        "lng": 10.94594
    },
    {
        "lat": 44.30028,
        "lng": 12.17824
    },
    {
        "lat": 44.44718,
        "lng": 10.94586
    }


],
    path5 = [

        {
            "lat": 44.50896,
            "lng": 11.36254
        },
        {
            "lat": 44.50926,
            "lng": 11.36232
        },
        {
            "lat": 44.44693,
            "lng": 10.94565
        },
        {
            "lat": 44.50926,
            "lng": 11.36232
        },
        {
            "lat": 44.38755,
            "lng": 11.63314
        }

    ],
    path6 = [

        {
            "lat": 44.44746,
            "lng": 10.94609
        },
        {
            "lat": 44.44693,
            "lng": 10.94565
        },
        {
            "lat": 44.50926,
            "lng": 11.36232
        },
        {
            "lat": 44.4378,
            "lng": 11.22261
        }

    ]

    */

path1 = [

    {
        "lat": 44.38755,
        "lng": 11.63314
    },
    {
        "lat": 44.3875,
        "lng": 11.63316
    },
    {
        "lat": 44.38707,
        "lng": 11.63334
    },
    {
        "lat": 44.38696,
        "lng": 11.63336
    },
    {
        "lat": -13.16429,
        "lng": -72.53975
    },
    {
        "lat": -13.16422,
        "lng": -72.53984
    },
    {
        "lat": -13.16414,
        "lng": -72.53996
    },
    {
        "lat": -13.16409,
        "lng": -72.54007
    },
    {
        "lat": -12.42964,
        "lng": -72.64603
    },

],
    path2 = [
        {
            "lat": -13.21918,
            "lng": -72.35374
        },
        {
            "lat": -13.16429,
            "lng": -72.53975
        },
        {
            "lat": -13.2194,
            "lng": -72.35355
        },
        {
            "lat": -13.21973,
            "lng": -72.35318
        },
        {
            "lat": -13.22012,
            "lng": -72.35276
        },
        {
            "lat": 44.43794,
            "lng": 11.22212
        },
        {
            "lat": 44.38696,
            "lng": 11.63336
        },
        {
            "lat": 44.4378,
            "lng": 11.22261
        },

        {
            "lat": 44.43786,
            "lng": 11.22246
        }

    ],
    path3 = [
        {
            "lat": -12.42964,
            "lng": -72.64603
        },
        {
            "lat": -12.42969,
            "lng": -72.64576
        },
        {
            "lat": -12.4299,
            "lng": -72.64519
        },
        {
            "lat": -12.42994,
            "lng": -72.64471
        },
        {
            "lat": -11.6679,
            "lng": -74.31387
        },
        {
            "lat": 44.29928,
            "lng": 12.17796
        },
        {
            "lat": 44.4378,
            "lng": 11.22261
        },
        {
            "lat": 44.29988,
            "lng": 12.17813
        },
        {
            "lat": 44.30023,
            "lng": 12.17823
        }

    ],
    path4 = [
        {
            "lat": -11.6679,
            "lng": -74.31387
        },
        {
            "lat": -11.66787,
            "lng": -74.31391
        },
        {
            "lat": -11.66782,
            "lng": -74.31413
        },
        {
            "lat": -10.68663,
            "lng": -75.31367
        },
        {
            "lat": -11.66782,
            "lng": -74.31465
        },
        {
            "lat": 44.44746,
            "lng": 10.94609
        },
        {
            "lat": 44.44728,
            "lng": 10.94594
        },
        {
            "lat": 44.30028,
            "lng": 12.17824
        },
        {
            "lat": 44.44718,
            "lng": 10.94586
        }
    ],
    path5 = [
        {
            "lat": -10.68663,
            "lng": -75.31367
        },
        {
            "lat": -10.68642,
            "lng": -75.31385
        },
        {
            "lat": -10.68635,
            "lng": -75.31395
        },
        {
            "lat": -10.68635,
            "lng": -75.31395
        },
        {
            "lat": -10.65178,
            "lng": -75.38716
        },
        {
            "lat": 44.50896,
            "lng": 11.36254
        },
        {
            "lat": 44.50926,
            "lng": 11.36232
        },
        {
            "lat": 44.44693,
            "lng": 10.94565
        },
        {
            "lat": 44.50926,
            "lng": 11.36232
        },
        {
            "lat": 44.38755,
            "lng": 11.63314
        }
    ],
    path6 = [
        {
            "lat": -10.65178,
            "lng": -75.38716
        },
        {
            "lat": -10.64928,
            "lng": -75.38694
        },
        {
            "lat": -10.64603,
            "lng": -75.38727
        },
        {
            "lat": -10.64603,
            "lng": -75.38727
        },
        {
            "lat": -11.66787,
            "lng": -74.31391
        }, {
            "lat": 44.44746,
            "lng": 10.94609
        },
        {
            "lat": 44.44693,
            "lng": 10.94565
        },
        {
            "lat": 44.50926,
            "lng": 11.36232
        },
        {
            "lat": 44.4378,
            "lng": 11.22261
        }
    ]

module.exports = { path1, path2, path3, path4, path5, path6 }
},{}],4:[function(require,module,exports){
(function (global){(function (){
//browserify test_vehicles.js -o bundle_test.js  
//browserify C:\Users\Amministratore\Desktop\IOTA_DHT\hypfs-master\javascript\myapp\test\test_vehicles.js >C:\Users\Amministratore\Desktop\IOTA_DHT\hypfs-master\javascript\myapp\public\bundle_test.js
var Vehicle = require('./Vehicle.js')
var intersections = require('./intersections.js')



//Istanzio Array di veicoli da testare
function init_vehicles() {

    //const pathNames = [1, 2, 3, 4, 5, 6];    //tipologie di veicoli
    //const num_vehicles = [5, 5, 5, 5, 5, 5]  //num di veicoli da create
    const pathNames = [1, 2, 3];    //tipologie di veicoli
    const num_vehicles = [2, 2, 2]  //num di veicoli da create

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
            } else {
                console.log("END TEST.")

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
            //var url = "/insertTest"
            var url = "/insertIota"

            test_request(data, url, "insert")

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
            var url = "/superset_search_iota"


            test_request(data, url, "superset_search")

            if (++i < element.coord.length) {
                setTimeout(loop, 30000);  // call myself in 3 seconds time if required
            } else {
                console.log("END TEST.")
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
                        break;
                    default:
                    // code block
                }
                //console.log(data)

            }


        },
        error: function (err) {
            console.log("errore", err)
        }
    });

}



}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./Vehicle.js":1,"./intersections.js":2}]},{},[4]);
