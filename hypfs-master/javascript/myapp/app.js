'use strict';
const express = require('express');
const path = require('path');
var bodyParser = require('body-parser');


const app = express();

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


var index = require('./routes/index.js')
var publish = require('./routes/publish.js')
var retrieve = require('./routes/retrieve.js')

app.use(index);
app.use(publish);
app.use(retrieve)


app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})





