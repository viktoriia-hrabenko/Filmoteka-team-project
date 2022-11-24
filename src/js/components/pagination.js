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
    if (
      i == 1 ||
      i == totalNumberOfPages ||
      i == currentPage ||
      (i > currentPage && i <= currentPage + 2) ||
      (i < currentPage && i >= currentPage - 2)||
      (currentPage == 1 && totalNumberOfPages > 4 && i < 8)||
      (currentPage == 2 && totalNumberOfPages > 5 && i < 8)||
      (currentPage == 3 && totalNumberOfPages > 6 && i < 8)||
      (currentPage == 4 && totalNumberOfPages > 7 && i < 7)||
      (currentPage == totalNumberOfPages && totalNumberOfPages > 7 && i > totalNumberOfPages -7)||
      (currentPage == totalNumberOfPages -1 && totalNumberOfPages > 7 && i > totalNumberOfPages -7)||
      (currentPage == totalNumberOfPages -2 && totalNumberOfPages > 7 && i > totalNumberOfPages -7)
      ) {
      paginationMArkup += `<button class="pagination-container__button" data-id="${i}">${i}</button>`;
    }
  }

  refs.paginationContainer.innerHTML = paginationMArkup;
  const paginationButtons = document.querySelectorAll(
    '.pagination-numbers button'
  );

  if(totalNumberOfPages > 1) {
    refs.prevButton.removeAttribute("hidden");
    refs.nextButton.removeAttribute("hidden");
  }
  function createDotsbuttons () {

    const firstDotButtonLocation = document.querySelector('button[data-id="1"]');
    const lastDotButtonLocation = document.querySelector(`button[data-id="${totalNumberOfPages}"`)
    const firstDotButton = document.createElement("button");
    firstDotButton.textContent = "...";
    firstDotButton.classList.add("pagination-container__first-dot-button");
    const lastDotButton = document.createElement("button");
    lastDotButton.textContent = "...";
    lastDotButton.classList.add("pagination-container__last-dot-button");

    if(currentPage > 3) {
      firstDotButtonLocation.after(firstDotButton);
    }

   if(currentPage <= totalNumberOfPages -3)
    lastDotButtonLocation.before(lastDotButton);
  }
  createDotsbuttons();

  handleActiveButton = () => {
    paginationButtons.forEach(button => {
      button.classList.remove('pagination-container__button--active');
      let pageIndex = button.textContent;
      if (pageIndex == currentPage) {
        button.classList.add('pagination-container__button--active');
      }
    });
  };

  const disableButton = button => {
    button.classList.add('disabled');
    button.setAttribute('disabled', true);
  };

  const enableButton = button => {
    button.classList.remove('disabled');
    button.removeAttribute('disabled');
  };

  refs.nextButton.addEventListener('click', () => {
    currentPage++;
    showTrendingMovies(currentPage);
  });

  refs.prevButton.addEventListener('click', () => {
    currentPage--;
    showTrendingMovies(currentPage);
  });

  if (currentPage == 1) {
    disableButton(refs.prevButton);
    refs.prevButton.style.opacity = "0.4";
  } else {
    enableButton(refs.prevButton);
    refs.prevButton.style.opacity = "1";
  }

  if (currentPage == totalNumberOfPages) {
    disableButton(refs.nextButton);
    refs.nextButton.style.opacity = "0.4";
  } else {
    enableButton(refs.nextButton);
    refs.nextButton.style.opacity = "1";
  }

  handleActiveButton();

  paginationButtons.forEach(button => {
    button.addEventListener('click', event => {
      const pageNumber = event.target.textContent;
      console.log(pageNumber);
      showTrendingMovies(pageNumber);
    });
  });
}
