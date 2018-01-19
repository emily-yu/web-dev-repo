const argv = require("yargs").argv;
const notes = require("./notes.js");
const fs = require('fs');


const command = argv._[0];
if (command ==="add") {
  const title = argv.title;
  const body = argv.body;
  const noteAdded = notes.addNote(title, body);

  if (title === '' || body === '') {
    console.log("Incorrect note format. Please provide both a title and a body for your note.")
  }
  else {
    if (noteAdded) {
      console.log("Your note was added");
    }
    else {
      console.log("This note already exists");
    }
  }
}
else if (command ==="list") {
  const noteAdded = notes.fetchNotes();
  var arr = Object.keys(noteAdded).map(function(k) { return noteAdded[k] });
  for (let elem of arr) {
    console.log(elem['title'] + "    " + elem['body'])
    // console.log("BODY: " + elem['body'])
  }
}
else if (command ==="read") { //give title to read note by title
  const noteAdded = notes.fetchNotes();
  var arr = Object.keys(noteAdded).map(function(k) { return noteAdded[k] });
  // console.log(noteAdded)
  // console.log(arr)
  let found = false;
  let body = ''
  for (let elem of arr) {
    // console.log(elem)
    // console.log(elem['title'])
    if (elem['title'] == argv.title) {
      // console.log(elem['body'])
      body = elem['body']
      found = true
    }
  }

  // console.log("FOUND" + found)
  if (found === false) {
    console.log("A note with this title does not exist")
  }
  else {
    console.log(body)
  }

}
else if (command ==="remove") { //give title to remove note by title
  const noteAdded = notes.fetchNotes();
  var arr = Object.keys(noteAdded).map(function(k) { return noteAdded[k] });
  // console.log(noteAdded)
  // console.log(arr)
  let found = false;
  let body = 0
  for (let i = 0; i < arr.length; i++) {
    const elem = arr[i]
    // console.log(elem)
    // console.log(elem['title'])
    if (elem['title'] == argv.title) {
      // console.log(elem['body'])
      body = i
      found = true
    }
  }

  // console.log("FOUND" + found)
  if (found === false) {
    console.log("Note removed")
  }
  else {
    console.log("A note with this title does not exist")
    arr.splice( body, 1 )
    fs.writeFileSync("notes-data.json", JSON.stringify(arr));
  }
}
