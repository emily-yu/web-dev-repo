function moveBar() {
    var elem = document.getElementById("menu"); 
    var pos = -250;
    var id = setInterval(frame, 1);
    function frame() {
        if (pos == 0) {
            clearInterval(id);
        }
        else {
            pos+=5; 
            elem.style.marginLeft = pos + 'px'; 
        }
    }
}

function hideBar() {
    document.getElementById("menu").style.marginLeft = '-250px'
}