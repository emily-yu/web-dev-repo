const state = {
  FIRST: {'margin-left': '-33%'},
  SECOND: {'margin-left' : '0%'},
  THIRD: {'margin-left': '33%'},
}
const scroll = [state.FIRST, state.SECOND, state.THIRD]
let currentState = -1
let container = document.getElementsByClassName('container')[0];
var next = document.getElementsByClassName('nextButton')[0];
next.addEventListener('click', function() {
  console.log("next")
  console.log(currentState)
  if (currentState != 2) {
    currentState++;
    $(".container").css(scroll[currentState]);
  }
  else {
    currentState = -1
    currentState++;
    $(".container").css(scroll[currentState]);
  }
});

var back = document.getElementsByClassName('backButton')[0];
back.addEventListener('click', function() {
  console.log("bac")
  console.log(currentState)
  if (currentState != -1) {
    currentState--;
    $(".container").css(scroll[currentState]);
  }
  else {
    currentState = 2
    $(".container").css(scroll[currentState]);
  }
});