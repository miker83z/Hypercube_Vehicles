var express = require('express');
var router = express.Router();
const request = require('request');
const myModulePublish = require('../IOTA_services/publishMAM');
const execute = myModulePublish.execute
const utils = require('../utils')

/* POST data into  DHT and MAM */

router.post('/insert', async function (req, res) {

  const point = utils.generate_coord()
  const encoded_point = utils.binToStr(utils.encode(point))
  console.log("encoded_point:", encoded_point)
  console.log("point:", point)


  var root = await execute(point)

  //request to DHT

  make_req(encoded_point, root, function (data) {
    res.send(data)
  })
});


const make_req = async function (keyword, root, callback) {
  console.log("Inserimento su DHT")
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
