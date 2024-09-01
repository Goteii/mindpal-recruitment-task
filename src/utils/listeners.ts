import { SEARCH_STATE } from "../constants/search.const";
import { SELECTOR } from "../constants/selector.const";
import { NoteDetails } from "../models/note-details.model";
import { SearchState } from "../models/search.model";
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
  getNotesIds,
} from "./getters";
import { closeModal, showModal } from "./modal";

//listeners attachments
export const addScrollUpListener = (): void => {
  const scroll = document.getElementById(SELECTOR.id.scrollUp)!;
  scroll.addEventListener("click", scrollUp);
};

export const addNoNotesAddNoteListener = (): void => {
  const addNote = document.getElementById(SELECTOR.id.addNote)!;
  addNote.addEventListener("click", createAddNewNoteView);
};

export const addSearchNotesListener = (): void => {
  const search = document.getElementById(
    SELECTOR.id.searchNotes
  ) as HTMLInputElement;
  search.addEventListener("input", () => filterResults(search.value));
};

const addNewNoteCancelListener = (): void => {
  const cancel = document.getElementById(SELECTOR.id.addNoteCancel)!;
  cancel.addEventListener("click", cancelNewNote);
};

const addNewNoteAddNoteListener = (): void => {
  const addNote = document.getElementById(SELECTOR.id.addNewNote)!;
  addNote.addEventListener("click", addNewNote);
};

const addNewNotePrimaryBtnListener = (): void => {
  const addNote = document.getElementById(SELECTOR.id.addNewNotePrimary)!;
  addNote.addEventListener("click", addNewNotePrimaryBtn);
};

const addEditNoteListener = (id: string): void => {
  const editBtn = document.getElementById(
    SELECTOR.id.editNote + id
  ) as HTMLButtonElement;

  editBtn.addEventListener("click", (e) => editNoteListener(e));
};

const addRemoveNoteListener = (id: string): void => {
  const removeBtn = document.getElementById(
    SELECTOR.id.removeNote + id
  ) as HTMLButtonElement;
  removeBtn.addEventListener("click", (e) => removeNoteListener(e));
};

const addEditNoteEditListener = (id: string): void => {
  const editBtn = document.getElementById(SELECTOR.id.editNoteBtn + id)!;

  editBtn.addEventListener("click", () => editNote(id));
};

const addEditNoteCancelListener = (details: NoteDetails): void => {
  const { id } = details;
  const cancelBtn = document.getElementById(
    SELECTOR.id.editNoteCancelBtn + id
  )!;

  cancelBtn.addEventListener("click", () => cancelEditNote(details));
};

const addModalRemoveNoteConfirmListener = (id: string): void => {
  const removeBtn = document.getElementById(
    SELECTOR.id.modalRemove
  ) as HTMLButtonElement;

  removeBtn.addEventListener("click", () => removeNoteConfirm(id));
};

const editNoteListener = (e: Event): void => {
  const target = e.target as HTMLElement;
  const id = getBtnId(target);

  const note = getNoteById(id);

  const { title, body } = getNoteDetails(id);

  const editNoteView = createEditNoteViewElement({ id, title, body });

  note.classList.add(SELECTOR.class.noteEditMode);

  note.replaceChildren(editNoteView);

  addEditNoteCancelListener({ id, title, body });
  addEditNoteEditListener(id);
};

const removeNoteListener = (e: Event): void => {
  const target = e.target as HTMLElement;
  const id = getBtnId(target);
  showModal();

  addModalRemoveNoteConfirmListener(id);
  addModalRemoveNoteCancelListener();
};

