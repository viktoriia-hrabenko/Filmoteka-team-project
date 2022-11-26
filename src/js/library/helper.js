import { FetchApiMovies } from "../api/fetchMovies";
import { renderMoviesList } from "../templates/renderMovies";
import { refs } from "../refs/refs";

//import { } from "../components/modal";

export const getAllLibraryMovies = async (libraryList, listType) => {
  let moviesList = [];
  refs.moviesList.innerHTML = '';
  listType === 'watchedList'
    ? refs.moviesList.setAttribute('data-listtype', 'watched')
    : refs.moviesList.setAttribute('data-listtype', 'queue');
  const tempObj = [];

  if (libraryList != undefined) {
    for (const movie of libraryList) {
      let response = await FetchApiMovies.getMovieDetails(movie_id).then(res => res);
      response = {
        ...response,
        genre_ids: [...response.genres.map(genre => genre.id)]
      };
      tempObj.push(response);
    }
    moviesList = [...tempObj];
    renderMoviesList(moviesList);
   //funlcja z modal.js 
  }
};
