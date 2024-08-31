import { Button } from "../models/button.model";
import { Heading } from "../models/heading.model";
import { CustomImage } from "../models/image.model";
import { Input } from "../models/input.model";
import { CustomText } from "../models/text.model";
import { Textarea } from "../models/textarea.model";

export const createAddNewNoteView = (): HTMLElement => {
  const section = createSection("add-new-note-container");
  const heading = createDiv("add-new-note-heading");
  const body = createDiv("add-new-note-body");

  const headingHeader = createHeading({ textContent: "Add new note" });
  const headingButton = createButton({
    className: "btn btn-cancel",
    textContent: "Cancel",
    id: "add-note-cancel",
  });

  heading.appendChild(headingHeader);
  heading.appendChild(headingButton);

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
    id: "Add_Note",
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

//private creators
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
  return input;
};

const createTextarea = (payload: Textarea): HTMLTextAreaElement => {
  const textarea = document.createElement("textarea");
  textarea.className = payload.className;
  textarea.id = payload.id;
  textarea.placeholder = payload.placeholder;
  return textarea;
};
const createButton = (payload: Button): HTMLButtonElement => {
  const button = document.createElement("button");
  button.className = payload.className;
  button.textContent = payload.textContent || "";
  button.id = payload.id;
  return button;
};

const createHeading = (payload: Heading): HTMLElement => {
  const heading = document.createElement(payload.heading || "h2");
  heading.textContent = payload.textContent;
  heading.className = payload.className || "";
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
  return text;
};
