var express = require('express');
var router = express.Router();
const request = require('request');
const myModulePublish = require('../IOTA_services/publishMAM');
const execute = myModulePublish.execute
const utils = require('../utils')

/* Insert data in  DHT and MAM */

router.post('/insert', async function (req, res) {

  const point = utils.generate_coord()
  const encoded_point = utils.binToStr(utils.encode(point))
  console.log("POINT:", point, "-->", "ENCODED POINT:", encoded_point)

  var root = await execute(point)
  
  //request to DHT
  make_req(encoded_point, root, function (data) {
    res.send({operation: "insert", point: point, data: data})
  })
});


const make_req = async function (keyword, root, callback) {
  console.log("REQUEST INSERT DHT DONE.")
  const options = {
    url: 'http://127.0.0.1:50001/insert',
    method: 'GET',
    qs: { 'keyword': keyword, "obj": root },
    json: true
  };

  request(options, function optionalCallback(err, httpResponse, body) {

    if (err) {
      return console.error('Upload failed:', err);
    }
    console.log('Server responded with:', body);
    callback(body)
  })
}


module.exports = router;
