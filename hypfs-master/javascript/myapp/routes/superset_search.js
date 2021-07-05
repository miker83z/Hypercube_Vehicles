var express = require('express');
var router = express.Router();
const request = require('request');
const myModuleRequire = require('../IOTA_services/retrieve.js');
const utils = require('../utils.js')
const config = require('../config.js')

const NODES = 2 ** config.dht.HIPERCUBE_SIZE


router.post('/superset_search', async function (req, res) {
    const point = req.body.keyword
  
    const threshold = req.body.threshold
    const encoded_point = utils.binToStr(utils.encode(point))
    console.log("POINT:", point, "-->", "ENCODED POINT:", encoded_point)

    make_req(encoded_point, threshold, async function (data) {

        if (data != undefined) {

            message_id_list = utils.split_str(data)
            console.log("messsage_id  DHT", message_id_list, "point:", req.body.point)

            var resultFetch = []
            console.log('Fetch data from the tangle. Please be patient...')

          
            for (const message_id of message_id_list) {

                await myModuleRequire.retrieve_message(message_id).then(function (res) {
                    resultFetch.push(res)

                })
            }
            console.log('FETCH IOTA DONE.')
            res.send({ 'data': resultFetch, "point": point })

        } else {
            console.log("No result found")
            res.send(false)
        }
    })
});



const make_req = async function (keyword, threshold, callback) {
    const server = Math.floor(Math.random() * (NODES)) + 50000;     
    const options = {
        url: 'http://127.0.0.1:'+ server+ '/superset_search',
        method: 'GET',
        qs: { 'keyword': keyword, "threshold": threshold, 'sender': 'user' },
        json: true
    };

    request(options, function optionalCallback(err, httpResponse, body) {
        console.log("REQUEST SUPERSET SEARCH DHT DONE.")
        if (err) {
            console.error('Upload failed:', err);
        } else {

            if (body == "") {
                callback("")
            } else {
                callback(body)
            }
        }

    })
}

module.exports = router;