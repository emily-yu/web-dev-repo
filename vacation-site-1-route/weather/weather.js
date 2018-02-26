const getWeather = (lat, lng, callback) => {
	const temp_response = JSON.parse(httpGet(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/dd48ee2a8ecedcd97255ef1d17e92189/${lat},${lng}`))
	callback(temp_response.currently.temperature)
}