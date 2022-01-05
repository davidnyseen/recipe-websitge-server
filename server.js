var http = require('https');
const express = require('express');
// var cors = require('cors');
const app = express();
var cors = require('cors');
const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}

app.use(cors(corsOptions))
// fetch-polyfill.js
const fetch = require('node-fetch')

app.post('/', (req, res) => { 
  console.log(req.body);
  fetch("https://api.edamam.com/search?app_id=c08ba36f&app_key=2e5c98200b0dd0211ff9f285f249efb6&q=pizza")
  .then(response => response.json())
  .then(data => {
    res.send(data)})
});

app.listen(5000); //  i am a server
