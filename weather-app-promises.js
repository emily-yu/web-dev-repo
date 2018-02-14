const request = require('request');
const yargs= require('yargs');
const axios = require('axios')

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

const encodedAddress = encodeURIComponent(argv.a);
const key = "AIzaSyArCdiy-lBLLKDXFOJCPJhKdVLdXTAnlJg";
axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${key}`)
  .then(function (response) {
    const body = response.data
    if (response.statusText == "ZERO_RESULTS") {
      console.log("no address results")
    }
    else if (response.statusText === "OK") {
      axios.get(`https://api.darksky.net/forecast/dd48ee2a8ecedcd97255ef1d17e92189/${body.results[0].geometry.location.lat},${body.results[0].geometry.location.lng}`)
      .then(function (response) {
        const body = response.data
        const temperature = body.currently.temperature
        const apparentTemperature = body.currently.apparentTemperature
        const summary_hourly = body.hourly.summary
        const daily_summary = body.daily.summary
        console.log("\u{1F4A9} \u{1F4A9} \u{1F4A9} \u{1F4A9} \u{1F4A9} \u{1F4A9} \u{1F4A9} \u{1F4A9} \u{1F4A9} \u{1F4A9} \u{1F4A9} \u{1F4A9} \u{1F4A9} \u{1F4A9} \u{1F4A9} \u{1F4A9} \u{1F4A9} \u{1F4A9} \u{1F4A9} \u{1F4A9} \u{1F4A9} \u{1F4A9} \u{1F4A9} \u{1F4A9} \u{1F4A9} \u{1F4A9} \u{1F4A9}")
        if (temperature !== apparentTemperature) {
          console.log("\u{1F4A9} temperature is " + temperature + ", apparent temperature is " + apparentTemperature)
        }
        else if (temperature === apparentTemperature) {
          console.log("\u{1F4A9} temperature is same as apparentTemperature")
        }
        else {
          console.log("\u{1F4A9} unable to fetch")
        }
        console.log("\u{1F4A9} hourly summary: " + summary_hourly)
        console.log("\u{1F4A9} daily summary forecast: " + daily_summary)
        console.log("\u{1F4A9} \u{1F4A9} \u{1F4A9} \u{1F4A9} \u{1F4A9} \u{1F4A9} \u{1F4A9} \u{1F4A9} \u{1F4A9} \u{1F4A9} \u{1F4A9} \u{1F4A9} \u{1F4A9} \u{1F4A9} \u{1F4A9} \u{1F4A9} \u{1F4A9} \u{1F4A9} \u{1F4A9} \u{1F4A9} \u{1F4A9} \u{1F4A9} \u{1F4A9} \u{1F4A9} \u{1F4A9} \u{1F4A9} \u{1F4A9}")
      })
      .catch(function(error) {
        console.log(error)
      })
    }
  })
  .catch(function (error) {
    console.log(error);
});