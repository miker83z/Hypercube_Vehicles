var express = require('express');
var router = express.Router();
const request = require('request');
const myModuleFetch = require('../IOTA_services/fetch-data');
const utils = require('../utils')


router.post('/superset_search', async function (req, res) {
    keyword = JSON.parse(req.body.keyword)
    threshold = JSON.parse(req.body.threshold)

    make_req(keyword, threshold, async function (data) {

        if (data != undefined) {

            roots = utils.split_str(data)
            console.log(roots)
            resultFetch = []
            for (const root of roots) {

                await myModuleFetch.fetchData(root).then(function (res) {
                    resultFetch.push(res)

                })
            }

            res.send(resultFetch)
        } else {
            console.log("no result found")
            res.send("No result found")
        }
    })
});



const make_req = async function (keyword, threshold, callback) {

    const options = {
        url: 'http://127.0.0.1:50001/superset_search',
        method: 'GET',
        qs: { 'keyword': keyword, "threshold": threshold, 'sender': 'user' },
        json: true
    };

    request(options, function optionalCallback(err, httpResponse, body) {
        console.log("request gone")
        if (err) {
            console.error('upload failed:', err);
        } else {

            if (body == "") {
                callback("")
            } else {
                callback(body)
            }
        }
        console.log(body)

    })
}

module.exports = router;