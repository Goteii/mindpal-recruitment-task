export const closeModal = () => {
  const modal = document.getElementById("modal") as HTMLDialogElement;
  modal.close();
};

export const showModal = () => {
  const modal = document.getElementById("modal") as HTMLDialogElement;
  modal.showModal();
};
