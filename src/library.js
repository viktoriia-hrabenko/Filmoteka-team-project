import './sass/index.scss';
import { load } from './js/library/localStorage';
import { getAllLibraryMovies } from './js/library/helper';

const watchedButton = document.querySelector('[js-btn-watched]');
const queueButton = document.querySelector('[js-btn-queue]');

let libraryList = load('watchedList');

watchedButton.addEventListener('click', () => {
  queueButton.classList.remove('library__btn--selected');
  watchedButton.classList.add('library__btn--selected');
  libraryList = load('watchedList');
  getAllLibraryMovies(libraryList, 'watchedList');
});
queueButton.addEventListener('click', () => {
  watchedButton.classList.remove('library__btn--selected');
  queueButton.classList.add('library__btn--selected');
  libraryList = load('queueList');
  getAllLibraryMovies(libraryList, 'queueList');
});

getAllLibraryMovies(libraryList, 'watchedList');