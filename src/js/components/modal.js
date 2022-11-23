export function addToggleModal() {
  const refsModal = {
    modalClose: document.querySelector('[data-modal-close]'),
    modalData: document.querySelector('.modal-movie__backdrop'),
  };

  function toggleModal() {
    refsModal.modalData.classList.toggle('modal-movie__backdrop--is-hidden');
  }

  document.querySelectorAll('[data-modal-open]').forEach(modal => {
    modal.addEventListener('click', toggleModal);
  });

  refsModal.modalClose.addEventListener('click', toggleModal);

  document
    .querySelector('[data-modal-close]')
    .addEventListener('click', toggleModal);
}
