import { getTrending, getSearch, getMovieDetails } from './js/api/fetchMovies';
import { renderMoviesList } from './js/templates/renderMovies';
import { onSearchFormButtonClick } from './js/components/searchMovie';
import { setPagination } from './js/components/pagination';

import './js/templates/footer';

import { FetchApiMovies } from './js/api/fetchMovies';
const fetchApiMovies = new FetchApiMovies();

export async function showTrendingMovies(page) {
  const response = await fetchApiMovies.getTrending(page);
  const movies = await response.results;
  renderMoviesList(movies);
  setPagination(page);
}

showTrendingMovies(1);


