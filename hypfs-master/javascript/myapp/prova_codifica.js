const config = require('./config');

const HIPERCUBE_SIZE = 8
var mod = require('hash-mod')(HIPERCUBE_SIZE);



//Converts strings firstly to hashes and then to numbers
function hashToBin(myString) {
   
    bitStrigs = []
    myString.forEach(element => {
        
        if (/^0*$/.test(element) == false){ // check if string contains anly 0

            var hash = mod(element)
            //console.log(hash)
            var sixBitBinary = hash.toString(2).padStart(HIPERCUBE_SIZE, 0)
            bitStrigs.push(sixBitBinary)
        }
        

    });
    console.log("hashToBin:", bitStrigs)
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
    console.log('split_olc', res)
    return res;

}

//General function for olc conversion 
function encode(mystring) {
    splitted = split_olc(mystring)
    bitStrigs = hashToBin(splitted)
    return bitStrigs

}

//Bitwise operation between bitstrings
function binToStr(arr) {

   
    var ans = arr[0];
    
    // Traverse the array compute OR
    for (let i = 0; i < arr.length; i++) {

        ans = (parseInt(ans, 2)  |  parseInt(arr[i], 2) ).toString(2)
        //ans = ans | arr[i]
    
    }
 
    ans = String(ans).padStart(HIPERCUBE_SIZE, 0)
    console.log("binToStr:", ans)
    return ans;
}




var point1 = '8FPHC6'
var point11 = '8F0000'

var point2 = '57W78M'
var point22 = '570000'
var point222 = '57W900'

var point3 = '8FPHG9'

var point4 = '9F32P8'
var point44 = '9F0000'




var encoded_point = binToStr(encode(point1))
var encoded_point = binToStr(encode(point11))
console.log("-------------------")
var encoded_point = binToStr(encode(point2))
var encoded_point = binToStr(encode(point22))
var encoded_point = binToStr(encode(point222))
console.log("-------------------")
var encoded_point = binToStr(encode(point3))
console.log("-------------------")
var encoded_point = binToStr(encode(point4))
var encoded_point = binToStr(encode(point44))
console.log("-------------------")





