const express = require('express')
const hbs = require('hbs')
const path = require('path')
const request = require('request');

var app = express();

app.set('view engine', 'hbs');
app.use(express.static(__dirname));
hbs.registerPartials(path.join(__dirname, "views"));

app.listen(3000, () => {
  console.log("Server is up on port 3000");
})