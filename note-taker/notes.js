const fs = require('fs');

const fetchNotes = () => {
  try {
    const notesString = fs.readFileSync("notes-data.json");
    return JSON.parse(notesString);
  } catch (e) {
    return [];
  }

}

const saveNotes = (notes) => {
  fs.writeFileSync("notes-data.json", JSON.stringify(notes));
}

const addNote = (title, body) => {
  const note = {
    title,
    body
  }

  const notes = fetchNotes();
  if (notes.every(n => n.title != note.title)) {
    notes.push(note);
    saveNotes(notes);
    return note;
  } else {
    return false;
  }

}

module.exports = {
  addNote,
  fetchNotes
}

const note1 = {
  title: "note1",
  body: "This is note1"
}

const note2 = {
  title: "note2",
  body: "This is note2"
}

const notes = [note1, note2];
