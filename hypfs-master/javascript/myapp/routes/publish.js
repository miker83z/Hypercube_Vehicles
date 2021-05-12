var express = require('express');
var router = express.Router();
const request = require('request');
const myModulePublish = require('../IOTA_services/publishMAM');
const execute = myModulePublish.execute
const iotaAreaCodes = require('@iota/area-codes');


/* POST data into  DHT and MAM */

router.post('/insert', async function (req, res) {

  var iac = iotaAreaCodes.encode(50.895379, 60.363030);
  var root = await execute(iac)
  console.log("root", root)
  //request to DHT
  await make_req(root)
  res.send("okay")
});

const make_req = async function (root) {

  console.log("root on req", root)
  const options = {
    url: 'http://127.0.0.1:50001/insert',
    method: 'GET',
    qs: { 'keyword': 3, "obj": root },
    json: true
  };

  request(options, function optionalCallback(err, httpResponse, body) {
    console.log("request gone")
    if (err) {
      return console.error('upload failed:', err);

    }
    console.log('Upload successful!  Server responded with:', body);

    return body

  })
}


module.exports = router;
