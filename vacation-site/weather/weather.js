const getWeather = (lat, long, callback) => {
    request({
      url: `https://api.darksky.net/forecast/dd48ee2a8ecedcd97255ef1d17e92189/${lat},${long}`,
      json: true
    }, (error, response, body) => {
      const temperature = body.currently.temperature
      return temperature;
    })
}