const addModalRemoveNoteCancelListener = (): void => {
  const cancelBtn = document.getElementById(
    SELECTOR.id.modalCancel
  ) as HTMLButtonElement;

  cancelBtn.addEventListener("click", closeModal);
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
  const container = getMainContainer();
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
    const title = (
      document.getElementById(SELECTOR.id.noteTitle) as HTMLInputElement
    ).value;
    const body = (
      document.getElementById(SELECTOR.id.noteBody) as HTMLTextAreaElement
    ).value;
    const newNote = createNoteElement(title, body);
    const container = getMainContainer()!;
    const addNewNotePrimaryBtn = createAddNewNoteBtnElement();
    const notes = getNotes();
    const id = newNote.getAttribute("data-id")!;
    changeSearchState(SEARCH_STATE.enable);

    if (notes.length) {
      container.firstChild!.remove();
      container.prepend(addNewNotePrimaryBtn);
      container.appendChild(newNote);

      addListenersTriggerFilter(id);

      return;
    }
    container.replaceChildren(addNewNotePrimaryBtn, newNote);

    addListenersTriggerFilter(id);
  }
};

const addListenersTriggerFilter = (id: string): void => {
  triggerFilter();
  addEditNoteListener(id);
  addRemoveNoteListener(id);
  addNewNotePrimaryBtnListener();
};

const addNewNotePrimaryBtn = (): void => {
  const addNote = document.getElementById(SELECTOR.id.addNewNotePrimary)!;
  const addNoteSection = createAddNewNoteViewElement();
  const container = getMainContainer()!;
  addNote.remove();
  container.prepend(addNoteSection);

  addNewNoteCancelListener();
  addNewNoteAddNoteListener();
};

const editNote = (id: string) => {
  const note = getNoteById(id);
  note.classList.remove(SELECTOR.class.noteEditMode);

  saveNoteElement(id);
  addEditNoteListener(id);
  addRemoveNoteListener(id);
};

const cancelEditNote = (details: NoteDetails): void => {
  const { id } = details;
  const note = getNoteById(id);
  note.classList.remove(SELECTOR.class.noteEditMode);

  retrieveNoteElement(details);
  addEditNoteListener(id);
  addRemoveNoteListener(id);
};

const removeNoteConfirm = (id: string): void => {
  getNoteById(id)?.remove();
  closeModal();

  const notes = getNotes().length;

  if (!notes) {
    const container = getMainContainer()!;
    const noNotesView = createNoNotesViewElement();
    container.replaceChildren(noNotesView);
    changeSearchState(SEARCH_STATE.disable);

    addNoNotesAddNoteListener();
    return;
  }
  triggerFilter();
};

const changeSearchState = (state: SearchState): void => {
  const search = document.getElementById(
    SELECTOR.id.searchNotes
  ) as HTMLInputElement;
  if (state === SEARCH_STATE.enable) {
    search.removeAttribute("disabled");
  } else {
    search.value = "";
    search.setAttribute("disabled", "true");
  }
};

const triggerFilter = (): void => {
  const searchPhrase = (
    document.getElementById(SELECTOR.id.searchNotes) as HTMLInputElement
  ).value;
  filterResults(searchPhrase);
};

const filterResults = (val: string): void => {
  const notes = getNotes();
  if (!val) {
    showNotes(notes);
    removeResultElement();
    return;
  }

  const valLowercased = val.toLowerCase();
  const resultsIds = getNotesIds(notes, valLowercased);

  const noResultElement = document.getElementById(SELECTOR.id.noResults);

  if (!resultsIds.length && !noResultElement) {
    const noResultsView = createNoResultsViewElement();
    const container = getMainContainer();
    container.appendChild(noResultsView);
  } else if (noResultElement && resultsIds.length) {
    noResultElement.remove();
  }

  notes.forEach((note) => {
    if (!resultsIds.includes(note.getAttribute("data-id"))) {
      note.classList.add(SELECTOR.class.hide);
    } else {
      note.classList.remove(SELECTOR.class.hide);
    }
  });
};

const removeResultElement = (): void => {
  const noResultElement = document.getElementById(SELECTOR.id.noResults);

  if (noResultElement) {
    noResultElement.remove();
  }
};

const showNotes = (notes: HTMLElement[]): void => {
  notes.forEach((note) => {
    note.classList.remove(SELECTOR.class.hide);
  });
};

const scrollUp = (): void => {
  const container = getMainContainer();
  container.scrollTo({
    behavior: "smooth",
    top: 0,
  });
};
