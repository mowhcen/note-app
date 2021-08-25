import moment from "moment";
import uuidv4 from "uuid/v4";

let notes = [];

// Read existing notes from localStorage
const loadNotes = () => {
    const notesJSON = localStorage.getItem("notes");

    try {
        return notesJSON ? JSON.parse(notesJSON) : [];
    } catch (e) {
        return [];
    }
};

// Save a note from the list
const saveNotes = () => {
    localStorage.setItem("notes", JSON.stringify(notes));
};

// Expose notes from module
const getNotes = () => notes;

const createNote = () => {
    const id = uuidv4();
    const currentTimestamp = moment().valueOf();
    notes.push({
        id: id,
        title: "",
        body: "",
        createdAt: currentTimestamp,
        updateAt: currentTimestamp,
    });
    saveNotes();
};

//remove a note from the list
const removeNote = (id) => {
    const noteIndex = notes.findIndex((note) => note.id === id);

    if (noteIndex > -1) {
        notes.splice(noteIndex, 1);
        saveNotes();
    }
};

// Sort your notes by one of three ways
const sortNotes = (sortBy) => {
    if (sortBy === "byEdited") {
        return notes.sort((a, b) => {
            if (a.updateAt > b.updateAt) {
                return -1;
            } else if (a.updateAt < b.updateAt) {
                return 1;
            } else {
                return 0;
            }
        });
    } else if (sortBy === "byCreated") {
        return notes.sort((a, b) => {
            if (a.createdAt > b.createdAt) {
                return -1;
            } else if (a.createdAt < b.createdAt) {
                return 1;
            } else {
                return 0;
            }
        });
    } else if (sortBy === "alphabetical") {
        return notes.sort((a, b) => {
            if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1;
            } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1;
            } else {
                return 0;
            }
        });
    } else {
        return notes;
    }
};

const updateNote = (id, updates) => {
    const note = notes.find((note) => note.id === id);

    if (!note) {
        return;
    }

    if (typeof updates.title === "string") {
        note.title = updates.title;
        note.updateAt = moment().valueOf();
    }

    if (typeof updates.body === "string") {
        note.body = updates.body;
        note.updateAt = moment().valueOf();
    }

    saveNotes();
};

notes = loadNotes();

export { getNotes, createNote, removeNote, sortNotes, updateNote };
