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
			console.log(titles[i])
			storyTitles.push(titles[i]);
		}
	}

	// change images + subtitles + titles
	console.log(storyTitles)
	for (var i = 0; i < storyTitles.length; i++) {
		var pageTitle = storyTitles[i].getElementsByClassName("title");
		pageTitle[0].textContent = "same" + i;
		pageTitle[0].addEventListener("mouseover", function() {
			document.getElementById("globalheader").innerHTML = "eventlistenr2"
		});

		var subTitle = storyTitles[i].getElementsByClassName("teaser");
		subTitle[0].textContent = "haha a nice caption" + i;
		subTitle[0].addEventListener("mouseover", function() {
			document.getElementById("globalheader").innerHTML = "eventlistenr1"
		});

		var image = storyTitles[i].getElementsByClassName("img");
		console.log(image)

		if (typeof image[0].src !== "undefined") {
			image[0].src = "https://i.ytimg.com/vi/SfLV8hD7zX4/maxresdefault.jpg"
		}
	}
}