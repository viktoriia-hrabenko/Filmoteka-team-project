import { refs } from '../refs/refs';

export { renderMoviesList };

const renderMoviesList = (movies) => {
    refs.moviesList.innerHTML = '';
    const markupMoviesList = movies
        .map(movie => {
            const markup = `
                <div class="movie-card">
                    <li class="movie-card__item" id="${movie.id}">
                        <a class="movie-card__link>
                            <img class="movie-card__image"src="${movie.poster_path}" alt="${movie.title}" />
                                <div class="info">
                                    <p class="info__item">${movie.original_title}</p>
                                    <p class="info__item">${movie.genres}</p>
                                    <p class="info__item">${movie.release_date}</p>
                                </div>
                        </a>
                    </li>
                <div> 
                `;
            return markup;
        })
        .join("");
    
    refs.moviesList.insertAdjacentHTML('beforeend', markupMoviesList);
}