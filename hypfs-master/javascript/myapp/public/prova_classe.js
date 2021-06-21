var Vehicle =  require('./Vehicle.js')

const pathNames = [1, 2, 3];
let vehicles = [];

pathNames.forEach((pathName) => vehicles.push(new Vehicle(pathName)));
console.log(vehicles[0].coord)
