const botoes = document.querySelectorAll('.btn');

botoes.forEach(botao => botao.addEventListener('click', filtrarLivros))

function filtrarLivros (){
    let elementoBtn = document.getElementById(this.id);
    const categoria = elementoBtn.value;
    let livrosFiltrados = categoria == 'disponivel' ? livros.filter(livro => livro.quantidade > 0) : livros.filter(livro => livro.categoria === categoria);
    exibirOsLivros(livrosFiltrados);
        const valorTotal = calcularValorTotalDeLivros(livrosFiltrados);
        exibirValorTotalDosLivros(valorTotal);
}


function exibirValorTotalDosLivros(valor){
    elementoValorTotalLivros.innerHTML = `<div class="livros__disponiveis">
      <p>Todos os livros disponíveis por R$ <span id="valor">${valor}</span></p>
    </div>`
}