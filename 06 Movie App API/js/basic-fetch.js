/* ----------------------------------------------------------------------- */
// CONFIGURAÇÕES DA API
const API_KEY = '7b58c21540537ddf08ae663041815eb7';
const API_URL = 'https://api.themoviedb.org/3';
const LANGUAGE = 'pt-BR';
const REGION = 'BR';
/* ----------------------------------------------------------------------- */

async function buscarFilmesPopulares() {
    const resposta = await fetch(`${API_URL}/movie/popular?api_key=${API_KEY}&language=${LANGUAGE}®ion=${REGION}`);
    
    const dados = await resposta.json();
    return dados.results;
}
async function buscarFilmePorId(id) {
  const resposta = await fetch(
    `${API_URL}/movie/${id}?api_key=${API_KEY}&language=${LANGUAGE}`
  );
  return await resposta.json();
}

async function buscarFilmesPorTermo(termo) {
  const resposta = await fetch(
    `${API_URL}/search/movie?api_key=${API_KEY}&language=${LANGUAGE}&query=${encodeURIComponent(termo)}`
  );
  const dados = await resposta.json();
  return dados.results;
}

/* ----------------------------------------------------------------------- */
// EXEMPLO DE USO (com textos em português)

async function mostrarFilmesPopulares() {
  const filmes = await buscarFilmesPopulares();
  
  filmes.forEach(filme => {
    console.log(`
      Título: ${filme.title}
      Sinopse: ${filme.overview || 'Sinopse não disponível'}
      Avaliação: ${filme.vote_average}/10
      Data de Lançamento: ${filme.release_date || 'Não informada'}
    `);
  });
}

// Chama a função para testar
mostrarFilmesPopulares();