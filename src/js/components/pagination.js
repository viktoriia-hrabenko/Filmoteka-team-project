import { refs } from '../refs/refs';
import { FetchApiMovies } from '../api/fetchMovies';
const fetchApiMovies = new FetchApiMovies();
import { showTrendingMovies } from '../../index.js';

export async function setPagination(page) {
  const response = await fetchApiMovies.getTrending(page);
  const totalNumberOfPages = await response.total_pages;
  let currentPage = await response.page;
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

const disableButton = (button) => {
  button.classList.add("disabled");
  button.setAttribute("disabled", true);
};
 
const enableButton = (button) => {
  button.classList.remove("disabled");
  button.removeAttribute("disabled");
};


    refs.nextButton.addEventListener("click", () => {
      currentPage ++;
      showTrendingMovies(currentPage)

    });

    refs.prevButton.addEventListener("click", () => {
      currentPage --;
       showTrendingMovies(currentPage);
        
            });

            if(currentPage == 1) {
              disableButton(refs.prevButton)
            }
            else {enableButton(refs.prevButton)}; 

              if(currentPage == totalNumberOfPages) {
                disableButton(refs.nextButton)
              }
              else {enableButton(refs.nextButton)}


handleActiveButton(); 


  paginationButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      const pageNumber = event.target.textContent;
      console.log(pageNumber)
      showTrendingMovies(pageNumber);
      ;
      
      
    });
  });
}


