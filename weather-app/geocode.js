const request = require('request');

const geocodeAddress = (address, callback) => {
	// const address = argv.a
	const encodedAddress = console.log(encodeURIComponent(address));
	const key = "AIzaSyArCdiy-lBLLKDXFOJCPJhKdVLdXTAnlJg";

	request({
	  url:` https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${key}`,
	  json: true
	}, (error, response, body) => {
		if (body.status == "ZERO_RESULTS") {
			callback("ASdfasdf", undefined)
		}
		else if (body.status === "OK") {
			callback(undefined, {
			  address: body.results[0].formatted_address,
			  lat: body.results[0].geometry.location.lat,
			  long: body.results[0].geometry.location.lng
			})
		}
	});
}

module.exports = {
	geocodeAddress
}