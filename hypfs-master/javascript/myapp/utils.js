const randomLocation = require('random-location')
var OpenLocationCode = require('open-location-code').OpenLocationCode;
var config = require('./config');
var mod = require('hash-mod')(config.dht.HIPERCUBE_SIZE);


//Creates and converts random points in OLC
function generate_coord() {

    const P = {
        latitude: 44.496893,
        longitude: 11.342327
    }

    const R = config.location.METERS 
    var randomPoint = randomLocation.randomCirclePoint(P, R)
    randomPoint = OPC_conversion(randomPoint)
    return randomPoint
}

//Coverts location points in OLC
function OPC_conversion(point) {
    openLocationCode = new OpenLocationCode();
    var code = openLocationCode.encode(point.latitude, point.longitude, 6);
    return code

}

//Coverts location points in OLC
function OPC_conversion_manual(point) {
    openLocationCode = new OpenLocationCode();
    var code = openLocationCode.encode(point.lat, point.lng, 6);
    return code

}

//Splits a strings based on commas 
function split_str(string) {

    var str_splitted = new Array();
    str_splitted = string.split(",");
    return str_splitted
}

//Converts strings firstly to hashes and then to numbers
function hashToBin(myString) {

    bitStrigs = []
    myString.forEach(element => {
        var hash = mod(element)
        var sixBitBinary = hash.toString(2).padStart(config.dht.HIPERCUBE_SIZE, 0)
        bitStrigs.push(sixBitBinary)

    });
    return bitStrigs
}

//Splits olc in array of substrings 
function split_olc(s) {

    s = s.replace('+', '');
    const template = s.replace(/./g, '0');
    const res = [];
    for (let i = 0; i < s.length; i += 2) {
        res.push(
            template.substring(0, i)
            + s.substring(i, i + 2)
            + template.substring(i + 2)
        );
    }
    return res;


}


//General function for olc conversion 
function encode(mystring) {
    splitted = split_olc(mystring)
    bitStrigs = hashToBin(splitted)
    console.log(bitStrigs)
    return bitStrigs

}

//Swipe operation between bitstrings
function binToStr(arr) {
    let ans = arr[0];
    // Traverse the array compute AND
    for (let i = 0; i < arr.length; i++) {
        ans = (ans | arr[i]);
    }
    ans = String(ans).padStart(config.dht.HIPERCUBE_SIZE, 0)
    return ans;
}



module.exports = { split_str, generate_coord, hashToBin, encode, binToStr, OPC_conversion_manual };