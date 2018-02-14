const express = require('express')
const hbs = require('hbs')
const path = require('path')
const request = require('request');
const yargs= require('yargs');
const geocode = require('./geocode/geocode.js')
const weather = require('./weather/weather.js')
const axios = require('axios')

var app = express();

app.set('view engine', 'hbs');
app.use(express.static(__dirname));
hbs.registerPartials(path.join(__dirname, "views"));
hbs.registerHelper('yell', (val) => {
	console.log(val)
})
hbs.registerHelper('getTemp', (val) => {
  console.log("VAL" + val)
  geocode.geocodeAddress(val, (errorMessage, results) => {
    if (errorMessage) {
      console.log(errorMessage);
    } else {
      weather.getWeather(results.lat, results.long, (errorMessage, weatherResults) => {
        console.log(weatherResults)
        return weatherResults;
      })
    }
  });
})

const getTemp = function(val, callback) {
    geocode.geocodeAddress(val, (errorMessage, results) => {
    if (errorMessage) {
      console.log(errorMessage);
    } else {
      weather.getWeather(results.lat, results.long, (errorMessage, weatherResults) => {
        callback(weatherResults)
      })
    }
  });
}

app.get('/venice', function(req, res) {
  res.render('template.hbs', {
    title: "Venice",
    src_1: 'https://fthmb.tqn.com/yaSJS3o6DipIAeihV5AMX9S8x-M=/960x0/filters:no_upscale()/italy--venice--elevated-view-of-canal-in-city-543346423-5982583b396e5a0011c9ef3e.jpg',
    src_2: 'http://www.telegraph.co.uk/content/dam/Travel/Destinations/Europe/Italy/Venice/Venice-xlarge.jpg',
    src_3: 'https://image.jimcdn.com/app/cms/image/transf/none/path/sa6549607c78f5c11/image/icf1c9c4489e32730/version/1472315840/venice.jpg'
  })
});

app.get('/tokyo', function(req, res) {
  res.render('template.hbs', {
    title: "Tokyo",
    src_1: 'https://i1.wp.com/www.mytravelation.com/wp-content/uploads/2015/01/tokyo-main-image.jpg',
    src_2: 'http://blog.buckitdream.com/wp-content/uploads/2017/11/tokyo-mud-bath-bar-mudbath0716.jpg',
    src_3: 'https://media-cdn.tripadvisor.com/media/photo-s/07/15/f1/8b/shibuya-crossing.jpg'
  })
})

app.get('/hawaii', (req,res) => {
  res.render('template.hbs', {
    title: "Hawaii",
    src_1: 'http://cdn-image.travelandleisure.com/sites/default/files/videos/getty-hawaii_0.jpg',
    src_2: 'https://kids.nationalgeographic.com/content/dam/kids/photos/States/A-I/hawaii-beach.adapt.945.1.png',
    src_3: 'https://cdn.pixabay.com/photo/2017/08/31/10/39/hawaii-2700190_960_720.jpg'
  })
})

app.listen(3000, () => {
  console.log("Server is up on port 3000");
})