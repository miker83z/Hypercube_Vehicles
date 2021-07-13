var express = require('express');
var router = express.Router();
const request = require('request');
const myModulePublish = require('../MAM_services/publish');
const execute = myModulePublish.execute
const utils = require('../utils')
const config = require('../config.js')

const filepathMam = "C:/Users/Amministratore/Desktop/IOTA_DHT/hypfs-master/javascript/myapp/test_files/insert_fetch_MAM/publish_mainnet.csv"

const NODES = 2 ** config.dht.HIPERCUBE_SIZE
var publishMAMStartTime = 0
var publishMAMEndTime = 0
/* Insert data in  DHT and MAM */

router.post('/insertTestMam', async function (req, res) {

  //convert location in OLC
  point = utils.OPC_conversion_manual(req.body)
  const encoded_point = utils.binToStr(utils.encode(point))
  console.log("POINT:", point, "-->", "ENCODED POINT:", encoded_point)


  publishMAMStartTime = new Date().getTime();
  //insert point in Tangle
  var root = await execute(point)

  publishMAMEndTime = new Date().getTime();

  //utils.write_csv(publishMAMStartTime, publishMAMEndTime, filepathMam)

  //request to DHT
  make_req(encoded_point, root, function (data) {

    res.send({ operation: "insert", point: point, data: data })
  })
});


const make_req = async function (keyword, root, callback) {

  const server = Math.floor(Math.random() * (NODES)) + 50000;

  console.log("INSERT MAM DONE.")

  const options = {
    url: config.web.LOCAL_HOST + ':' + server + '/insert',
    method: 'GET',
    qs: { 'keyword': keyword, "obj": root },
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
