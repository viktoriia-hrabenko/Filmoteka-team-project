import { refs } from '../refs/refs';
import { getGenresIdsList } from '../api/getGenresIdsList';
import { FetchApiMovies } from '../api/fetchMovies';
import { renderMoviesList } from '../templates/renderMovies';
import { Loader } from './loader';


export function addToggleModal() {
  const refsModal = {
    modalClose: document.querySelector('[data-modal-close]'),
    modalData: document.querySelector('.modal-movie__backdrop'),
  };

  function toggleModal() {
    refsModal.modalData.classList.toggle('modal-movie__backdrop--is-hidden');
  }

  document.querySelectorAll('[data-modal-open]').forEach(modal => {
    modal.addEventListener('click', toggleModal);
  });

  refsModal.modalClose.addEventListener('click', toggleModal);

  // document
  //   .querySelector('[data-modal-close]')
  //   .addEventListener('click', toggleModal);
}


const modalMoviePoster = document.querySelector('.modal-movie__poster--img');

const modalMovieTitle = document.querySelector('.modal-movie__title');

const modalMovieVote = document.querySelector('.modal-movie__vote');
const modalMovieVotes = document.querySelector('.modal-movie__votes');
const modalMoviePopularity = document.querySelector('.modal-movie__popularity');
const modalMovieOriginalTitle = document.querySelector('.modal-movie__original-title');
const modalMovieGenre = document.querySelector('.modal-movie__genre');

const modalMovieDescription = document.querySelector('.modal-movie__text');

const modalMovieButtonWatched = document.querySelector('.modal-movie__button--watched');
const modalMovieButtonQueued = document.querySelector('.modal-movie__button--queue');

const createModalMovie = document.querySelectorAll('.movie-card__item');
createModalMovie.forEach (movie => {
    movie.addEventListener('click', event => {

            modalMoviePoster.src = '';
            modalMovieTitle.innerHTML = '';
            modalMovieVote.innerHTML = '';
            modalMovieVotes.innerHTML = '';
            modalMoviePopularity.innerHTML = '';
            modalMovieOriginalTitle.innerHTML = '';
            modalMovieGenre.innerHTML = '';
            modalMovieDescription.innerHTML = '';

            modalMovieButtonWatched.dataset.id = '';
            modalMovieButtonQueued.dataset.id = '';

      event.preventDefault();

      const movieId = movie.dataset.id;
      const movieData = getMovieDetails(movieId);
      
      MovieModalMurkup(movieData);
    });
  })
  

  function MovieModalMurkup ({id, poster_path, title, original_title, popularity, overview, genres, vote_average, vote_count,}) {
    return
        modalMoviePoster.src=`https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        modalMovieTitle.innerHTML = `${movie.title}`;
        modalMovieVote.innerHTML = `${movie.vote_average}`;
        modalMovieVotes.innerHTML = `${movie.vote_count}`;
        modalMoviePopularity.innerHTML = `${movie.popularity}`;
        modalMovieOriginalTitle.innerHTML = `${movie.original_title}`;
        modalMovieGenre.innerHTML = `${movie.genres.map(genre => genre.name).join(', ')}`;
        modalMovieDescription.innerHTML = `${movie.overview}`;
  
        modalMovieButtonWatched.dataset.id = movie.id;
        modalMovieButtonQueued.dataset.id = movie.id;
  };



