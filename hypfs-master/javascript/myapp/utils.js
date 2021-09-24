const randomLocation = require('random-location')
var OpenLocationCode = require('open-location-code').OpenLocationCode;
var config = require('./config');
var mod = require('hash-mod')(config.dht.HIPERCUBE_SIZE);
const fs = require('fs')


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
    //se la precisione è 6, tronco ultime due cifre che sono 00
    code = code.slice(0, -3);
    return code

}

//Coverts location points in OLC
function OPC_conversion_manual(point) {

    openLocationCode = new OpenLocationCode();
    var code = openLocationCode.encode(point.lat, point.lng, 6);
    //se la precisione è 6, tronco ultime due cifre che sono 00
    code = code.slice(0, -3);

    return code


}

//Splits a strings based on commas 
function split_str(string) {

    var str_splitted = new Array();
    str_splitted = string.split(",");
    //console.log("split_str:", str_splitted)
    return str_splitted
}

//Converts strings firstly to hashes and then to numbers
//Converts strings firstly to hashes and then to numbers
function hashToBin(myString) {

    bitStrigs = []
    myString.forEach(element => {

        if (/^0*$/.test(element) == false) { // check if string contains anly 0

            var hash = mod(element)
            //console.log(hash)
            var sixBitBinary = hash.toString(2).padStart(config.dht.HIPERCUBE_SIZE, 0)
            bitStrigs.push(sixBitBinary)
        }

    });
    //console.log("hastToBin:", bitStrigs)
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
    //console.log('split_olc', res)
    return res;


}


//General function for olc conversion 
function encode(mystring) {
    splitted = split_olc(mystring)
    bitStrigs = hashToBin(splitted)
    //console.log(bitStrigs)
    return bitStrigs

}

//Swipe operation between bitstrings
function binToStr(arr) {
    let ans = arr[0];
    // Traverse the array compute AND
    for (let i = 0; i < arr.length; i++) {
        ans = (parseInt(ans, 2) | parseInt(arr[i], 2)).toString(2)
        //ans = ans | arr[i]

    }
    ans = String(ans).padStart(config.dht.HIPERCUBE_SIZE, 0)
    //console.log("binToStr:", ans)
    return ans;
}

/*
var point = { 'lat': '-13.16429', 'lng': '-72.53975' }
var point2 = { "lat": '44.44718', "lng": '10.94586' }
var point3 = { 'lat': '38.17858', 'lng': '13.29995' }
var point4 = { 'lat': '42.63164', 'lng': ' 25.4166' }

var points = []
points.push(point, point2, point3, point4)

points.forEach(element => {
    olc = OPC_conversion_manual(element)
    const encoded_point = binToStr(encode(olc))
    console.log("POINT:", olc, "-->", "ENCODED POINT:", encoded_point)
    console.log('-------------------------')

});

*/



function write_csv(start_time, end_time, path) {

    //console.log(end_time - start_time)
    fs.appendFile(path, end_time - start_time +'\n', function (err) {
        if (err) throw err;
        //console.log('Thanks, It\'s saved to the file!');
    });

}

const P = {
    latitude:  44.474937,
    longitude: 11.324938
}
console.log(OPC_conversion(P))


module.exports = { split_str, generate_coord, hashToBin, encode, binToStr, OPC_conversion_manual, write_csv };