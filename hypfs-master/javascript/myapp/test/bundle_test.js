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

//takes common points between the paths
intersections = []
for (let i = 0; i < mypath.length; i++) {
    for (let k = i + 1; k < mypath.length; k++) {

        if (mypath[i].filter(item1 => mypath[k].some(item2 => item1.lat === item2.lat && item1.lng === item2.lng)) != "") {
            //console.log("Punti in comune:", mypath_label[i], mypath_label[k], mypath[i].filter(item1 => mypath[k].some(item2 => item1.lat === item2.lat && item1.lng === item2.lng)))

            intersections.push(mypath[i].filter(item1 => mypath[k].some(item2 => item1.lat === item2.lat && item1.lng === item2.lng)))
        }
    }
}

intersections = intersections.flat(1); 

//delete duplicates
intersections = intersections.filter((thing, index, self) =>
    index === self.findIndex((t) => (
        t.lat === thing.lat && t.lng === thing.lng
    ))
)

console.log("Intersezioni:", intersections)

module.exports = {intersections}
},{"./path":3}],3:[function(require,module,exports){


path1 = [

    {
        "lat": 55.21,
        "lng": 91.45138
    },
    {
        "lat": 55.21039,
        "lng": 91.4522
    },
    {
        "lat": 55.21253,
        "lng": 91.45636
    },

    {
        "lat": 51.13021,
        "lng": 10.34904
    },
    {
        "lat": 51.13045,
        "lng": 10.34902
    },

    {
        "lat": 51.13064,
        "lng": 10.349
    },



    {
        "lat": 51.128,
        "lng": 10.34872
    },
    {
        "lat": 51.12784,
        "lng": 10.34903
    },



    {
        "lat": 38.11194,
        "lng": 13.36111
    },
    {
        "lat": 38.11186,
        "lng": 13.36102
    },
    {
        "lat": 38.11175,
        "lng": 13.36087
    },
    {
        "lat": 38.11175,
        "lng": 13.36087
    },

    {
        "lat": 38.11176,
        "lng": 13.35843
    },

    {
        "lat": 51.12945,
        "lng": 10.35095
    },
    {
        "lat": 51.12943,
        "lng": 10.35058
    },
    {
        "lat": 51.12951,
        "lng": 10.3502
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
        "lat": 51.12945,
        "lng": 10.35095
    },
    {
        "lat": 51.12943,
        "lng": 10.35058
    },

    //PER HOPS
    /*
    
    {
        "lat": 32.15087,
        "lng": -1.47333
    },

    {
        "lat": 32.14786,
        "lng": -1.47217
    },
    {
        "lat": 51.12954,
        "lng": 10.35181
    },
    {
        "lat": 51.12947,
        "lng": 10.35126
    },

    {
        "lat": 51.12502,
        "lng": 10.35352
    },
    {
        "lat": 51.12505,
        "lng": 10.35362
    },
    {
        "lat": 51.12506,
        "lng": 10.35371
    },
    {
        "lat": 51.12503,
        "lng": 10.35381
    },
    {
        "lat": 51.12498,
        "lng": 10.35385
    },
    {
        "lat": 51.12492,
        "lng": 10.35389
    },
    {
        "lat": 51.12483,
        "lng": 10.35388
    },
    {
        "lat": 51.12464,
        "lng": 10.35386
    },
    {
        "lat": 51.12443,
        "lng": 10.35373
    },
    {
        "lat": 51.12435,
        "lng": 10.35368
    },
    {
        "lat": 51.12428,
        "lng": 10.35357
    },
    {
        "lat": 51.12421,
        "lng": 10.35338
    },
    {
        "lat": 51.12415,
        "lng": 10.35307
    },

    //bolo

    {
        "lat": 44.4378,
        "lng": 11.22261
    },

    {
        "lat": 44.43786,
        "lng": 11.22246
    },
    {
        "lat": 51.61037,
        "lng": -0.34227
    },

    {
        "lat": 51.51787,
        "lng": -0.15288
    },

    {
        "lat": 51.1297,
        "lng": 10.35478
    },
    {
        "lat": 51.12959,
        "lng": 10.35428
    },

    {
        "lat": -10.65178,
        "lng": -75.38716
    },

    {
        "lat": 44.44746,
        "lng": 10.94609
    },
    {
        "lat": 44.44693,
        "lng": 10.94565
    },
    {
        "lat": 44.4378,
        "lng": 11.22261
    },

    {
        "lat": 44.43786,
        "lng": 11.22246
    },



    {
        "lat": 55.18017,
        "lng": 91.31826
    },

    {
        "lat": 55.18344,
        "lng": 91.31881
    },
    {
        "lat": 55.18358,
        "lng": 91.31877
    },
    {
        "lat": 55.18372,
        "lng": 91.31882
    },
    {
        "lat": 55.18397,
        "lng": 91.31903
    },
    {
        "lat": 55.18455,
        "lng": 91.31955
    },
    {
        "lat": 55.1852,
        "lng": 91.32013
    },
    {
        "lat": 55.1863,
        "lng": 91.32109
    },
    {
        "lat": 55.18678,
        "lng": 91.32156
    },
    {
        "lat": 55.18732,
        "lng": 91.32211
    },
    {
        "lat": 55.18849,
        "lng": 91.32321
    },
    {
        "lat": 55.19012,
        "lng": 91.32468
    },
    
*/

],
    path2 = [


        {
            "lat": 32.15087,
            "lng": -1.47333
        },

        {
            "lat": 32.14786,
            "lng": -1.47217
        },
        {
            "lat": 51.12954,
            "lng": 10.35181
        },
        {
            "lat": 51.12947,
            "lng": 10.35126
        },

        {
            "lat": 51.12502,
            "lng": 10.35352
        },
        {
            "lat": 51.12505,
            "lng": 10.35362
        },
        {
            "lat": 51.12506,
            "lng": 10.35371
        },
        {
            "lat": 51.12503,
            "lng": 10.35381
        },
        {
            "lat": 51.12498,
            "lng": 10.35385
        },
        {
            "lat": 51.12492,
            "lng": 10.35389
        },
        {
            "lat": 51.12483,
            "lng": 10.35388
        },
        {
            "lat": 51.12464,
            "lng": 10.35386
        },
        {
            "lat": 51.12443,
            "lng": 10.35373
        },
        {
            "lat": 51.12435,
            "lng": 10.35368
        },
        {
            "lat": 51.12428,
            "lng": 10.35357
        },
        {
            "lat": 51.12421,
            "lng": 10.35338
        },
        {
            "lat": 51.12415,
            "lng": 10.35307
        },

        //bolo

        {
            "lat": 44.4378,
            "lng": 11.22261
        },

        {
            "lat": 44.43786,
            "lng": 11.22246
        },
        {
            "lat": 51.61037,
            "lng": -0.34227
        },

    ],


    path3 = [

        //Palermo


        {
            "lat": 55.1863,
            "lng": 91.32109
        },
        {
            "lat": 55.18678,
            "lng": 91.32156
        },
        {
            "lat": 38.11175,
            "lng": 13.36087
        },
        {
            "lat": 38.11175,
            "lng": 13.36087
        },
        {
            "lat": 38.11186,
            "lng": 13.36072
        },
        {
            "lat": 38.11216,
            "lng": 13.3603
        },
        {
            "lat": 38.11225,
            "lng": 13.36018
        },
        {
            "lat": 38.11227,
            "lng": 13.36017
        },
        {
            "lat": 38.1123,
            "lng": 13.36014
        },

        {
            "lat": 38.11684,
            "lng": 13.34773
        },
        {
            "lat": 38.1162,
            "lng": 13.34794
        },
        {
            "lat": 38.1162,
            "lng": 13.34794
        },
        {
            "lat": 38.11635,
            "lng": 13.34861
        },
        {
            "lat": 38.11635,
            "lng": 13.34861
        },

        {
            "lat": 37.87203,
            "lng": 14.99702
        },

        {
            "lat": -12.42964,
            "lng": -72.64603
        },
        {
            "lat": -12.42969,
            "lng": -72.64576
        },

        {
            "lat": 44.29928,
            "lng": 12.17796
        },
        {
            "lat": 32.14786,
            "lng": -1.47217
        },
        {
            "lat": 32.14791,
            "lng": -1.47222
        },

    ],
    path4 = [

        {
            "lat": 51.12483,
            "lng": 10.35388
        },
        {
            "lat": 51.12464,
            "lng": 10.35386
        },


        {
            "lat": 32.15087,
            "lng": -1.47333
        },

        {
            "lat": 32.14786,
            "lng": -1.47217
        },


        {
            "lat": 32.14859,
            "lng": -1.4725
        },

        {
            "lat": 38.11225,
            "lng": 13.36018
        },

        {
            "lat": 38.11237,
            "lng": 13.36008
        },
        {
            "lat": 38.11235,
            "lng": 13.36004
        },

        {
            "lat": 38.11164,
            "lng": 13.35809
        },

        //Russia
        {
            "lat": 55.18017,
            "lng": 91.31826
        },
        {
            "lat": 55.18021,
            "lng": 91.3198
        },

        {
            "lat": 55.18212,
            "lng": 91.31905
        },

        {
            "lat": 51.13048,
            "lng": 10.35772
        },
        {
            "lat": 51.13033,
            "lng": 10.35702
        },
        {
            "lat": 51.13022,
            "lng": 10.35652
        },

        {
            "lat": -11.6679,
            "lng": -74.31387
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
        },

        {
            "lat": 37.87205,
            "lng": 14.99703
        },
    ],
    path5 = [



        {
            "lat": 37.87205,
            "lng": 14.99703
        },
        {
            "lat": 37.87203,
            "lng": 14.99702
        },


        {
            "lat": 37.86827,
            "lng": 15.00246
        },
        {
            "lat": 37.86827,
            "lng": 15.00246
        },

        {
            "lat": 51.12821,
            "lng": 10.34842
        },
        {
            "lat": 51.128,
            "lng": 10.34872
        },
        {
            "lat": 51.12784,
            "lng": 10.34903
        },

        {
            "lat": 55.18017,
            "lng": 91.31826
        },

        {
            "lat": 55.20786,
            "lng": 91.36774
        },
        {
            "lat": 55.20808,
            "lng": 91.36838
        },


        {
            "lat": 32.15087,
            "lng": -1.47333
        },
        {
            "lat": 32.15208,
            "lng": -1.47406
        },
        {
            "lat": 32.1539,
            "lng": -1.47523
        },

        {
            "lat": 55.18017,
            "lng": 91.31826
        },
        {
            "lat": 55.18849,
            "lng": 91.32321
        },
        {
            "lat": 55.19012,
            "lng": 91.32468
        },

        {
            "lat": 55.18455,
            "lng": 91.31955
        },
        {
            "lat": 51.51786,
            "lng": -0.15284
        },
        {
            "lat": 51.51787,
            "lng": -0.15288
        },


        {
            "lat": 51.13048,
            "lng": 10.35772
        }
    ],
    path6 = [




        {
            "lat": 51.51787,
            "lng": -0.15288
        },

        {
            "lat": 51.1297,
            "lng": 10.35478
        },
        {
            "lat": 51.12959,
            "lng": 10.35428
        },

        {
            "lat": -10.65178,
            "lng": -75.38716
        },

        {
            "lat": 44.44746,
            "lng": 10.94609
        },
        {
            "lat": 44.44693,
            "lng": 10.94565
        },
        {
            "lat": 44.4378,
            "lng": 11.22261
        },

        {
            "lat": 44.43786,
            "lng": 11.22246
        },



        {
            "lat": 55.18017,
            "lng": 91.31826
        },

        {
            "lat": 55.18344,
            "lng": 91.31881
        },
        {
            "lat": 55.18358,
            "lng": 91.31877
        },
        {
            "lat": 55.18372,
            "lng": 91.31882
        },
        {
            "lat": 55.18397,
            "lng": 91.31903
        },
        {
            "lat": 55.18455,
            "lng": 91.31955
        },
        {
            "lat": 55.1852,
            "lng": 91.32013
        },
        {
            "lat": 55.1863,
            "lng": 91.32109
        },
        {
            "lat": 55.18678,
            "lng": 91.32156
        },
        {
            "lat": 55.18732,
            "lng": 91.32211
        },
        {
            "lat": 55.18849,
            "lng": 91.32321
        },
        {
            "lat": 55.19012,
            "lng": 91.32468
        },


    ]


console.log(path1.length)
console.log(path2.length)
console.log(path3.length)
console.log(path4.length)
console.log(path5.length)
console.log(path6.length)

module.exports = { path1, path2, path3, path4, path5, path6 }
},{}],4:[function(require,module,exports){
(function (global){(function (){
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
            var url = "/insertIota"

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
            var url = "/superset_search_iota"

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



}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./Vehicle.js":1,"./intersections.js":2}]},{},[4]);
