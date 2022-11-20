const galleryOfMovies = document.querySelector('.movie__list');
const noPosterImage = require('../my-library/no-poster.jpg');



//links
const API_KEY = '92be59e0090ddfe5570b8756c403476a';
const BASE_URL = 'https://api.themoviedb.org/3';

const GENRE_MOVIE_LIST_URL = '/genre/movie/list';
const GENRE_TV_LIST_URL = '/genre/tv/list';

const fetchFirstLoadMovies = async page => {
  const response = await fetch(
    `${BASE_URL}${MAIN_PAGE_URL}${API_KEY}&page=${page}&include_adult=false`,
  );
  const firstLoadMovies = await response.json();
  return firstLoadMovies;
};

//pobrać film przez id
const fetchMovieById = async (movieId, type = 'movie') => {
  const response = await fetch(`${BASE_URL}/${type}/${movieId}${API_KEY}`);
  const responseObject = await response.json();
  return responseObject;
};


//stworzyć galerie filmów
let renderMoviesFirstLoad = async data => {
  const genreName = await getMovieGenresNames();
  galleryOfMovies.innerHTML = '';
  const markup = data
    .map(
      ({
        poster_path,
        title,
        name,
        genre_ids,
        release_date,
        first_air_date,
        vote_average,
        id,
        media_type,
        original_title,
        original_name,
      }) => {
        return `
                <li class="movie-card" data-id="${id}" data-type="${media_type}">
                    <img class="movie-card__img" src="${
                      poster_path != null
                        ? `https://image.tmdb.org/t/p/w500/${poster_path}`
                        : noPosterImage
                        }" alt="poster of '${title ? title : name}'"  loading="lazy"/>
                    <h2 class="movie-card__title">${title ? title : name}</h2>
                    <div class="movie-card__info">
                        <p class="movie-card__genre-and-year">
                            <span class="movie-card__genre">${genre_ids
                              .map(id => genreName[id])
                              .splice(0, 2)
                              .join(', ')}</span>
                            <span class="movie-card__year">| ${(release_date
                              ? release_date
                              : first_air_date
                              ? first_air_date
                              : 'no-data'
                            ).slice(0, 4)}</span>
                        </p>
                        <p class="movie-card__vote-average">${vote_average.toFixed(2)}</p>
                    </div>
                </li>
            `;
      },
    )
    .join('');
  return galleryOfMovies.insertAdjacentHTML('beforeend', markup);
};


//wszystkie gatunki
const getAllGenres = async () => {
  const responseGenresMovie = await fetch(
    `${BASE_URL}${GENRE_MOVIE_LIST_URL}${API_KEY}&language=en-US`,
  );
  const responseGenresTV = await fetch(`${BASE_URL}${GENRE_TV_LIST_URL}${API_KEY}&language=en-US`);

  const genresMovieList = await responseGenresMovie.json();
  const genresTVList = await responseGenresTV.json();

  const allGenresList = [
    ...new Map(
      [...genresMovieList.genres, ...genresTVList.genres].map(genre => [genre['id'], genre]),
    ).values(),
  ];
  allGenresListMain = allGenresList;
  return allGenresList;
};
let genreResponse;

let allGenresListMain;


//nazwy gatunków

const getMovieGenresNames = async () => {
  if (!genreResponse) {
    genreResponse = await getAllGenres();
  }
  return genreResponse.reduce((allGenres, genre) => {
    return { ...allGenres, [genre.id]: genre.name };
  }, {});
};

let printAllGenresList = () => {
  genresList.innerHTML = '';
  const markup = allGenresListMain
    .map(genre => {
      return `
                <div>
                    <ul>
                        <li class="genres">${genre}</li>
                    </ul>
                </div>
            `;
    })
    .join('');
  return genresList.insertAdjacentHTML('beforeend', markup);
};

printAllGenresList;


export {
  galleryOfMovies,
  fetchFirstLoadMovies,
  fetchMovieById,
  renderMoviesFirstLoad,
};