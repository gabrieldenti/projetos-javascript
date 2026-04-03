const mensagemListaVazia = document.querySelector('.mensagem-lista-vazia'); //-> Seleciona o elemento que exibe a mensagem de lista vazia

export default function verificarListaVazia(listaDeCompras) {
    const itensNaLista = listaDeCompras.querySelectorAll('li'); //-> Seleciona todos os elementos li dentro da lista de compras
    if(itensNaLista.length === 0) { //-> Verifica se não há itens na lista
        mensagemListaVazia.style.display = 'block'; //-> Exibe a mensagem de lista vazia
    } else {
        mensagemListaVazia.style.display = 'none'; //-> Oculta a mensagem de lista vazia
    }

}