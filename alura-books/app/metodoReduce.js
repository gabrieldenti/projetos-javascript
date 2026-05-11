function calcularValorTotalDeLivros(listalivros){
    const somaPrecoLivros = listalivros.reduce((acc, livro) => {
        if(livro.quantidade <= 0){
            return acc;
        }

        return acc + livro.preco;

    }, 0).toFixed(2);

    return somaPrecoLivros;
}