
let postElements = [document.getElementById("newpostheader"), document.getElementById("input"), document.getElementById("subinput"), document.getElementById("postButton")]
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
	element.style.display = "block"
	element.style.margin = '5%'
}
for (let element of aboutMeElements) {
	element.style.display = "none"
}
for (let element of randomElements) {
	element.style.display = "none"
}
document.getElementById("header").style.margin = "0 auto"

let home = document.getElementById("home")
home.addEventListener("click", function() {
	console.log("asdfadsf")
	for (let element of postElements) {
		element.style.display = "block"
		element.style.margin = '5%'
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
		element.style.display = "block"
		element.style.margin = '5%'
	}
	for (let element of randomElements) {
		element.style.display = "none"
	}
})

let random = document.getElementById("random")
random.addEventListener("click", function() {
	console.log("asdfadsf")

	for (let element of postElements) {
		element.style.display = "none"
	}
	for (let element of aboutMeElements) {
		element.style.display = "none"
	}
	for (let element of randomElements) {
		element.style.display = "block"
		element.style.margin = '5%'
	}
})

idArray = ["0"]
function createSection() {
	var div = document.getElementById('post');
	let input = document.getElementById('input');
	let subtitle = document.getElementById('subinput');
	div.innerHTML += '<div class = "blogPost" style = "	margin: 5%;display: block"><h3>' + input.value + '</h3><p>' + subtitle.value + '</p><br><div onclick = "deleteSection(this)" class = "deleteButton" id = "' + idArray.length + '"><p class = "buttonText">DELETE</p></div></div>';
	postElements.push(div)
}
function deleteSection(sender) {
	console.log(idArray)
	idArray.splice(idArray.indexOf(sender.getAttribute('id')), 1)
	console.log(sender.parentNode)
	sender.parentNode.parentNode.removeChild(sender.parentNode)
    console.log(sender.getAttribute('id'));
}

