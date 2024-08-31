import "./styles.scss";
import { noNotesAddNoteListener } from "./utils/listeners";

const CONTAINER = document.getElementById("container")!;

//works
// REMOVE_NOTE.addEventListener("click", () => {
//   MODAL.showModal();
// });

// MODAL_CANCEL.addEventListener("click", (e) => {
//   MODAL.close();
// });

noNotesAddNoteListener();

//@TODO add focus trap if modal is active

// const config = { childList: true };

// const cb = (mutationList: MutationRecord[]) => {
//   for (const mutation of mutationList) {
//     if (mutation.type === "childList") {
//       // && Array.from(mutation.removedNodes).find(node => node.nodeName)

//       Array.from(mutation.removedNodes).forEach((node) =>
//         console.log(node.nodeValue)
//       );

//       console.log("A child node has been added or removed.");
//       console.log(mutation);
//       console.log(mutation.target.childNodes.length);
//       const notes = getNotes().length;
//       console.log("notes", notes);
//       if (!notes) {
//         const noNotesView = createNoNotesView();
//         const container = document.getElementById("container")!;
//         console.log("hello");
//       }
//     }
//   }
// };

// const observer = new MutationObserver(cb);

// // Start observing the target node for configured mutations
// observer.observe(CONTAINER, config);
