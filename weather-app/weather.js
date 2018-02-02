const request = require('request');

const getWeather = (lat, long, callback) => {
    request({
      url: `https://api.darksky.net/forecast/dd48ee2a8ecedcd97255ef1d17e92189/${lat},${long}`,
      json: true
    }, (error, response, body) => {
      const temperature = body.currently.temperature
      const apparentTemperature = body.currently.apparentTemperature
      const summary_hourly = body.hourly.summary
      const daily_summary = body.daily.summary
      if (temperature !== apparentTemperature) {
        console.log("temperature is " + temperature + ", apparent temperature is " + apparentTemperature)
      }
      else if (temperature === apparentTemperature) {
        console.log("temperature is same as apparentTemperature")
      }
      else {
        console.log("unable to fetch")
      }
      console.log("hourly summary: " + summary_hourly)
      console.log("daily summary forecast: " + daily_summary)
    })
}

module.exports = {
  getWeather
}