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

	callback(undefined, {
		lat: lat,
		long: lng
	})
}