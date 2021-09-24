var express = require('express');
var router = express.Router();
const request = require('request');
const myModuleFetch = require('../MAM_services/fetch.js');
const utils = require('../utils.js')
const config = require('../config.js')

const filepathMAM = "C:/Users/Amministratore/Desktop/IOTA_DHT/hypfs-master/javascript/myapp/test_files/insert_fetch_MAM/retrieve_mainnet.csv"


const NODES = 2 ** config.dht.HIPERCUBE_SIZE
var fetchMAMStartTime = 0
var fetchMAMEndTime = 0


router.post('/superset_search_mam', async function (req, res) {

    point = utils.OPC_conversion_manual(req.body.point)
    threshold = req.body.threshold
    const encoded_point = utils.binToStr(utils.encode(point))
    console.log("POINT:", point, "-->", "ENCODED POINT:", encoded_point)

    console.log("requ")

    make_req(encoded_point, threshold, async function (data) {

        if (data != undefined) {

            roots = utils.split_str(data)
            console.log(roots)
            resultFetch = []
            //get data from MAM
            console.log('Fetch data from the tangle. Please be patient...')

            fetchMAMStartTime = new Date().getTime();
            for (const root of roots) {

                await myModuleFetch.fetchData(root).then(function (res) {
                    resultFetch.push(res)

                })
            }

            fetchMAMEndTime = new Date().getTime();
            //utils.write_csv(fetchMAMStartTime, fetchMAMEndTime, filepathMAM)

            console.log('DONE.')
            res.send(resultFetch)
        } else {
            console.log("No result found")
            res.send(false)
        }
    })
});



const make_req = async function (keyword, threshold, callback) {

    const server = Math.floor(Math.random() * (NODES)) + 50000;

    const options = {
        url: 'http://127.0.0.1:' + server + '/superset_search',
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