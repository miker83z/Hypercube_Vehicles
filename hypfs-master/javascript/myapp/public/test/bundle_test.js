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
},{"./path":2}],2:[function(require,module,exports){
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
            "lat": 44.43786,
            "lng": 11.22246
        },
        {
            "lat": 44.4378,
            "lng": 11.22261
        },
  
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
    },


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
        }


    ],
    path6 = [

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
            "lat": 44.43794,
            "lng": 11.22212
        },
    ]


module.exports = { path1, path2, path3, path4, path5, path6 }
},{}],3:[function(require,module,exports){
(function (global){(function (){
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


}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./Vehicle.js":1}]},{},[3]);
