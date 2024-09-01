import { Button } from "../models/button.model";
import { Heading } from "../models/heading.model";
import { CustomImage } from "../models/image.model";
import { Input } from "../models/input.model";
import { NoteDetails } from "../models/note-details.model";
import { CustomText } from "../models/text.model";
import { Textarea } from "../models/textarea.model";
import { getCurrentDate, getNoteById } from "./getters";

let idx = 0;

export const createAddNewNoteViewElement = (): HTMLElement => {
  const section = createSectionElement("add-new-note-container");

  const heading = createDivElement("add-new-note-heading");
  const headingHeader = createHeadingElement({ textContent: "Add new note" });
  const headingButton = createButtonElement({
    className: "btn btn-cancel",
    textContent: "Cancel",
    id: "add-note-cancel",
  });

  heading.appendChild(headingHeader);
  heading.appendChild(headingButton);

  const body = createDivElement("add-new-note-body");
  const bodyInput = createInputElement({
    className: "text-field",
    id: "note-title",
    placeholder: "Untitled Note",
  });
  const bodyTextarea = createTextElementareaElement({
    className: "text-field note-body-textarea",
    id: "note-body",
    placeholder: "Your note...",
  });
  const bodyButton = createButtonElement({
    className: "btn btn-primary add-new-note",
    textContent: "Add",
    id: "add-new-note",
  });

  body.appendChild(bodyInput);
  body.appendChild(bodyTextarea);
  body.appendChild(bodyButton);

  section.appendChild(heading);
  section.appendChild(body);
  return section;
};

export const createNoNotesViewElement = (): HTMLElement => {
  const wrapper = createDivElement("details-wrapper");

  const details = createDivElement("details");
  const informationImg = createImageElement({
    src: require("../assets/information.svg"),
    loading: "eager",
    alt: "Information circle",
    className: "information",
  });
  const heading = createHeadingElement({
    textContent: "No notes yet",
    className: "heading",
  });
  const detailsParagraph = createTextElement({
    type: "p",
    textContent: "Add a note to keep track of your learnings.",
    className: "description",
  });

  [informationImg, heading, detailsParagraph].forEach((node) =>
    details.appendChild(node)
  );

  const button = createButtonElement({
    className: "btn btn-secondary add-note",
    id: "add-note",
  });

  const noteAddImg = createImageElement({
    src: require("../assets/note_add.svg"),
    alt: "",
    loading: "eager",
  });

  const btnText = createTextElement({ type: "span", textContent: "Add Note" });

  button.appendChild(noteAddImg);
  button.appendChild(btnText);

  wrapper.appendChild(details);
  wrapper.appendChild(button);

  return wrapper;
};

export const createNoteElement = (
  titleVal: string,
  bodyVal: string
): HTMLElement => {
  const section = createSectionElement("note-tile");
  section.setAttribute("data-id", idx.toString());

  const noteHeader = createNoteTileHeaderElement(titleVal, idx.toString());
  const noteBody = createNoteTileBodyElement(bodyVal, idx.toString());
  const noteFooter = createNoteTileFooterElement();

  [noteHeader, noteBody, noteFooter].forEach((node) =>
    section.appendChild(node)
  );

  idx++;

  return section;
};

export const retrieveNoteElement = (details: NoteDetails): HTMLElement => {
  const { title, body, id } = details;
  const note = getNoteById(id);

  Array.from(note.children).forEach((child) => child.remove());

  const noteHeader = createNoteTileHeaderElement(title, id);
  const noteBody = createNoteTileBodyElement(body, id);
  const noteFooter = createNoteTileFooterElement();

  [noteHeader, noteBody, noteFooter].forEach((node) => note.appendChild(node));
  return note;
};

export const saveNoteElement = (id: string): HTMLElement => {
  const title = (
    document.getElementById("edit-note-title-" + id) as HTMLInputElement
  ).value;
  const body = (
    document.getElementById("edit-note-body-" + id) as HTMLTextAreaElement
  ).value;

  return retrieveNoteElement({ id, title, body });
};

export const createAddNewNoteBtnElement = (): HTMLButtonElement => {
  return createButtonElement({
    className: "btn btn-primary add-note-primary",
    id: "add-new-note-primary",
    textContent: "Add New",
  });
};

export const createEditNoteViewElement = (
  payload: NoteDetails
): HTMLElement => {
  const { id, title, body } = payload;
  const section = createSectionElement("edit-note-container");

  const heading = createDivElement("edit-note-heading");
  const header = createHeadingElement({
    heading: "h2",
    textContent: "Edit note",
  });
  const cancelBtn = createButtonElement({
    className: "btn btn-cancel",
    id: "edit-note-cancel-btn-" + id,
    "data-id": id,
    textContent: "Cancel",
  });

  heading.appendChild(header);
  heading.appendChild(cancelBtn);

  const noteBody = createDivElement("edit-note-body");
  const noteTitleInput = createInputElement({
    className: "text-field",
    id: "edit-note-title-" + id,
    placeholder: "Untitlted Note",
    value: title,
  });
  const noteBodyTextarea = createTextElementareaElement({
    className: "text-field note-body-textarea",
    id: "edit-note-body-" + id,
    placeholder: "Your note...",
    value: body,
  });
  const editBtn = createButtonElement({
    className: "btn btn-primary edit-note",
    id: "edit-note-btn-" + id,
    "data-id": id,
    textContent: "Edit",
  });

  [noteTitleInput, noteBodyTextarea, editBtn].forEach((node) =>
    noteBody.appendChild(node)
  );

  section.appendChild(heading);
  section.appendChild(noteBody);

  return section;
};

