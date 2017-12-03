$(document).ready(function() {
    console.log("ready!");

    $('#one').on('click', function() {
    	console.log("one")
    	setTimeout(function() {
    		$("#one_item").toggleClass('moveDown');
    	}, 1000)
    })

    $('#two').on('click', function() {
    	console.log("two")
    	setTimeout(function() {
    		$("#two_item").toggleClass('moveLeft');
    		console.log("asdf")
    	}, 1000)
    })

    $('#same').on('click', function() {
    	$("#navbar").toggleClass("show");
    })

});