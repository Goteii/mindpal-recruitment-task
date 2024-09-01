import {
  createAddNewNoteBtn,
  createAddNewNoteView,
  createNoNotesView,
  createNote,
} from "./creators";
import { getBtnId, getNoteById, getNotes } from "./getters";

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
    const newNote = createNote();
    const container = document.getElementById("container")!;
    const addNewNotePrimary = createAddNewNoteBtn();
    const notes = getNotes();
    if (notes.length) {
      container.replaceChildren(addNewNotePrimary);
      notes.forEach((note) => container.appendChild(note));
      container.appendChild(newNote);
      //ADD LISTENERS FOR EDIT AND REMOVE
      const editNoteBtns = Array.from(
        document.querySelectorAll("button[id*='edit-note-']")
      );
      console.log("editNote", editNoteBtns);
      editNoteBtns.forEach((editBtn) =>
        editBtn.addEventListener("click", (e) => editNoteListener(e))
      );

      const removeNoteBtns = Array.from(
        document.querySelectorAll("button[id*='remove-note-']")
      );
      removeNoteBtns.forEach((editBtn) =>
        editBtn.addEventListener("click", (e) => removeNoteListener(e))
      );

      addNewNotePrimaryListener();
      return;
    }
    container.replaceChildren(addNewNotePrimary, newNote);

    //ADD LISTENERS FOR EDIT AND REMOVE
    const editNoteBtns = Array.from(
      document.querySelectorAll("button[id*='edit-note-']")
    );
    console.log("editNote", editNoteBtns);
    editNoteBtns.forEach((editBtn) =>
      editBtn.addEventListener("click", (e) => editNoteListener(e))
    );

    const removeNoteBtns = Array.from(
      document.querySelectorAll("button[id*='remove-note-']")
    );
    removeNoteBtns.forEach((editBtn) =>
      editBtn.addEventListener("click", (e) => removeNoteListener(e))
    );
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

const editNoteListener = (e: Event): void => {
  const target = e.target as HTMLElement;
  const id = getBtnId(target);

  const note = document.querySelector(`.note-tile[data-id="${id}"]`)!;
  const createNoteView = createAddNewNoteView();

  //To create Edit view (add styles, change html (Edit note, Edit btn))
  //   Array.from(note.children).forEach((child) => child.remove());
  //   note.appendChild(createNoteView);
  //   console.log("note", note);

  //swap note CONTENT with createNoteView (probably needs to be seperated method so we can pass title and body)
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
