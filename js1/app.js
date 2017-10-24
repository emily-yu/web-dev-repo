var asdf = document.getElementById("list");
function editList() {
	var ul = document.getElementsByTagName("ul");
	for (var i = 0; i < ul.length; i++){
		if (ul[i].style.color === "green") {
	     	ul[i].style.color = "red";
	     	asdf.value = "turn green";
		}
		else {
			ul[i].style.color = "green";
			asdf.value = "turn red";
		}
	}
}

var borderthing = document.getElementById("border");
function border() {
	var ul = document.getElementsByTagName("p");
	// console.log(ul)
	for (var i = 0; i < ul.length; i++){
		console.log(ul[i])
		if (ul[i].style.borderColor == "black") {
	     	ul[i].style.removeProperty("border");
	     	borderthing.value = "no border";
		}
		else {
			ul[i].style.border = "solid 1px black";
			borderthing.value = "border";
		}
	}
}