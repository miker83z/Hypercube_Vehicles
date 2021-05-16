const randomLocation = require('random-location')

function generate_coord() {

    const P = {
        latitude: 44.496893,
        longitude: 11.342327
    }

    const R = 1000 // meters

    const randomPoint = randomLocation.randomCirclePoint(P, R)
    return randomPoint
}



function split_str(string) {

    var str_splitted = new Array();
    str_splitted = string.split(",");

    return str_splitted
}

module.exports = { split_str, generate_coord };