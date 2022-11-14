import { refs } from '../refs/refs';
import { fetchApiMovies } from './js/fetchMovies';
import { renderMoviesList } from '../templates/renderMovies';
import { loader } from './loader';

export { onSearchFormButtonClick }

refs.searchForm.addEventListener('submit', onSearchFormButtonClick);

async function onSearchFormButtonClick(element) {
    element.preventDefault();

    loader.on();

    const query = refs.formInput.value.trim();
    const response = await fetchApiMovies.fetchKey(query);
    const movies = await response.results;

    refs.formInput.value.trim() = '';

    if (movies.length === 0) {
        loader.off();
        refs.notification.classList.remove('off');
        setTimeout(() => {
            refs.notification.classList.add('off')
        }, 2000);
        return;
    }
    
    renderMoviesList(movies);
    loader.off();
}