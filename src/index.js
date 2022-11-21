import { getGenresIdsList } from './js/api/getGenresIdsList';
import { getTrending, getSearch, getMovieDetails } from './js/api/fetchMovies';
import { renderMoviesList } from './js/templates/renderMovies';
import { onSearchFormButtonClick } from './js/components/searchMovie';

import { addToggleModal } from './js/components/modal';
import './js/templates/footer';

import { FetchApiMovies } from './js/api/fetchMovies';
const fetchApiMovies = new FetchApiMovies();

async function showTrendingMovies() {
  const genresList = await getGenresIdsList();

  const response = await fetchApiMovies.getTrending();
  const movies = await response.results;

  renderMoviesList(movies, genresList);
}

const showMoviesAndModal = showTrendingMovies().then(() => {
  addToggleModal();
});
