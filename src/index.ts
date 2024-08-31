import "./styles.scss";
import { addNewNoteListener } from "./utils/listeners";

const CONTAINER = document.getElementById("container")!;

//works
// REMOVE_NOTE.addEventListener("click", () => {
//   MODAL.showModal();
// });

// MODAL_CANCEL.addEventListener("click", (e) => {
//   MODAL.close();
// });

addNewNoteListener();

//@TODO add focus trap if modal is active

const config = { childList: true };

const cb = (mutationList: MutationRecord[]) => {
  for (const mutation of mutationList) {
    if (mutation.type === "childList") {
      console.log("A child node has been added or removed.");
      console.log(mutation.target.childNodes.length);
    }
    if (mutation.type === "childList" && !mutation.target.childNodes.length) {
      console.log("NO CHILDREN!!!!!");
    }
  }
};

const observer = new MutationObserver(cb);

// Start observing the target node for configured mutations
observer.observe(CONTAINER, config);
