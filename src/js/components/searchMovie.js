import { refs } from '../refs/refs';
import { getGenresIdsList } from '../api/getGenresIdsList';
import { FetchApiMovies } from '../api/fetchMovies';
import { renderMoviesList } from '../templates/renderMovies';
import { addToggleModal } from '../components/modal';
import { Loader } from './loader';
import { setPaginationSearch } from './searchMovie-pagination';

export { onSearchFormButtonClick };

const loader = new Loader();
const fetchApiMovies = new FetchApiMovies();

refs.searchForm.addEventListener('submit', onSearchFormButtonClick);

async function onSearchFormButtonClick(element) {
  element.preventDefault();

  loader.on();

  const genresList = await getGenresIdsList();
  const query = refs.formInput.value.trim();
  const response = await fetchApiMovies.getSearch(query, 1);
  const movies = await response.results;

  if (movies.length === 0) {
    loader.off();
    refs.notification.classList.remove('off');
    setTimeout(() => {
      refs.notification.classList.add('off');
    }, 2000);
    return;
  }

  renderMoviesList(movies, genresList);
  setPaginationSearch(query, 1);
  addToggleModal();

  loader.off();
}
