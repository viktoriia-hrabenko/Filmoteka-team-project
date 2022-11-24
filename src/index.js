import { getGenresIdsList } from './js/api/getGenresIdsList';
import { getTrending, getSearch, getMovieDetails } from './js/api/fetchMovies';
import { renderMoviesList } from './js/templates/renderMovies';
import { onSearchFormButtonClick } from './js/components/searchMovie';
import { setPagination } from './js/components/pagination';
import { addToggleModal } from './js/components/modal';
import './js/templates/footer';
import './js/templates/theme';

import { FetchApiMovies } from './js/api/fetchMovies';
import { Loader } from './js/components/loader';
const fetchApiMovies = new FetchApiMovies();
const loader = new Loader();

let page = 1;

async function showTrendingMovies(page) {
  const genresList = await getGenresIdsList();

  const response = await fetchApiMovies.getTrending(page);
  const movies = await response.results;

  renderMoviesList(movies, genresList);
  setPagination(page);
  loader.off();
}

const showMoviesAndModal = showTrendingMovies(1).then(() => {
  addToggleModal();
});

export { showTrendingMovies };

// close welcome modal
setTimeout(() => {
  document.querySelector('.welcome-overlay').classList.add('off');
  document.querySelector('.welcome-text').classList.add('off');
}, 700);
