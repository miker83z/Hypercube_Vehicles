'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const iotaAreaCodes = require('@iota/area-codes');
const Mam = require('@iota/mam')
require('@iota/converter')
const fs = require('fs')
var mam_setup = require('./public/javascripts/mam-setup.js')
const myModule = require('../myapp/public/javascripts/fetch-data.js');
const fetchData = myModule.fetchData
const findLocations = myModule.findLocations
const request = require('request');
const rp = require('request-promise');
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json()) 



app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + 'index.html'));
});


app.post('/insert', function (req, res) {
  console.log(req.body)

  const options = {
    url: 'http://127.0.0.1:50001/insert',
    method: 'GET',
    qs: req.body,
    json: true
}; 


  request(options, function optionalCallback(err, httpResponse, body) {
    if (err) {
      return console.error('upload failed:', err);
      
    }
    console.log('Upload successful!  Server responded with:', body);
    res.send(body)
  })
});


/*
app.post('/getPoint', async function (req, res) {
  console.log("post req")

  root = 'CSAFDWZJRQQOYNIBEXRTEOHMCTC9HRDIQFUGAGKIVHGJXQO9XAVZPZG99ROBQHQCOEZITHVPUWHLRMIJZ'

  var result = []
  //result.push(await fetchData(root))  //get data from MAM channel
  result.push(await findLocations() )
  //console.log('respo', result)
  res.send(result)

});
*/


app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})





