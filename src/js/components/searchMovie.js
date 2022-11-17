import { refs } from '../refs/refs';
import { FetchApiMovies } from '../api/fetchMovies';
import { renderMoviesList } from '../templates/renderMovies';
import { Loader } from './loader';

export { onSearchFormButtonClick };

const loader = new Loader();
const fetchApiMovies = new FetchApiMovies();

refs.searchForm.addEventListener('submit', onSearchFormButtonClick);

async function onSearchFormButtonClick(element) {
  element.preventDefault();

  loader.on();

  const query = refs.formInput.value.trim();
  const response = await fetchApiMovies.getSearch(query, 1);
  const movies = await response.results;

  refs.formInput.value = '';

  if (movies.length === 0) {
    loader.off();
    refs.notification.classList.remove('off');
    setTimeout(() => {
      refs.notification.classList.add('off');
    }, 2000);
    return;
  }

  renderMoviesList(movies);
  loader.off();
}
