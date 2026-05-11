let livros = [];
const endPointAPI = 'https://guilhermeonrails.github.io/casadocodigo/livros.json';

getBuscarLivrosDaAPI();

async function getBuscarLivrosDaAPI(){
    const resposta = await fetch(endPointAPI);
    livros = await resposta.json();
    let livrosComDesconto = aplicarDesconto(livros);
    exibirOsLivros(livrosComDesconto);
    
}
