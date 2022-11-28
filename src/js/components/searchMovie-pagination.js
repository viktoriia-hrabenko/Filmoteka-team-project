import { refs } from '../refs/refs';
import { FetchApiMovies } from '../api/fetchMovies';
import { renderMoviesList } from '../templates/renderMovies';
import { getGenresIdsList } from '../api/getGenresIdsList';
import { addToggleModal } from '../components/modal';
import { Loader } from './loader';
const loader = new Loader();

function topFunction() {
  document.body.scrollTop = 0; 
  document.documentElement.scrollTop = 0; 
}


const fetchApiMovies = new FetchApiMovies();

export async function setPaginationSearch(query, page) {
  refs.paginationNumbers.innerHTML = '';
  const response = await fetchApiMovies.getSearch(query, page);
  console.log(response)
  const totalNumberOfPages = await response.total_pages;
  let currentPage = await response.page;
  let paginationMArkup = '';

  if (currentPage > 1) {
    paginationMArkup += `<button type="button" class="pagination-container__prev-button">
    &#8656
</button>`;
  }

  for (let i = 1; i <= totalNumberOfPages; i += 1) {
    if (
      i == 1 ||
      i == totalNumberOfPages ||
      i == currentPage ||
      (i > currentPage && i <= currentPage + 2) ||
      (i < currentPage && i >= currentPage - 2) ||
      (currentPage == 1 && totalNumberOfPages > 4 && i < 8) ||
      (currentPage == 2 && totalNumberOfPages > 5 && i < 8) ||
      (currentPage == 3 && totalNumberOfPages > 6 && i < 8) ||
      (currentPage == 4 && totalNumberOfPages > 7 && i < 8) ||
      (currentPage == totalNumberOfPages &&
        totalNumberOfPages > 7 &&
        i > totalNumberOfPages - 7) ||
      (currentPage == totalNumberOfPages - 1 &&
        totalNumberOfPages > 7 &&
        i > totalNumberOfPages - 7) ||
      (currentPage == totalNumberOfPages - 2 &&
        totalNumberOfPages > 7 &&
        i > totalNumberOfPages - 7) ||
      (currentPage == totalNumberOfPages - 3 &&
        totalNumberOfPages > 7 &&
        i > totalNumberOfPages - 7)
    ) {
      paginationMArkup += `<button type="button" class="pagination-container__button" data-id="${i}">${i}</button>`;
    }
  }
  if (totalNumberOfPages > 2 && totalNumberOfPages !== currentPage) {
    paginationMArkup += `<button type="button" class="pagination-container__next-button">&#8658
    </button>`;
  }

  refs.paginationNumbers.innerHTML = paginationMArkup;

  const paginationButtons = document.querySelectorAll(
    '.pagination-numbers button'
  );

  function createDotsbuttons() {
    const firstDotButtonLocation = document.querySelector(
      'button[data-id="1"]'
    );
    const lastDotButtonLocation = document.querySelector(
      `button[data-id="${totalNumberOfPages}"`
    );
    const firstDotButton = document.createElement('button');
    firstDotButton.textContent = '...';
    firstDotButton.classList.add('pagination-container__first-dot-button');
    const lastDotButton = document.createElement('button');
    lastDotButton.textContent = '...';
    lastDotButton.classList.add('pagination-container__last-dot-button');

    if (currentPage > 4) {
      firstDotButtonLocation.after(firstDotButton);
    }

    if (currentPage < totalNumberOfPages - 3)
      lastDotButtonLocation.before(lastDotButton);
  }
  createDotsbuttons();

  function handleActiveButton() {
    paginationButtons.forEach(button => {
      button.classList.remove('pagination-container__button--active');
      let pageIndex = button.textContent;
      if (pageIndex == currentPage) {
        button.classList.add('pagination-container__button--active');
      }
    });
  }

  handleActiveButton();

  paginationButtons.forEach(button => {
    button.addEventListener('click', async (event) => {
      if (event.target.classList.contains('pagination-container__button')) {
        topFunction();
        loader.on();
        let pageNumber = event.target.textContent;
        const genresList = await getGenresIdsList();
        const response = await fetchApiMovies.getSearch(query, pageNumber);
        const movies = await response.results;
        renderMoviesList(movies, genresList);
        setPaginationSearch(query, pageNumber);
        addToggleModal();
        loader.off();

        ;
      } else if (
        event.target.classList.contains('pagination-container__prev-button')
      ) {
        topFunction();
        loader.on();
        currentPage--;
        const genresList = await getGenresIdsList();
        const response = await fetchApiMovies.getSearch(query, currentPage);
        const movies = await response.results;
        renderMoviesList(movies, genresList);
        setPaginationSearch(query, currentPage);
        addToggleModal();
        loader.off();


      } else if (
        event.target.classList.contains('pagination-container__next-button')
      ) {
        topFunction();
        loader.on();
        currentPage++;
        const genresList = await getGenresIdsList();
        const response = await fetchApiMovies.getSearch(query, currentPage);
        const movies = await response.results;
        renderMoviesList(movies, genresList);
        setPaginationSearch(query, currentPage);
        addToggleModal();
        loader.off();
      }
    });
  });
}
