/* --------------------------------------------------------------------------- */
SOBRE O IMAGE-PATH;
Na documentação oficial do TMDB, explica-se que:
    - Todas as imagens (pôsteres, banners, etc.) seguem um padrão de URL.
    - O formato é:
        - https://image.tmdb.org/t/p/{TAMANHO}/{CAMINHO_DO_ARQUIVO}
        - Onde:
            - {TAMANHO}: Define a largura da imagem (ex: w500 para 500px de largura).
            - {CAMINHO_DO_ARQUIVO}: É o valor de poster_path ou backdrop_path retornado no JSON.

Como funciona no seu JSON?
    No objeto de cada filme, você tem campos como:
        {
            "poster_path": "/q6725aR8Zs4IwGMXzZT8aC8lh41.jpg",
            "backdrop_path": "/fEv3l1XQndrAfq5V0OeZ8LtK5t9.jpg"
        }

Para montar a URL completa, é preciso:
    1. Pôster (capa do filme):
        const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`; onde w500 = largura de 500px (você pode usar w1280 para imagens maiores).
    2. Backdrop (imagem de fundo):
        const backdropUrl = `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`;

Exemplo Prático no Seu Código
    Se você quiser mostrar os pôsteres dos filmes em uma página HTML:
        getMovies()
            .then(data => {
                const moviesContainer = document.getElementById('filmes');
                data.results.forEach(movie => {
                const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
                moviesContainer.innerHTML += `
                    <div class="filme">
                    <img src="${posterUrl}" alt="${movie.title}">
                    <h3>${movie.title}</h3>
                    </div>
                `;
            });
        });
/* --------------------------------------------------------------------------- */