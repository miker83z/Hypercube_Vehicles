'use strict';
const express = require('express');
const path = require('path');
const Mam = require('@iota/mam')
require('@iota/converter')
var bodyParser = require('body-parser');

//var mam_setup = require('./public/javascripts/mam-setup.js')
const myModuleFetch = require('./IOTA_services/fetch-data.js');
const fetchData = myModuleFetch.fetchData
const findLocations = myModuleFetch.findLocations


const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
var index = require('./routes/index.js');
var publish = require('./routes/publish.js');

app.use(index);
app.use(publish)


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





