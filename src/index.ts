import "./styles.scss";
import { createAddNewNoteView } from "./utils/creators";
import { addNewNoteCancelListener } from "./utils/listeners";

const REMOVE_NOTE = document.getElementById("remove-note")!;
const MODAL = document.getElementById("modal") as HTMLDialogElement;
const MODAL_CANCEL = document.getElementById("modal-cancel")!;
const CONTAINER = document.getElementById("container");

//works
// REMOVE_NOTE.addEventListener("click", () => {
//   MODAL.showModal();
// });

// MODAL_CANCEL.addEventListener("click", (e) => {
//   MODAL.close();
// });

const ADD_NOTE = document.getElementById("add-note")!;

ADD_NOTE.addEventListener("click", () => {
  console.log("creating a note");
  const addNoteSection = createAddNewNoteView();
  CONTAINER?.replaceChildren(addNoteSection);

  addNewNoteCancelListener();
});

//@TODO add focus trap if modal is active
