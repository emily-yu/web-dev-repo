function random() {
	console.log("bllahsklhbhahbahb check this cool thing out")
	document.body.style.backgroundColor = getRandomColor()
}

// source: https://stackoverflow.com/questions/1484506/random-color-generator
function getRandomColor() {
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

let click = true;
function addClass(classs, id) {
	if (id === 'updown' && !(click)) {
		console.log("asdf")
		click = !(click)
		document.getElementById(id).classList = ' downup'
	}
	else if (id === 'updown') {
		console.log("ASdfasdfas")
		document.getElementById(id).classList = classs
		click = !(click)
	}
	else if (id === 'diag-change-color') {
		document.getElementById(id).classList = classs
		setTimeout(function(){
        	document.getElementById(id).classList.remove('diag-change-color')
    	}, 5000);
	}
	else {
		document.getElementById(id).classList = classs
	}
}