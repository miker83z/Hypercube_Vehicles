var express = require('express');
var router = express.Router();
const request = require('request');
const myModulePublish = require('../IOTA_services/publish.js')
const utils = require('../utils')
const config = require('../config.js')

const file_path_DHT = "C:/Users/Amministratore/Desktop/IOTA_DHT/hypfs-master/javascript/myapp/test_files/insert_DHT/insert_dht_" + config.dht.HIPERCUBE_SIZE + ".csv"
const filepath = "C:/Users/Amministratore/Desktop/IOTA_DHT/hypfs-master/javascript/myapp/test_files/insert_IOTA/publish_" + config.iota.MODE + "_pow_" + config.iota.LOCAL_POW + "_node_iota.csv"
const file_path_mainnet = "C:/Users/Amministratore/Desktop/IOTA_DHT/hypfs-master/javascript/myapp/test_files/insert_IOTA/publish_mainnet_" + config.iota.MODE + "_pow_" + config.iota.LOCAL_POW + "_node_iota.csv"

const NODES = 2 ** config.dht.HIPERCUBE_SIZE

var insertStartTime = 0
var insertEndTime = 0
var publishIotaStartTime = 0
var publishIotaEndTime = 0


/* Insert data in  DHT and IOTA */

router.post('/insertIota', async function (req, res) {

  console.log(req.body)

  //convert location in OLC
  point = utils.OPC_conversion_manual(req.body)
  const encoded_point = utils.binToStr(utils.encode(point))
  console.log("POINT:", point, "-->", "ENCODED POINT:", encoded_point)

  publishIotaStartTime = new Date().getTime();

  //Publish point in Tangle
  var message_id = await myModulePublish.publish_msg(point)

  publishIotaEndTime = new Date().getTime();
  //utils.write_csv(publishIotaStartTime, publishIotaEndTime, file_path_mainnet)


  insertStartTime = new Date().getTime()

  //Publish id transaction in DHT
  make_req(encoded_point, message_id, function (data) {

    insertEndTime = new Date().getTime()
    //utils.write_csv(insertStartTime, insertEndTime, file_path_DHT)

    res.send({ operation: "insert", point: point, data: data, message_id: message_id })


  })

});


const make_req = async function (keyword, message_id, callback) {

  const server = Math.floor(Math.random() * (NODES)) + 50000;
  console.log("server contattato", server)

  console.log("INSERT IOTA DONE.")

  const options = {
    url: config.web.LOCAL_HOST + ':' + server + '/insert',
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
