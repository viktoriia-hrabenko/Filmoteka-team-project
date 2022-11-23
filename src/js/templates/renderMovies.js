import { FetchApiMovies } from '../api/fetchMovies';
import { refs } from '../refs/refs';
import { getGenresIdsList } from '../api/getGenresIdsList';

export { renderMoviesList };

const renderMoviesList = (movies, genresList) => {
  refs.moviesList.innerHTML = '';

  movies.forEach(movie => {
    const genres = movie.genre_ids.map(genreId => {
      const genreName = genresList.find(genre => genre.id === genreId);
      return `<span> ${genreName.name}</span>`;
    });
    movie.genre_ids = genres;
  });

  const markupMoviesList = movies
    .map(movie => {
      const markup = `
                <div class="movie-card" data-modal-open>
                    <li class="movie-card__item" id="${movie.id}">
                        <div class="movie-card__link">
                            <img class="movie-card__image" src="https://image.tmdb.org/t/p/w500${
                              movie.poster_path
                            }" alt="${movie.original_title}"  />
                                <div class="info">
                                    <p class="info__item">${
                                      movie.original_title
                                    }</p>
                                    <p class="info__about-item">${
                                      movie.genre_ids
                                    }</p>
                                    <div class="info__about-item">${movie.release_date.slice(
                                      0,
                                      4
                                    )}</div>
                                </div>
                        </div>
                    </li>
                <div> 
                `;
      return markup;
    })
    .join('');

  refs.moviesList.innerHTML = markupMoviesList;
};
