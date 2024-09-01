import { NoteDetails } from "../models/note-details.model";
import {
  createAddNewNoteBtnElement,
  createAddNewNoteViewElement,
  createEditNoteViewElement,
  createNoNotesViewElement,
  createNoteElement,
  retrieveNoteElement,
  saveNoteElement,
} from "./creators";
import {
  getBtnId,
  getMainContainer,
  getNoteById,
  getNoteDetails,
  getNotes,
} from "./getters";

//listeners attachments
export const addNoNotesAddNoteListener = (): void => {
  const addNote = document.getElementById("add-note")!;
  addNote.addEventListener("click", createAddNewNoteView);
};

const addNewNoteCancelListener = (): void => {
  const cancel = document.getElementById("add-note-cancel")!;
  cancel.addEventListener("click", cancelNewNote);
};

const addNewNoteAddNoteListener = (): void => {
  const addNote = document.getElementById("add-new-note")!;
  addNote.addEventListener("click", addNewNote);
};

const addNewNotePrimaryBtnListener = (): void => {
  const addNote = document.getElementById("add-new-note-primary")!;
  addNote.addEventListener("click", addNewNotePrimaryBtn);
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

const addEditNoteEditListener = (id: string): void => {
  const editBtn = document.getElementById("edit-note-btn-" + id)!;

  editBtn.addEventListener("click", () => editNote(id));
};

const addEditNoteCancelListener = (details: NoteDetails): void => {
  const { id } = details;
  const cancelBtn = document.getElementById("edit-note-cancel-btn-" + id)!;

  cancelBtn.addEventListener("click", () => cancelEditNote(details));
};

const addModalRemoveNoteConfirmListener = (id: string): void => {
  const removeBtn = document.getElementById(
    "modal-remove"
  ) as HTMLButtonElement;

  removeBtn.addEventListener("click", () => removeNoteConfirm(id));
};

const editNoteListener = (e: Event): void => {
  const target = e.target as HTMLElement;
  const id = getBtnId(target);

  const note = getNoteById(id);

  const { title, body } = getNoteDetails(id);

  const editNoteView = createEditNoteViewElement({ id, title, body });

  note.classList.add("note-edit-mode");

  note.replaceChildren(editNoteView);

  addEditNoteCancelListener({ id, title, body });
  addEditNoteEditListener(id);
};

const removeNoteListener = (e: Event): void => {
  const target = e.target as HTMLElement;
  const id = getBtnId(target);
  const modal = document.getElementById("modal") as HTMLDialogElement;
  modal.showModal();

  addModalRemoveNoteConfirmListener(id);
  addModalRemoveNoteCancelListener();
};

const addModalRemoveNoteCancelListener = (): void => {
  const cancelBtn = document.getElementById(
    "modal-cancel"
  ) as HTMLButtonElement;

  cancelBtn.addEventListener("click", removeNoteCancel);
};

//listeners methods
const createAddNewNoteView = (): void => {
  const addNoteSection = createAddNewNoteViewElement();
  const container = getMainContainer();
  container.replaceChildren(addNoteSection);

  addNewNoteCancelListener();
  addNewNoteAddNoteListener();
};

const cancelNewNote = (): void => {
  const notes = getNotes();
  if (notes.length) {
    createAddNotePrimaryBtn();
    return;
  }
  const noNotesView = createNoNotesViewElement();
  const container = document.getElementById("container");
  container?.replaceChildren(noNotesView);
  addNoNotesAddNoteListener();
};

const createAddNotePrimaryBtn = (): void => {
  const addNewNotePrimaryBtn = createAddNewNoteBtnElement();
  const container = getMainContainer();
  container.firstChild!.remove();
  container.prepend(addNewNotePrimaryBtn);
  addNewNotePrimaryBtnListener();
};

const addNewNote = (): void => {
  {
    const title = (document.getElementById("note-title") as HTMLInputElement)
      .value;
    const body = (document.getElementById("note-body") as HTMLTextAreaElement)
      .value;
    const newNote = createNoteElement(title, body);
    const container = document.getElementById("container")!;
    const addNewNotePrimaryBtn = createAddNewNoteBtnElement();
    const notes = getNotes();
    const id = newNote.getAttribute("data-id")!;
    if (notes.length) {
      container.firstChild!.remove();
      container.prepend(addNewNotePrimaryBtn);
      container.appendChild(newNote);

      addEditNoteListener(id);
      addRemoveNoteListener(id);
      addNewNotePrimaryBtnListener();

      return;
    }
    container.replaceChildren(addNewNotePrimaryBtn, newNote);

    addEditNoteListener(id);
    addRemoveNoteListener(id);
    addNewNotePrimaryBtnListener();
  }
};

const addNewNotePrimaryBtn = (): void => {
  const addNote = document.getElementById("add-new-note-primary")!;
  const addNoteSection = createAddNewNoteViewElement();
  const container = document.getElementById("container")!;
  addNote.remove();
  container.prepend(addNoteSection);

  addNewNoteCancelListener();
  addNewNoteAddNoteListener();
};

const editNote = (id: string) => {
  const note = getNoteById(id);
  note.classList.remove("note-edit-mode");

  saveNoteElement(id);
  addEditNoteListener(id);
  addRemoveNoteListener(id);
};

const cancelEditNote = (details: NoteDetails) => {
  const { id } = details;
  const note = getNoteById(id);
  note.classList.remove("note-edit-mode");

  retrieveNoteElement(details);
  addEditNoteListener(id);
  addRemoveNoteListener(id);
};

const removeNoteConfirm = (id: string) => {
  const modal = document.getElementById("modal") as HTMLDialogElement;
  getNoteById(id)?.remove();
  modal.close();

  const notes = getNotes().length;

  if (!notes) {
    const container = document.getElementById("container")!;
    const noNotesView = createNoNotesViewElement();
    container.replaceChildren(noNotesView);

    addNoNotesAddNoteListener();
  }
};

const removeNoteCancel = () => {
  const modal = document.getElementById("modal") as HTMLDialogElement;
  modal.close();
};
