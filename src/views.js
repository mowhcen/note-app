import { getNotes, sortNotes } from "./notes";

import { getFilters } from "./filters";
import moment from "moment";

// Generate the DOM structure for a note
const generateNoteDOM = (note) => {
    const noteEl = document.createElement("a");
    const textEl = document.createElement("p");
    const statusEl = document.createElement("p");

    // Setup the note title text
    if (note.title.length > 0) {
        textEl.textContent = note.title;
    } else {
        textEl.textContent = "Unnamed note";
    }
    textEl.classList.add("list-item__title");
    noteEl.appendChild(textEl);

    // setup the link
    noteEl.href = `/edit.html#${note.id}`;
    noteEl.classList.add("list-item");

    // setup status message
    statusEl.textContent = generateLastEdited(note.updateAt);
    statusEl.classList.add("list-item__subtitle");
    noteEl.appendChild(statusEl);

    return noteEl;
};

// generate the last edited message
const generateLastEdited = (timestamp) =>
    `Last edited ${moment(timestamp).fromNow()}`;

// Render application notes
const renderNotes = () => {
    const notesEl = document.querySelector("#notes");
    const filters = getFilters();

    const notes = sortNotes(filters.sortBy);
    const filteredNotes = notes.filter((note) =>
        note.title.toLowerCase().includes(filters.searchText.toLowerCase())
    );

    notesEl.innerHTML = "";

    if (filteredNotes.length > 0) {
        filteredNotes.forEach((note) => {
            const noteEl = generateNoteDOM(note);
            notesEl.appendChild(noteEl);
        });
    } else {
        const emptyMessage = document.createElement("p");
        emptyMessage.textContent = "No notes to show";
        emptyMessage.classList.add("empty-message");
        notesEl.appendChild(emptyMessage);
    }
};

const initializeEditPage = (noteId) => {
    const titleEl = document.querySelector("#note-title");
    const dateEl = document.querySelector("#time-past");
    const bodyEl = document.querySelector("#note-body");

    const notes = getNotes();
    const note = notes.find((note) => note.id === noteId);

    if (!note) {
        location.assign("/index.html");
    }

    titleEl.value = note.title;
    bodyEl.value = note.body;
    dateEl.textContent = generateLastEdited(note.updateAt);
};

export { generateLastEdited, generateNoteDOM, renderNotes, initializeEditPage };
