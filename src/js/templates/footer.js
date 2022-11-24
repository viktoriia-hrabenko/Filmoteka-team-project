document.getElementById('year').innerHTML = new Date().getFullYear();

const footerBntRef = document.querySelector('.footer__button');
const modalRef = document.querySelector('[data-modal-team]');
const closeModalBtnRef = document.querySelector('[data-modal-team-close]');
const bodyRef = document.querySelector('body');
const footerRef = document.querySelector('.footer');

function toggleModalTeam() {
  modalRef.classList.toggle('is-hidden');
  bodyRef.classList.toggle('no-scroll');
}

function toggleModal() {
 modalRef.classList.toggle('is-hidden');
  document.body.classList.toggle('js-modal-is-hidden');
  isShow
    ? document.body.removeEventListener('keydown', onKeyDown)
    : document.body.addEventListener('keydown', onKeyDown);
  isShow = !isShow;
}

function onBackdropClick(event) {
  if (event.target != event.currentTarget) {
    return;
  }
  toggleModal();
}

modalRef.addEventListener('click', onBackdropClick);

footerBntRef.addEventListener('click', toggleModalTeam);

closeModalBtnRef.addEventListener('click', toggleModalTeam);

