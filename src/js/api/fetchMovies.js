import axios from 'axios';

const apiKey = '92be59e0090ddfe5570b8756c403476a';

export class FetchApiMovies {
  constructor() {
    this.page = 1;
  }

async getTrending () {
    axios.defaults.baseURL = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`;
    const response = await axios.get(`${axios.defaults.baseURL}`);
    return response.data;
};

async getSearch (query, page) {
  axios.defaults.baseURL = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&page=${page}&language=en-US`;
  const response = await axios.get(`${axios.defaults.baseURL}`);
  return response.data;
};

async getMovieDetails (movie_id) {
    axios.defaults.baseURL = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${apiKey}&language=en-US`;
    const response = await axios.get(`${axios.defaults.baseURL}`);
    return response.data;
  };
}