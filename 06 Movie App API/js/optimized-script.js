/* ----------------------------------------------------------------------- */
// CONFIGURAÇÕES DA API
const API_KEY = '';
const API_URL = 'https://api.themoviedb.org/3';
const LANGUAGE = 'pt-BR';
const REGION = 'BR';
const IMAGE_PATH = 'https://image.tmdb.org/t/p/w1280';
/* ----------------------------------------------------------------------- */

// Elementos DOM
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

// Inicializa com filmes populares
getPopularMovies();

/* ----------------------------------------------------------------------- */
// FUNÇÕES DA API

async function fetchPopularMovies() {
    const response = await fetch(`${API_URL}/movie/popular?api_key=${API_KEY}&language=${LANGUAGE}®ion=${REGION}`);
    const data = await response.json();
    return data.results;
}

async function searchMovies(term) {
    const response = await fetch(
        `${API_URL}/search/movie?api_key=${API_KEY}&language=${LANGUAGE}&query=${encodeURIComponent(term)}`
    );
    const data = await response.json();
    return data.results;
}

/* ----------------------------------------------------------------------- */
// FUNÇÕES DE EXIBIÇÃO

async function getPopularMovies() {
    const movies = await fetchPopularMovies();
    displayMovies(movies);
}

async function performSearch(searchTerm) {
    if (!searchTerm) return;
    
    const movies = await searchMovies(searchTerm);
    displayMovies(movies);
}

function displayMovies(movies) {
    main.innerHTML = '';
    
    movies.forEach((movie) => {
        const { poster_path, title, vote_average, overview } = movie;
        
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
            <img src="${IMAGE_PATH + poster_path}" alt="${title}" />
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getRatingClass(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h4>Sinopse: </h4>
                ${overview || 'A sinopse deste filme ainda não está disponível em português.'}
            </div>
        `;
        main.appendChild(movieEl);
    });
}

function getRatingClass(vote) {
    if (vote >= 8) return 'green';
    if (vote >= 5) return 'orange';
    return 'red';
}

/* ----------------------------------------------------------------------- */
// EVENT LISTENERS

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = search.value.trim();
    
    if (searchTerm) {
        performSearch(searchTerm);
        search.value = '';
    }
});