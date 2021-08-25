"use strict";

const titleEl = document.querySelector("#note-title");
const dateEl = document.querySelector("#time-past");
const bodyEl = document.querySelector("#note-body");
const removeEl = document.querySelector("#remove-note");
const noteId = location.hash.substring(1);
let notes = getSavedNotes();
let note = notes.find((note) => note.id === noteId);

if (!note) {
    location.assign("/index.html");
}

titleEl.value = note.title;
bodyEl.value = note.body;
dateEl.textContent = generateLastEdited(note.updateAt);

titleEl.addEventListener("input", (e) => {
    note.title = e.target.value;
    updateTime(note);
    dateEl.textContent = generateLastEdited(note.updateAt);
    saveNotes(notes);
});

bodyEl.addEventListener("input", (e) => {
    note.body = e.target.value;
    updateTime(note);
    dateEl.textContent = generateLastEdited(note.updateAt);
    saveNotes(notes);
});

removeEl.addEventListener("click", () => {
    removeNote(noteId);
    saveNotes(notes);
    location.assign("/index.html");
});

window.addEventListener("storage", (e) => {
    if (e.key === "notes") {
        notes = JSON.parse(e.newValue);

        note = notes.find((note) => note.id === noteId);

        if (!note) {
            location.assign("/index.html");
        }

        titleEl.value = note.title;
        bodyEl.value = note.body;
        dateEl.textContent = generateLastEdited(note.updateAt);
    }
});
