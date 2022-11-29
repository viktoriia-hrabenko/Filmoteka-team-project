import { refs } from '../refs/refs';
import { getGenresIdsList } from '../api/getGenresIdsList';
import { FetchApiMovies } from '../api/fetchMovies';
import { renderMoviesList } from '../templates/renderMovies';
import { load } from '../library/localStorage';
import { addToLibrary } from '../library/localStorage';
import { removeFromLibrary } from '../library/localStorage';
import { getAllLibraryMovies } from '../library/helper';
import { Loader } from './loader';

const loader = new Loader();
const fetchApiMovies = new FetchApiMovies();
const noPoster = new URL('../../images/no-poster.jpg', import.meta.url);

export function addToggleModal() {
  const refsModal = {
    modalOpen: document.querySelectorAll('[data-modal-open]'),
    modalClose: document.querySelector('[data-modal-close]'),
    modalBackdrop: document.querySelector('.modal-movie__backdrop'),
  };

  function addModalListener() {
    refsModal.modalBackdrop.classList.remove(
      'modal-movie__backdrop--is-hidden'
    );
    window.addEventListener('keydown', onEscKeyPress);
    loader.on();
  }

  function removeModalListener() {
    refsModal.modalBackdrop.classList.add('modal-movie__backdrop--is-hidden');
  }

  function onBackdropClick(event) {
    if (event.target != event.currentTarget) {
      return;
    }
    removeModalListener();
  }

  function onEscKeyPress(event) {
    if (event.code === 'Escape') {
      removeModalListener();
    }
  }

  refsModal.modalOpen.forEach(modal => {
    modal.addEventListener('click', addModalListener);
  });

  refsModal.modalClose.addEventListener('click', removeModalListener);

  refsModal.modalBackdrop.addEventListener('click', onBackdropClick);
  MovieModalCreate();
}

const modalMoviePoster = document.querySelector('.modal-movie__poster--img');
const modalMovieTitle = document.querySelector('.modal-movie__title');
const modalMovieVote = document.querySelector('.modal-movie__vote');
const modalMovieVotes = document.querySelector('.modal-movie__votes');
const modalMoviePopularity = document.querySelector('.modal-movie__popularity');
const modalMovieOriginalTitle = document.querySelector(
  '.modal-movie__original-title'
);
const modalMovieGenre = document.querySelector('.modal-movie__genre');
const modalMovieDescription = document.querySelector('.modal-movie__text');
const modalMovieButtonWatched = document.querySelector(
  '.modal-movie__button--watched'
);
const modalMovieButtonQueued = document.querySelector(
  '.modal-movie__button--queue'
);

function MovieModalCreate() {
  const createModalMovie = document.querySelectorAll('.movie-card__item');

  createModalMovie.forEach(movie => {
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

      const movieId = movie.id;
      const movieData = fetchApiMovies.getMovieDetails(movieId);

      movieData.then(value => {
        MovieModalMurkup(value);
      });
      loader.off();
    });

    let onWatched = false;
    let onQueue = false;

    load('watchedList')?.forEach(movies => {
      if (movies.id == movie.id) {
        onWatched = true;
      }
    });

    load('queueList')?.forEach(movies => {
      if (movies.id == movie.id) {
        onQueue = true;
      }
    });

    let watchedBtn = document.querySelector('.modal-movie__button--watched');
    let queueBtn = document.querySelector('.modal-movie__button--queue');

    if (onWatched) {
      watchedBtn.innerHTML = 'On List';
    }
    if (onQueue) {
      queueBtn.innerHTML = 'On List';
    }

    const checkIfOnList = (button, listType, listTypeText) => {
      let watched;
      if (listTypeText == undefined) return;
      if (listTypeText === 'watched') {
        watched = onWatched;
      } else if (listTypeText === 'queue') {
        watched = onQueue;
      }
      if (watched) {
        removeFromLibrary(movie.id, listType);
        button.innerHTML = `Add to ${listTypeText}`;
        queueBtn.disabled = false;
        watchedBtn.disabled = false;
      } else {
        addToLibrary(movie.id, listType);
        button.innerHTML = `Added`;
        button.style.color = '#8C8C8C';
      }
      if (listTypeText === 'watched') {
        onWatched = !onWatched;
        watchedBtn.disabled = true;
        queueBtn.disabled = true;
      } else if (listTypeText === 'queue') {
        onQueue = !onQueue;
        queueBtn.disabled = true;
        watchedBtn.disabled = true;
      }
    };

    watchedBtn.addEventListener('click', () => {
      checkIfOnList(watchedBtn, 'watchedList', 'watched');
      if (
        document.location.href.includes('library') &&
        refs.moviesList.dataset.listtype === 'watched'
      ) {
        let tempLibraryList = load('watchedList');
        getAllLibraryMovies(tempLibraryList, 'watchedList');
      }
    });
    queueBtn.addEventListener('click', () => {
      checkIfOnList(queueBtn, 'queueList', 'queue');
      if (
        document.location.href.includes('library') &&
        refs.moviesList.dataset.listtype === 'queue'
      ) {
        let tempLibraryList = load('queueList');
        getAllLibraryMovies(tempLibraryList, 'queueList');
      }
    });
  });
}

function MovieModalMurkup({
  id,
  poster_path,
  title,
  original_title,
  popularity,
  overview,
  genres,
  vote_average,
  vote_count,
}) {
  // checking and setting the default poster
  if (poster_path === null) {
    poster_path = noPoster;
  } else {
    poster_path = `https://image.tmdb.org/t/p/w500${poster_path}`;
  }

  modalMoviePoster.src = poster_path;
  modalMovieTitle.innerHTML = title;
  modalMovieVote.innerHTML = vote_average.toFixed(1);
  modalMovieVotes.innerHTML = vote_count;
  modalMoviePopularity.innerHTML = popularity.toFixed(1);
  modalMovieOriginalTitle.innerHTML = original_title;
  modalMovieGenre.innerHTML = genres.map(genre => genre.name).join(', ');
  modalMovieDescription.innerHTML = overview;
  modalMovieButtonWatched.dataset.id = id;
  modalMovieButtonQueued.dataset.id = id;
}
