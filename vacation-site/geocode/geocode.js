// const request = require('request');

function httpGet(theUrl) {
  console.log(theUrl)
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", theUrl, false );
  xmlHttp.send( null );
  return xmlHttp.responseText;
}

const geocodeAddress = (address, callback) => {
	const encodedAddress = encodeURIComponent(address);
	const key = "AIzaSyArCdiy-lBLLKDXFOJCPJhKdVLdXTAnlJg";

	const response = JSON.parse(httpGet(`https://maps.googleapis.com/maps/api/geocode/json?address=` + encodeURIComponent(address) + `&key=AIzaSyArCdiy-lBLLKDXFOJCPJhKdVLdXTAnlJg`))
	const lat = response.results[0].geometry.location.lat
	const lng = response.results[0].geometry.location.lng

	const temp_response = JSON.parse(httpGet(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/dd48ee2a8ecedcd97255ef1d17e92189/${lat},${lng}`))
	console.log(temp_response.currently.temperature)

	callback(undefined, temp_response.currently.temperature)
}