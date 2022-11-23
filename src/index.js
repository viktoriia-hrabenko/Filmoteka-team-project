import { getGenresIdsList } from './js/api/getGenresIdsList';
import { getTrending, getSearch, getMovieDetails } from './js/api/fetchMovies';
import { renderMoviesList } from './js/templates/renderMovies';
import { onSearchFormButtonClick } from './js/components/searchMovie';
import { setPagination } from './js/components/pagination';
import { addToggleModal } from './js/components/modal';
import './js/templates/footer';

import { FetchApiMovies } from './js/api/fetchMovies';
const fetchApiMovies = new FetchApiMovies();

let page = 1;

async function showTrendingMovies(page) {
  const genresList = await getGenresIdsList();

  const response = await fetchApiMovies.getTrending(page);
  const movies = await response.results;

  renderMoviesList(movies, genresList);
  setPagination(page);
}

const showMoviesAndModal = showTrendingMovies(1).then(() => {
  addToggleModal();
});

export { showTrendingMovies };
