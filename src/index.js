import { getTrending, getSearch, getMovieDetails } from './js/api/fetchMovies';
import { renderMoviesList } from './js/templates/renderMovies';
import { onSearchFormButtonClick } from './js/components/searchMovie';

import { FetchApiMovies } from './js/api/fetchMovies';
const fetchApiMovies = new FetchApiMovies();

async function showTrendingMovies() {
  const response = await fetchApiMovies.getTrending();
  const movies = await response.results;
  renderMoviesList(movies);
}

showTrendingMovies();
