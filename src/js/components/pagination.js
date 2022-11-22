import { refs } from '../refs/refs';
import { FetchApiMovies } from '../api/fetchMovies';
const fetchApiMovies = new FetchApiMovies();
import { showTrendingMovies } from '../..';

export async function setPagination(page) {
  const response = await fetchApiMovies.getTrending(page);
  const totalNumberOfPages = await response.total_pages;
  const currentPage = await response.page;
  let paginationMArkup = '';

  for (let i = 1; i <= totalNumberOfPages; i += 1) {
    paginationMArkup += `<button class="pagination-container__button" data-id="${i}">${i}</button>`;
  }

  refs.paginationContainer.innerHTML = paginationMArkup;
  const paginationButtons = document.querySelectorAll(
    '.pagination-numbers button'
  );

  handleActiveButton = () => {
    paginationButtons.forEach((button) => {

        button.classList.remove('pagination-container__button--active');
        let pageIndex = button.textContent;
        if(pageIndex == currentPage) {
            button.classList.add('pagination-container__button--active')}
    })
}

function handleNextAndPrevButton () { 

    refs.nextButton.addEventListener("click", () => {
showTrendingMovies(currentPage + 1);
setPagination(currentPage)
    });

    refs.prevButton.addEventListener("click", () => {
        showTrendingMovies(currentPage - 1);
        setPagination(currentPage )
            });

            const disableButton = (button) => {
                button.classList.add("disabled");
                button.setAttribute("disabled", true);
              };
               
              const enableButton = (button) => {
                button.classList.remove("disabled");
                button.removeAttribute("disabled");
              };

              if(currentPage === 1) {
                disableButton(refs.prevButton)
              }
              else {enableButton(refs.prevButton)}; 
              if(currentPage === totalNumberOfPages) {
                disableButton(refs.nextButton)
              }
              else {enableButton(refs.nextButton)}
}
  
handleActiveButton(); 
handleNextAndPrevButton();

  paginationButtons.forEach(button => {
    button.addEventListener('click', event => {
      const pageNumber = event.target.textContent;
      showTrendingMovies(pageNumber);
      handleActiveButton();
      handleNextAndPrevButton();
    });
  });
}


