'use strict';
const express = require('express');
const path = require('path');
var config = require('./config');

const app = express();

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


var index = require('./routes/index.js')
var insert = require('./routes/insert.js')
var insertIota = require('./routes/insertTestIota.js')
var insertTestMam = require('./routes/insertTestMam.js')

var superset_search = require('./routes/superset_search.js')
var superset_search_test_mam = require('./routes/superset_search_test_mam.js')
var superset_search_test_iota = require('./routes/superset_search_test_iota.js')

var pin_search = require('./routes/pin_search.js')
var remove = require('./routes/remove.js')

app.use(index);
app.use(insert);
app.use(insertTestMam);
app.use(insertIota);

app.use(pin_search);
app.use(remove);

app.use(superset_search);
app.use(superset_search_test_iota);
app.use(superset_search_test_mam);


app.listen(config.web.port, () => {
  console.log(`app listening at http://localhost:${config.web.port}`)
})





