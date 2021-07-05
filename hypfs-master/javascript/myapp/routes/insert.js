var express = require('express');
var router = express.Router();
const request = require('request');
const myModulePublish = require('../IOTA_services/publish.js')
const publish = myModulePublish.publish_msg
const utils = require('../utils')

/* Insert data in  DHT and MAM */

router.post('/insert', async function (req, res) {

  console.log("Insert random point");
  const point = utils.generate_coord()
  const encoded_point = utils.binToStr(utils.encode(point))
  console.log("POINT:", point, "-->", "ENCODED POINT:", encoded_point)

  var message_id = await publish(point)
  console.log("POINT:", point, "MESSAGE_ID:", message_id)

  
    //request to DHT
    make_req(encoded_point, message_id, function (data) {
      res.send({ operation: "insert", point: point, data: data })
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


    if (err) {
      return console.error('Upload failed:', err);
    }
    console.log("REQUEST INSERT DHT DONE.")
    callback(body)

  })
}









module.exports = router;
