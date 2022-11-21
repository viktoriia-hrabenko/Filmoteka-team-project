import { getGenresIdsList } from './js/api/getGenresIdsList';
import { changeGenreIdToName } from './js/components/changeGenreIdToName';
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

  changeGenreIdToName(movies, genresList);
  renderMoviesList(movies);
}

const showMoviesAndModal = showTrendingMovies().then(() => {
  addToggleModal();
});
