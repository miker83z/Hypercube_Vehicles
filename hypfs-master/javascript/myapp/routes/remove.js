var express = require('express');
var router = express.Router();
const request = require('request');
utils = require("../utils")

router.post('/remove', async function (req, res) {

    keyword = req.body.keyword
    root = req.body.obj

    console.log(keyword, root)

    const options = {
        url: 'http://127.0.0.1:50001/remove',
        method: 'GET',
        qs: { 'keyword': keyword, "obj": root },
        json: true
    };

    make_req(options, function (data) {
        console.log("data", data)
        res.send(data)
    })

})

async function make_req(options, callback) {

    request(options, function optionalCallback(err, httpResponse, body) {

        if (err) {
            return console.error('upload failed:', err);
        }
        console.log('Server responded with:', body);

        callback(body)
    })
}





module.exports = router;