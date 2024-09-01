import { MONTH } from "../constants/month.const";
import { SELECTOR } from "../constants/selector.const";

export const getNotes = (): HTMLElement[] => {
  return Array.from(document.querySelectorAll("." + SELECTOR.class.noteTile));
};

export const getBtnId = (target: HTMLElement): string => {
  return (target.getAttribute("data-id") ||
    target.parentElement!.getAttribute("data-id")) as string;
};

export const getNoteById = (id: string): HTMLElement => {
  return document.querySelector(`.note-tile[data-id="${id}"]`)!;
};

export const getNoteDetails = (id: string): { title: string; body: string } => {
  const title =
    (
      document.getElementById(
        SELECTOR.id.noteTitleId + id
      ) as HTMLHeadingElement
    ).textContent || "";
  const body =
    (
      document.getElementById(
        SELECTOR.id.noteBodyId + id
      ) as HTMLParagraphElement
    ).textContent || "";

  return { title, body };
};

export const getMainContainer = (): HTMLElement => {
  return document.getElementById(SELECTOR.id.container)!;
};

export const getCurrentDate = () => {
  const date = new Date();
  return `${MONTH[date.getMonth()]} ${date.getDate()}`;
};

export const getNotesIds = (
  notes: HTMLElement[],
  val: string
): (string | null)[] => {
  return notes
    .filter((note) => {
      const id = note.getAttribute("data-id")!;
      const details = getNoteDetails(id);
      return (
        details.body.toLowerCase().includes(val) ||
        details.title.toLowerCase().includes(val)
      );
    })
    .map((el) => el.getAttribute("data-id"));
};
