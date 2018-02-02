const request = require('request');
const yargs= require('yargs');
const geocode = require('./geocode.js')
const weather = require('./weather.js')

const argv = yargs
  .options({
    address: {
      demandOption: true,
      alias: 'a',
      describe: " address to fetch",
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

geocode.geocodeAddress(argv.a, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    weather.getWeather(results.lat, results.long, (errorMessage, weatherResults) => {
      console.log(weatherResults)
    })
  }
});