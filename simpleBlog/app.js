
let postElements = [document.getElementById("newpostheader"), document.getElementById("input"), document.getElementById("subinput"), document.getElementById("postbutton")]
let aboutMeElements = []
let randomElements = []
function refreshPosts() {
	for (let post of document.getElementsByClassName("blogPost")) {
		postElements.push(post)
	}
	for (let element of document.getElementsByClassName("aboutMe")) {
		aboutMeElements.push(element)
	}
	for (let element of document.getElementsByClassName("random")) {
		randomElements.push(element)
	}
}
refreshPosts()

let allElements = []
for (let post of document.getElementsByClassName("blogPost")) {
	allElements.push(post)
}
for (let element of document.getElementsByClassName("aboutMe")) {
	allElements.push(element)
}
for (let element of document.getElementsByClassName("random")) {
	allElements.push(element)
}
for (let element of allElements) {
	element.style.display = "none"
}

console.log("asdfadsf")
for (let element of postElements) {
	element.style.display = "inline"
}
for (let element of aboutMeElements) {
	element.style.display = "none"
}
for (let element of randomElements) {
	element.style.display = "none"
}
	
let home = document.getElementById("home")
home.addEventListener("click", function() {
	console.log("asdfadsf")
	for (let element of postElements) {
		element.style.display = "inline"
	}
	for (let element of aboutMeElements) {
		element.style.display = "none"
	}
	for (let element of randomElements) {
		element.style.display = "none"
	}
})

let aboutme = document.getElementById("aboutme")
aboutme.addEventListener("click", function() {
	console.log("asdfadsf")
	for (let element of postElements) {
		element.style.display = "none"
	}
	for (let element of aboutMeElements) {
		element.style.display = "inline"
	}
	for (let element of randomElements) {
		element.style.display = "none"
	}
})

let random = document.getElementById("random")
random.addEventListener("click", function() {
	console.log("asdfadsf")

	for (let element of postElements) {
		element.style.visibility = "none"
	}
	for (let element of aboutMeElements) {
		element.style.display = "none"
	}
	for (let element of randomElements) {
		element.style.display = "inline"
	}
})

idArray = ["0"]
function createSection() {
	var div = document.getElementById('post');
	let input = document.getElementById('input');
	let subtitle = document.getElementById('subinput');
	div.innerHTML += '<div class = "blogPost"><h3>' + input.value + '</h3><p>' + subtitle.value + '</p><br><button class = "button" onclick = "deleteSection(this)" id = "' + idArray.length + '">Delete</button></div>';
	postElements.push(div)
}
function deleteSection(sender) {
	console.log(idArray)
	idArray.splice(idArray.indexOf(sender.getAttribute('id')), 1)
	console.log(sender.parentNode)
	sender.parentNode.parentNode.removeChild(sender.parentNode)
    console.log(sender.getAttribute('id'));
}

