import { refs } from '../refs/refs';
import { FetchApiMovies } from '../api/fetchMovies';
const fetchApiMovies = new FetchApiMovies();
import { showTrendingMovies } from '../..';

export async function setPagination() {
  const response = await fetchApiMovies.getTrending(1);
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
console.log(currentPage)
  paginationButtons.forEach(button => {

handleActiveButton = () => {
    button.classList.remove('pagination-container__button--active');
    let pageIndex = button.textContent;
    if(pageIndex == currentPage) {
        button.classList.add('pagination-container__button--active')
    }}
    

    button.addEventListener('click', event => {
      const pageNumber = event.target.textContent;
      console.log(pageNumber);
      showTrendingMovies(pageNumber);
      handleActiveButton();
    });
  });
}
