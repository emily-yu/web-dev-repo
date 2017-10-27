if (window.location.href  === "http://www.npr.org/") {

	// filter out story titles
	let titles = document.getElementsByTagName("article");
	var storyTitles = [];
	for (var i = 0; i < titles.length; i++) {
		if (!(titles[i].classList.contains("hp-item")) || 
			titles[i].classList.contains("attachment")
			) {
			console.log("filter")
		}
		else {
			storyTitles.push(titles[i])
		}
	}

	console.log(storyTitles)
	for (var i = 0; i < storyTitles.length; i++) {
		var titlex = storyTitles[i].getElementsByClassName("title")
		console.log(titlex)

		// change titles
		titlex[0].textContent = "same" + i
	}
}