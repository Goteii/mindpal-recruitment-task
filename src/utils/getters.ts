export const getNotes = (): Node[] => {
  return Array.from(document.querySelectorAll(".note-tile"));
};

export const getBtnId = (target: HTMLElement): string => {
  return (target.getAttribute("data-id") ||
    target.parentElement!.getAttribute("data-id")) as string;
};

export const getNoteById = (id: string): HTMLElement => {
  return document.querySelector(`.note-tile[data-id="${id}"]`)!;
};

export const getNoteDetails = (id: string): { title: string; body: string } => {
  console.log("id", id);
  const title =
    (document.getElementById("note-title-" + id) as HTMLHeadingElement)
      .textContent || "";
  const body =
    (document.getElementById("note-body-" + id) as HTMLParagraphElement)
      .textContent || "";
  return { title, body };
};

export const getMainContainer = (): HTMLElement => {
  return document.getElementById("container")!;
};
