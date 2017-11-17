function myMap() {
	var mapProp= {
	    center:new google.maps.LatLng(37.4367,-122.1567),
	    zoom:17,
	};
	var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
}