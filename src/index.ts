import "./styles.scss";

const REMOVE_NOTE = document.getElementById("remove-note")!;
const MODAL = document.getElementById("modal") as HTMLDialogElement;
const MODAL_CANCEL = document.getElementById("modal-cancel")!;

REMOVE_NOTE.addEventListener("click", () => {
  MODAL.showModal();
});

MODAL_CANCEL.addEventListener("click", (e) => {
  MODAL.close();
});

//@TODO add focus trap if modal is active
