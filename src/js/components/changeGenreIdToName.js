import { getGenresIdsList } from '../api/getGenresIdsList';

export function changeGenreIdToName(movies, genresList) {
  console.log('changeGenreIdToName()');
  movies.forEach(movie => {
    const genres = movie.genre_ids.map(genreId => {
      const genreName = genresList.find(genre => genre.id === genreId);
      return `<a href="#"> ${genreName.name}</a>`;
    });
    movie.genre_ids = genres;
  });
}
