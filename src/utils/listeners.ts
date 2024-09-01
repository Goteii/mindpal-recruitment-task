import { NoteDetails } from "../models/note-details.model";
import {
  createAddNewNoteBtn,
  createAddNewNoteView,
  createEditNoteView,
  createNoNotesView,
  createNote,
  retrieveNote,
  saveNote,
} from "./creators";
import { getBtnId, getNoteById, getNoteDetails, getNotes } from "./getters";

export const noNotesAddNoteListener = (): void => {
  const addNote = document.getElementById("add-note")!;
  addNote.addEventListener("click", () => {
    const addNoteSection = createAddNewNoteView();
    const container = document.getElementById("container")!;
    container.replaceChildren(addNoteSection);

    addNewNoteCancelListener();
    addNewNoteAddNoteListener();
  });
};

const addNewNoteCancelListener = (): void => {
  const cancel = document.getElementById("add-note-cancel")!;
  cancel.addEventListener("click", () => {
    const notes = getNotes();
    if (notes.length) {
      const addNewNotePrimary = createAddNewNoteBtn();
      const container = document.getElementById("container")!;
      container.replaceChildren(addNewNotePrimary);
      notes.forEach((note) => container.appendChild(note));
      addNewNotePrimaryListener();
      return;
    }
    const noNotesView = createNoNotesView();
    const container = document.getElementById("container");
    container?.replaceChildren(noNotesView);
    noNotesAddNoteListener();
  });
};

const addNewNoteAddNoteListener = (): void => {
  const addNote = document.getElementById("add-new-note")!;
  addNote.addEventListener("click", () => {
    const title = (document.getElementById("note-title") as HTMLInputElement)
      .value;
    const body = (document.getElementById("note-body") as HTMLTextAreaElement)
      .value;
    const newNote = createNote(title, body);
    const container = document.getElementById("container")!;
    const addNewNotePrimary = createAddNewNoteBtn();
    const notes = getNotes();
    if (notes.length) {
      container.replaceChildren(addNewNotePrimary);
      notes.forEach((note) => container.appendChild(note));
      container.appendChild(newNote);
      //ADD LISTENERS FOR EDIT AND REMOVE
      addEditNoteListeners();
      addRemoveNoteListeners();
      // const editNoteBtns = Array.from(
      //   document.querySelectorAll("button[id*='edit-note-']")
      // );
      // console.log("editNote", editNoteBtns);
      // editNoteBtns.forEach((editBtn) =>
      //   editBtn.addEventListener("click", (e) => editNoteListener(e))
      // );

      // const removeNoteBtns = Array.from(
      //   document.querySelectorAll("button[id*='remove-note-']")
      // );
      // removeNoteBtns.forEach((editBtn) =>
      //   editBtn.addEventListener("click", (e) => removeNoteListener(e))
      // );

      addNewNotePrimaryListener();
      return;
    }
    container.replaceChildren(addNewNotePrimary, newNote);

    addEditNoteListeners();
    addRemoveNoteListeners();
    //ADD LISTENERS FOR EDIT AND REMOVE
    // const editNoteBtns = Array.from(
    //   document.querySelectorAll("button[id*='edit-note-']")
    // );
    // console.log("editNote", editNoteBtns);
    // editNoteBtns.forEach((editBtn) =>
    //   editBtn.addEventListener("click", (e) => editNoteListener(e))
    // );

    // const removeNoteBtns = Array.from(
    //   document.querySelectorAll("button[id*='remove-note-']")
    // );
    // removeNoteBtns.forEach((editBtn) =>
    //   editBtn.addEventListener("click", (e) => removeNoteListener(e))
    // );
    addNewNotePrimaryListener();
  });
};

const addNewNotePrimaryListener = (): void => {
  const addNote = document.getElementById("add-new-note-primary")!;
  addNote.addEventListener("click", () => {
    const addNoteSection = createAddNewNoteView();
    const container = document.getElementById("container")!;
    addNote.remove();
    container.prepend(addNoteSection);

    addNewNoteCancelListener();
    addNewNoteAddNoteListener();
  });
};

const addEditNoteListeners = (): void => {
  const editNoteBtns = Array.from(
    document.querySelectorAll("button[id*='edit-note-']")
  );
  console.log("editNote", editNoteBtns);
  editNoteBtns.forEach((editBtn) =>
    editBtn.addEventListener("click", (e) => editNoteListener(e))
  );
};

const addEditNoteListener = (id: string): void => {
  const editBtn = document.getElementById(
    "edit-note-" + id
  ) as HTMLButtonElement;

  editBtn.addEventListener("click", (e) => editNoteListener(e));
};

const addRemoveNoteListener = (id: string): void => {
  const removeBtn = document.getElementById(
    "remove-note-" + id
  ) as HTMLButtonElement;
  removeBtn.addEventListener("click", (e) => removeNoteListener(e));
};

const addRemoveNoteListeners = (): void => {
  const removeNoteBtns = Array.from(
    document.querySelectorAll("button[id*='remove-note-']")
  );
  removeNoteBtns.forEach((editBtn) =>
    editBtn.addEventListener("click", (e) => removeNoteListener(e))
  );
};

const editNoteListener = (e: Event): void => {
  const target = e.target as HTMLElement;
  const id = getBtnId(target);

  const note = getNoteById(id);

  const { title, body } = getNoteDetails(id);

  const editNoteView = createEditNoteView({ id, title, body });

  note.classList.add("note-edit-mode");

  note.replaceChildren(editNoteView);

  addEditNoteCancelListener({ id, title, body });
  addEditNoteEditListener(id);
};

const addEditNoteEditListener = (id: string): void => {
  const editBtn = document.getElementById("edit-note-btn-" + id)!;

  editBtn.addEventListener("click", () => {
    const note = getNoteById(id);
    note.classList.remove("note-edit-mode");

    saveNote(id);
    addEditNoteListener(id);
    addRemoveNoteListener(id);
  });
};

const addEditNoteCancelListener = (details: NoteDetails): void => {
  const { id } = details;
  const cancelBtn = document.getElementById("edit-note-cancel-btn-" + id)!;

  cancelBtn.addEventListener("click", () => {
    const note = getNoteById(id);
    note.classList.remove("note-edit-mode");

    retrieveNote(details);
    addEditNoteListener(id);
    addRemoveNoteListener(id);
  });
};

const removeNoteListener = (e: Event): void => {
  const target = e.target as HTMLElement;
  const id = getBtnId(target);
  const modal = document.getElementById("modal") as HTMLDialogElement;
  modal.showModal();

  modalRemoveNoteListener(id);
  modalCancelListener();
};

const modalRemoveNoteListener = (id: string): void => {
  const modal = document.getElementById("modal") as HTMLDialogElement;
  const removeBtn = document.getElementById(
    "modal-remove"
  ) as HTMLButtonElement;

  removeBtn.addEventListener("click", () => {
    getNoteById(id)?.remove();
    modal.close();

    const notes = getNotes().length;
    console.log("notes", notes);

    if (!notes) {
      const container = document.getElementById("container")!;
      const noNotesView = createNoNotesView();
      container.replaceChildren(noNotesView);

      noNotesAddNoteListener();
    }
  });
};

const modalCancelListener = (): void => {
  const modal = document.getElementById("modal") as HTMLDialogElement;
  const cancelBtn = document.getElementById(
    "modal-cancel"
  ) as HTMLButtonElement;

  cancelBtn.addEventListener("click", () => {
    modal.close();
  });
};
