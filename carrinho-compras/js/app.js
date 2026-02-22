let totalGeral;
limpar();

function adicionar(){

    let produto =  document.getElementById('produto').value;
    let quantidade = document.getElementById('quantidade').value;
    
    // Verificar se o produto selecionado é válido
    if (!produto || produto.trim() === "") {
        alert("Selecione um produto válido.");
        return;
    }


    // Verificar se a quantidade inserida é válida
    if (isNaN(quantidade) || quantidade <= 0) {
        alert("Insira uma quantidade válida.");
        return;
    }


    let nomeProduto = produto.split('-')[0];
    let valorProduto = produto.split('R$')[1];
    let valorQuantidade = quantidade * valorProduto;




    let listaCarrinho = document.getElementById('lista-produtos');
    listaCarrinho.innerHTML = listaCarrinho.innerHTML + `<section class="carrinho__produtos__produto">
          <span class="texto-azul">${quantidade}x</span> ${nomeProduto} <span class="texto-azul">${valorProduto}</span>
        </section>`;
    
    totalGeral = totalGeral + valorQuantidade;
    
    let valorTotal = document.getElementById('valor-total');
    valorTotal.textContent = totalGeral;
    document.getElementById('quantidade').value = 0;
}

function limpar(){

    totalGeral = 0;
    document.getElementById('lista-produtos').innerHTML = '';
    document.getElementById('valor-total').innerHTML = 'R$0';
}