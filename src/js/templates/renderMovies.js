import { FetchApiMovies } from '../api/fetchMovies';
import { refs } from '../refs/refs';
import { getGenresIdsList } from '../components/getGenresIdsList';

export { renderMoviesList };

const genre = getGenresIdsList().then(genres => {
  return genres;
});

const renderMoviesList = movies => {
  refs.moviesList.innerHTML = '';

  const markupMoviesList = movies
    .map(movie => {
      const markup = `
                <div class="movie-card">
                    <li class="movie-card__item" id="${movie.id}">
                        <a href="#" class="movie-card__link">
                            <img class="movie-card__image" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.original_title}" />
                                <div class="info">
                                    <p class="info__item">${movie.original_title}</p>
                                    <p class="info__item">${movie.genre_ids}</p>
                                    <p class="info__item">${movie.release_date}</p>
                                </div>
                        </a>
                    </li>
                <div> 
                `;
      return markup;
    })
    .join('');

  refs.moviesList.insertAdjacentHTML('beforeend', markupMoviesList);
};
