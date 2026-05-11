let btOrdenar = document.getElementById('btnOrdenarPorPreco');
btOrdenar.addEventListener('click', ordenarLivrosPreco);


function ordenarLivrosPreco(){
    let livrosOrdenados = livros.sort((a, b) => a.preco - b.preco);
    exibirOsLivros(livrosOrdenados);
    
}