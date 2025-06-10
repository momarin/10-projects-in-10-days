/* ----------------------------------------------------------------------- */
// CONFIGURAÇÕES GERAIS DA API
const API_KEY = "{your_key_here}";
const LANGUAGE = "pt-BR";
const REGION = "BR";
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=${LANGUAGE}&region=${REGION}`;
const IMAGE_PATH = "https://image.tmdb.org/t/p/w1280";
// para o input de busca
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key={your_key_here}&query=";
/* ----------------------------------------------------------------------- */

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

// inicializando filmes por popularidade
getMovies(API_URL);

async function getMovies(url) {
  const response = await fetch(url);
  const responseData = await response.json();
  
  console.log(responseData);
  showMovies(responseData.results);
}

function showMovies(movies) {
    //limpando o main
    main.innerHTML = '';

    movies.forEach((movie) => {
    const { poster_path, title, vote_average, overview } = movie;
    
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
        <img
            src="${IMAGE_PATH + poster_path}"
            alt="${title}"
        />
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
        <h4>Sinopse: </h4>
            ${overview}</div>
        `;
    main.appendChild(movieEl);
  });
}

function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  searchTerm = search.value;

  if(searchTerm) {
    getMovies(SEARCHAPI + searchTerm);
    search.value = '';
  }
});