export const createNoResultsViewElement = (): HTMLElement => {
  const section = createSectionElement("no-results");
  section.id = "no-results";

  const details = createDivElement("details");
  const informationImg = createImageElement({
    src: require("../assets/no-results.svg"),
    loading: "lazy",
    alt: "Sad emoji",
    className: "information",
  });
  const heading = createHeadingElement({
    textContent: "We could not find any matching results",
    className: "heading",
  });
  const detailsParagraph = createTextElement({
    type: "p",
    textContent:
      "Looks like you don't have a note with title or body matching your phrase. Try to rephrase or create a new note.",
    className: "description",
  });

  [informationImg, heading, detailsParagraph].forEach((node) =>
    details.appendChild(node)
  );

  section.appendChild(details);

  return section;
};

//private node creators
const createSectionElement = (className: string): HTMLElement => {
  const section = document.createElement("section");
  section.className = className;
  return section;
};

const createDivElement = (className: string): HTMLDivElement => {
  const div = document.createElement("div");
  div.className = className;
  return div;
};

const createInputElement = (payload: Input): HTMLInputElement => {
  const input = document.createElement("input");
  input.className = payload.className;
  input.id = payload.id;
  input.placeholder = payload.placeholder;
  input.value = payload.value || "";
  return input;
};

const createTextElementareaElement = (
  payload: Textarea
): HTMLTextAreaElement => {
  const textarea = document.createElement("textarea");
  textarea.className = payload.className;
  textarea.id = payload.id;
  textarea.placeholder = payload.placeholder;
  textarea.value = payload.value || "";
  return textarea;
};
const createButtonElement = (payload: Button): HTMLButtonElement => {
  const button = document.createElement("button");
  button.className = payload.className;
  button.textContent = payload.textContent || "";
  button.id = payload.id;
  button.setAttribute("data-id", payload["data-id"] || "");
  return button;
};

const createHeadingElement = (payload: Heading): HTMLElement => {
  const heading = document.createElement(payload.heading || "h2");
  heading.textContent = payload.textContent;
  heading.className = payload.className || "";
  heading.id = payload.id || "";
  return heading;
};
const createImageElement = (payload: CustomImage): HTMLImageElement => {
  const image = document.createElement("img");
  image.src = payload.src;
  image.loading = payload.loading;
  image.alt = payload.alt;
  return image;
};
const createTextElement = (
  payload: CustomText
): HTMLSpanElement | HTMLParagraphElement => {
  const text = document.createElement(payload.type);
  text.textContent = payload.textContent;
  text.className = payload.className || "";
  text.id = payload.id || "";
  return text;
};
//group creators
const createNoteTileHeaderElement = (
  title: string,
  idx: string
): HTMLElement => {
  const noteHeader = createDivElement("note-header");
  const noteTitle = createHeadingElement({
    className: "note-title",
    textContent: title,
    id: "note-title-" + idx,
  });

  const actions = createDivElement("actions");
  const editNoteBtn = createButtonElement({
    className: "action-btn edit-action",
    id: "edit-note-" + idx,
    "data-id": idx,
  });
  const editNoteImg = createImageElement({
    alt: "Edit note",
    loading: "lazy",
    src: require("../assets/edit.svg"),
  });

  editNoteBtn.appendChild(editNoteImg);

  const removeNoteBtn = createButtonElement({
    className: "action-btn remove-action",
    id: "remove-note-" + idx,
    "data-id": idx,
  });
  const removeNoteImg = createImageElement({
    alt: "Remove note",
    loading: "lazy",
    src: require("../assets/remove.svg"),
  });

  removeNoteBtn.appendChild(removeNoteImg);

  actions.appendChild(editNoteBtn);
  actions.appendChild(removeNoteBtn);

  noteHeader.appendChild(noteTitle);
  noteHeader.appendChild(actions);

  return noteHeader;
};
const createNoteTileBodyElement = (body: string, idx: string): HTMLElement => {
  const noteBody = createDivElement("note-body");
  const noteBodyText = createTextElement({
    type: "p",
    textContent: body,
    id: "note-body-" + idx,
  });

  noteBody.appendChild(noteBodyText);

  return noteBody;
};
const createNoteTileFooterElement = (): HTMLElement => {
  const noteFooter = createDivElement("note-footer");
  const noteFooterText = createTextElement({
    type: "p",
    textContent: getCurrentDate(),
  });

  noteFooter.appendChild(noteFooterText);
  return noteFooter;
};
