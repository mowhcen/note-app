import { generateLastEdited, initializeEditPage } from "./views";
import { removeNote, updateNote } from "./notes";

const titleEl = document.querySelector("#note-title");
const dateEl = document.querySelector("#time-past");
const bodyEl = document.querySelector("#note-body");
const removeEl = document.querySelector("#remove-note");
const noteId = location.hash.substring(1);

initializeEditPage(noteId);

titleEl.addEventListener("input", (e) => {
    const note = updateNote(noteId, {
        title: e.target.value,
    });
    dateEl.textContent = generateLastEdited(note.updateAt);
});

bodyEl.addEventListener("input", (e) => {
    const note = updateNote(noteId, {
        body: e.target.value,
    });
    dateEl.textContent = generateLastEdited(note.updateAt);
});

removeEl.addEventListener("click", () => {
    removeNote(noteId);
    location.assign("/index.html");
});

window.addEventListener("storage", (e) => {
    if (e.key === "notes") {
        initializeEditPage(noteId);
    }
});
