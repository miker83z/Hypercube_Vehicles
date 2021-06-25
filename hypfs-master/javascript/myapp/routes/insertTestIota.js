var express = require('express');
var router = express.Router();
const request = require('request');
const myModulePublish = require('../IOTA_services/publish.js')
const utils = require('../utils')

/* Insert data in  DHT and MAM */

router.post('/insertIota', async function (req, res) {


  point = utils.OPC_conversion_manual(req.body)
  const encoded_point = utils.binToStr(utils.encode(point))
  console.log("POINT:", point, "-->", "ENCODED POINT:", encoded_point)

  var message_id = await myModulePublish.publish_msg(point)

  //request to DHT
  make_req(encoded_point, message_id, function (data) {

    res.send({ operation: "insert", point: point, data: data, message_id: message_id })
  })

});


const make_req = async function (keyword, message_id, callback) {
  console.log("INSERT IOTA DONE.")

  const options = {
    url: 'http://127.0.0.1:50001/insert',
    method: 'GET',
    qs: { 'keyword': keyword, "obj": message_id },
    json: true
  };

  request(options, function optionalCallback(err, httpResponse, body) {
    console.log("REQUEST INSERT DHT DONE.")

    if (err) {
      return console.error('Upload failed:', err);
    }
    console.log('Server responded with:', body);
    callback(body)

  })
}

module.exports = router;
