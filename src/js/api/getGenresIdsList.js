import { FetchApiMovies } from './fetchMovies';

const fetchApiMovies = new FetchApiMovies();

export const getGenresIdsList = async () => {
  const response = await fetchApiMovies.getGenresIdsList();
  const genres = await response.genres;
  return genres;
};
