import { FetchApiMovies } from '../api/fetchMovies';
import { refs } from '../refs/refs';
import { getGenresIdsList } from '../api/getGenresIdsList';

export { renderMoviesList };

const noPoster = new URL('../../images/no-poster.jpg', import.meta.url);

const renderMoviesList = (movies, genresList) => {
  refs.moviesList.innerHTML = '';

  // replacing genres codes with names
  movies.forEach(movie => {
    const genres = movie.genre_ids.map(genreId => {
      const genreName = genresList.find(genre => genre.id === genreId);
      return `<span> ${genreName.name}</span>`;
    });
    movie.genre_ids = genres;
  });

  // checking and setting the default poster
  movies.forEach(movie => {
    const posterUrl = movie.poster_path;
    if (movie.poster_path === null) {
      return (movie.poster_path = noPoster);
    } else {
      return (movie.poster_path = `https://image.tmdb.org/t/p/w500${movie.poster_path}`);
    }
  });

  const markupMoviesList = movies
    .map(movie => {
      const markup = `
                    <li class="movie-card__item" id="${movie.id}" data-type="${
        movie.media_type
      }" data-modal-open>
                        <div class="movie-card__link">
                            <img class="movie-card__image" src="${
                              movie.poster_path
                            }" alt="${movie.original_title}"  />
                                <div class="info">
                                    <p class="info__item">${
                                      movie.original_title
                                    }</p>
                                    <p class="info__about-item">${
                                      movie.genre_ids
                                    }</p>
                                    <p class="info__about-item">${movie.release_date.slice(
                                      0,
                                      4
                                    )}</p>
                                    <p class="info__about-item info__about-item--color-reverse">${movie.vote_average.toFixed(
                                      1
                                    )}</p>
                                </div>
                        </div>
                    </li>
                
                `;
      return markup;
    })
    .join('');

  refs.moviesList.innerHTML = markupMoviesList;

  // removing empty info__about-item
  document.querySelectorAll('.info__about-item').forEach(item => {
    if (item.textContent === '') {
      item.style.display = 'none';
    }
  });
};
