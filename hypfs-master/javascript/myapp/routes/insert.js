var express = require('express');
var router = express.Router();
const request = require('request');
const myModulePublish = require('../IOTA_services/publishMAM');
const execute = myModulePublish.execute
const iotaAreaCodes = require('@iota/area-codes');
const utils = require('../utils')


/* POST data into  DHT and MAM */

router.post('/insert', async function (req, res) {


  keyword = Math.floor(Math.random() * 7) + 1
  obj = utils.generate_coord()
  console.log(keyword, obj)

  //insert data in MAM
  var iac = iotaAreaCodes.encode(obj.latitude, obj.longitude);
  console.log("IAC:", iac)
  //TODO: METTERE CONTROLLO IAC
  var root = await execute(iac)

  //request to DHT

  make_req(keyword, root, function (data) {

    res.send(data)
  })
});


const make_req = async function (keyword, root, callback) {

  const options = {
    url: 'http://127.0.0.1:50001/insert',
    method: 'GET',
    qs: { 'keyword': keyword, "obj": root },
    json: true
  };

  request(options, function optionalCallback(err, httpResponse, body) {

    if (err) {
      return console.error('upload failed:', err);
    }
    console.log('Server responded with:', body);

    callback(body)

  })
}


module.exports = router;
