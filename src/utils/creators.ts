import { Button } from "../models/button.model";
import { Heading } from "../models/heading.model";
import { CustomImage } from "../models/image.model";
import { Input } from "../models/input.model";
import { NoteDetails } from "../models/note-details.model";
import { CustomText } from "../models/text.model";
import { Textarea } from "../models/textarea.model";
import { getNoteById } from "./getters";

let idx = 0;

export const createAddNewNoteViewElement = (): HTMLElement => {
  const section = createSection("add-new-note-container");

  const heading = createDiv("add-new-note-heading");
  const headingHeader = createHeading({ textContent: "Add new note" });
  const headingButton = createButton({
    className: "btn btn-cancel",
    textContent: "Cancel",
    id: "add-note-cancel",
  });

  heading.appendChild(headingHeader);
  heading.appendChild(headingButton);

  const body = createDiv("add-new-note-body");
  const bodyInput = createInput({
    className: "text-field",
    id: "note-title",
    placeholder: "Untitled Note",
  });
  const bodyTextarea = createTextarea({
    className: "text-field note-body-textarea",
    id: "note-body",
    placeholder: "Your note...",
  });
  const bodyButton = createButton({
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

export const createNoNotesView = (): HTMLElement => {
  const wrapper = createDiv("details-wrapper");

  const details = createDiv("details");
  const informationImg = createImage({
    src: require("../assets/information.svg"),
    loading: "eager",
    alt: "Information circle",
    className: "information",
  });
  const heading = createHeading({
    textContent: "No notes yet",
    className: "heading",
  });
  const detailsParagraph = createText({
    type: "p",
    textContent: "Add a note to keep track of your learnings.",
    className: "description",
  });

  details.appendChild(informationImg);
  details.appendChild(heading);
  details.appendChild(detailsParagraph);

  const button = createButton({
    className: "btn btn-secondary add-note",
    id: "add-note",
  });

  const noteAddImg = createImage({
    src: require("../assets/note_add.svg"),
    alt: "",
    loading: "eager",
  });

  const btnText = createText({ type: "span", textContent: "Add Note" });

  button.appendChild(noteAddImg);
  button.appendChild(btnText);

  wrapper.appendChild(details);
  wrapper.appendChild(button);

  return wrapper;
};

export const createNote = (titleVal: string, bodyVal: string): HTMLElement => {
  const section = createSection("note-tile");
  section.setAttribute("data-id", idx.toString());

  const noteHeader = createNoteTileHeader(titleVal, idx.toString());
  const noteBody = createNoteTileBody(bodyVal, idx.toString());
  const noteFooter = createNoteTileFooter();

  [noteHeader, noteBody, noteFooter].forEach((node) =>
    section.appendChild(node)
  );

  idx++;

  return section;
};

export const retrieveNote = (details: NoteDetails): HTMLElement => {
  const { title, body, id } = details;
  const note = getNoteById(id);

  Array.from(note.children).forEach((child) => child.remove());

  const noteHeader = createNoteTileHeader(title, id);
  const noteBody = createNoteTileBody(body, id);
  const noteFooter = createNoteTileFooter();

  [noteHeader, noteBody, noteFooter].forEach((node) => note.appendChild(node));
  return note;
};

export const saveNote = (id: string): HTMLElement => {
  const title = (
    document.getElementById("edit-note-title-" + id) as HTMLInputElement
  ).value;
  const body = (
    document.getElementById("edit-note-body-" + id) as HTMLTextAreaElement
  ).value;

  return retrieveNote({ id, title, body });
};

export const createAddNewNoteBtnElement = (): HTMLButtonElement => {
  return createButton({
    className: "btn btn-primary add-note-primary",
    id: "add-new-note-primary",
    textContent: "Add New",
  });
};

export const createEditNoteView = (payload: NoteDetails): HTMLElement => {
  const { id, title, body } = payload;
  const section = createSection("edit-note-container");

  const heading = createDiv("edit-note-heading");
  const header = createHeading({ heading: "h2", textContent: "Edit note" });
  const cancelBtn = createButton({
    className: "btn btn-cancel",
    id: "edit-note-cancel-btn-" + id,
    "data-id": id,
    textContent: "Cancel",
  });

  heading.appendChild(header);
  heading.appendChild(cancelBtn);

  const noteBody = createDiv("edit-note-body");
  const noteTitleInput = createInput({
    className: "text-field",
    id: "edit-note-title-" + id,
    placeholder: "Untitlted Note",
    value: title,
  });
  const noteBodyTextarea = createTextarea({
    className: "text-field note-body-textarea",
    id: "edit-note-body-" + id,
    placeholder: "Your note...",
    value: body,
  });
  const editBtn = createButton({
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

//private node creators
const createSection = (className: string): HTMLElement => {
  const section = document.createElement("section");
  section.className = className;
  return section;
};

const createDiv = (className: string): HTMLDivElement => {
  const div = document.createElement("div");
  div.className = className;
  return div;
};

const createInput = (payload: Input): HTMLInputElement => {
  const input = document.createElement("input");
  input.className = payload.className;
  input.id = payload.id;
  input.placeholder = payload.placeholder;
  input.value = payload.value || "";
  return input;
};

const createTextarea = (payload: Textarea): HTMLTextAreaElement => {
  const textarea = document.createElement("textarea");
  textarea.className = payload.className;
  textarea.id = payload.id;
  textarea.placeholder = payload.placeholder;
  textarea.value = payload.value || "";
  return textarea;
};
const createButton = (payload: Button): HTMLButtonElement => {
  const button = document.createElement("button");
  button.className = payload.className;
  button.textContent = payload.textContent || "";
  button.id = payload.id;
  button.setAttribute("data-id", payload["data-id"] || "");
  return button;
};

const createHeading = (payload: Heading): HTMLElement => {
  const heading = document.createElement(payload.heading || "h2");
  heading.textContent = payload.textContent;
  heading.className = payload.className || "";
  heading.id = payload.id || "";
  return heading;
};
const createImage = (payload: CustomImage): HTMLImageElement => {
  const image = document.createElement("img");
  image.src = payload.src;
  image.loading = payload.loading;
  image.alt = payload.alt;
  return image;
};
const createText = (
  payload: CustomText
): HTMLSpanElement | HTMLParagraphElement => {
  const text = document.createElement(payload.type);
  text.textContent = payload.textContent;
  text.className = payload.className || "";
  text.id = payload.id || "";
  return text;
};
//group creators
const createNoteTileHeader = (title: string, idx: string): HTMLElement => {
  const noteHeader = createDiv("note-header");
  const noteTitle = createHeading({
    className: "note-title",
    textContent: title,
    id: "note-title-" + idx,
  });

  const actions = createDiv("actions");
  const editNoteBtn = createButton({
    className: "action-btn edit-action",
    id: "edit-note-" + idx,
    "data-id": idx,
  });
  const editNoteImg = createImage({
    alt: "Edit note",
    loading: "lazy",
    src: require("../assets/edit.svg"),
  });

  editNoteBtn.appendChild(editNoteImg);

  const removeNoteBtn = createButton({
    className: "action-btn remove-action",
    id: "remove-note-" + idx,
    "data-id": idx,
  });
  const removeNoteImg = createImage({
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
const createNoteTileBody = (body: string, idx: string): HTMLElement => {
  const noteBody = createDiv("note-body");
  const noteBodyText = createText({
    type: "p",
    textContent: body,
    id: "note-body-" + idx,
  });

  noteBody.appendChild(noteBodyText);

  return noteBody;
};
const createNoteTileFooter = (): HTMLElement => {
  const noteFooter = createDiv("note-footer");
  const noteFooterText = createText({ type: "p", textContent: "May 22" });

  noteFooter.appendChild(noteFooterText);
  return noteFooter;
};
