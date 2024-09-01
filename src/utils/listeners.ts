import { NoteDetails } from "../models/note-details.model";
import {
  createAddNewNoteBtnElement,
  createAddNewNoteViewElement,
  createEditNoteViewElement,
  createNoNotesViewElement,
  createNoResultsViewElement,
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
export const addScrollUpListener = (): void => {
  const scroll = document.getElementById("scroll-up")!;
  scroll.addEventListener("click", scrollUp);
};

export const addNoNotesAddNoteListener = (): void => {
  const addNote = document.getElementById("add-note")!;
  addNote.addEventListener("click", createAddNewNoteView);
};

export const addSearchNotesListener = (): void => {
  const search = document.getElementById("search-notes") as HTMLInputElement;
  search.addEventListener("input", () => filterResults(search.value));
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
    changeSearchState("enable");
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

const cancelEditNote = (details: NoteDetails): void => {
  const { id } = details;
  const note = getNoteById(id);
  note.classList.remove("note-edit-mode");

  retrieveNoteElement(details);
  addEditNoteListener(id);
  addRemoveNoteListener(id);
};

const removeNoteConfirm = (id: string): void => {
  const modal = document.getElementById("modal") as HTMLDialogElement;
  getNoteById(id)?.remove();
  modal.close();

  const notes = getNotes().length;

  if (!notes) {
    const container = document.getElementById("container")!;
    const noNotesView = createNoNotesViewElement();
    container.replaceChildren(noNotesView);
    changeSearchState("disable");

    addNoNotesAddNoteListener();
    return;
  }
  const searchPhrase = (
    document.getElementById("search-notes") as HTMLInputElement
  ).value;
  filterResults(searchPhrase);
};

const removeNoteCancel = (): void => {
  const modal = document.getElementById("modal") as HTMLDialogElement;
  modal.close();
};

const changeSearchState = (state: "enable" | "disable"): void => {
  const search = document.getElementById("search-notes") as HTMLInputElement;
  if (state === "enable") {
    search.removeAttribute("disabled");
  } else {
    search.value = "";
    search.setAttribute("disabled", "true");
  }
};

const filterResults = (val: string): void => {
  const notes = getNotes() as HTMLElement[];
  if (!val) {
    notes.forEach((note) => {
      note.classList.remove("hide");
    });
  }
  const resultsIds = notes
    .filter((note) => {
      const id = note.getAttribute("data-id")!;
      const details = getNoteDetails(id);
      return details.body.includes(val) || details.title.includes(val);
    })
    .map((el) => el.getAttribute("data-id"));

  const noResultElement = document.getElementById("no-results");

  if (!resultsIds.length && !noResultElement) {
    const noResultsView = createNoResultsViewElement();
    const container = getMainContainer();
    container.appendChild(noResultsView);
  }

  if (noResultElement && resultsIds.length) {
    noResultElement.remove();
  }

  notes.forEach((note) => {
    if (!resultsIds.includes(note.getAttribute("data-id"))) {
      note.classList.add("hide");
    } else {
      note.classList.remove("hide");
    }
  });
};

const scrollUp = (): void => {
  const container = getMainContainer();
  container.scrollTo({
    behavior: "smooth",
    top: 0,
  });
};
