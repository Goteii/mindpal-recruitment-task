import { createAddNewNoteView, createNoNotesView } from "./creators";

export const addNewNoteCancelListener = () => {
  const cancel = document.getElementById("add-note-cancel");
  cancel?.addEventListener("click", () => {
    const noNotesView = createNoNotesView();
    const container = document.getElementById("container");
    container?.replaceChildren(noNotesView);

    addNewNoteListener();
  });
};

const addNewNoteListener = () => {
  const addNote = document.getElementById("add-note")!;
  addNote.addEventListener("click", () => {
    const addNoteSection = createAddNewNoteView();
    const container = document.getElementById("container")!;
    container.replaceChildren(addNoteSection);

    addNewNoteCancelListener();
  });
};
