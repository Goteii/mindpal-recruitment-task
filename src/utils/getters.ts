export const getNotes = (): Node[] => {
  return Array.from(document.querySelectorAll(".note-tile"));
};

export const getBtnId = (target: HTMLElement): string => {
  return (target.getAttribute("data-id") ||
    target.parentElement!.getAttribute("data-id")) as string;
};

export const getNoteById = (id: string) => {
  return document.querySelector(`.note-tile[data-id="${id}"]`)!;
};
