import './sass/components/main.scss';
import { load } from './js/my-library/utils';
import { getAllLibraryMovies } from './js/my-library/helper';

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