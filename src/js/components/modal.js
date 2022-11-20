(() => {
    const refs = {
      modalOpen: document.querySelector("[data-modal-open]"),
      modalClose: document.querySelector("[data-modal-close]"),
      modalData: document.querySelector("[data-modal]"),
    };
  
    refs.modalOpen.addEventListener("click", toggleModal);
    refs.modalClose.addEventListener("click", toggleModal);
  
    function toggleModal() {
      refs.modalData.classList.toggle("is-hidden");
    }
  })();