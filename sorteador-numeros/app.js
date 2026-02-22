
function Sortear(){
    let quantidade = parseInt(document.getElementById('quantidade').value);
    let de = parseInt(document.getElementById('de').value);
    let ate = parseInt(document.getElementById('ate').value);

    if(de >= ate){
        alert('Insira um valor menor no campo do numero');
        return;
    }

    let sorteados = [];

    if(quantidade > (ate - de + 1)){
        alert("Escolha um intervalo maior de numeros para sortear!");
        return;
    }


    for(let i = 0; i < quantidade; i++){
        let numero = obterNumeroAleatorio(de, ate);

        while(sorteados.includes(numero)){
           numero = obterNumeroAleatorio(de, ate);
        }
        sorteados.push(numero);
    }
    exibirTexto('resultado', `<label class="texto__paragrafo">Números sorteados:  ${sorteados}</label>`);
    alterarStatusBotao();
}

function alterarStatusBotao(){
    let botao = document.getElementById('btn-reiniciar')
    if(botao.classList.contains('container__botao-desabilitado')){ //-> acessa a classe do elemento html
        botao.classList.remove('container__botao-desabilitado')
        botao.classList.add('container__botao')
    }else{
        botao.classList.remove('container__botao')
        botao.classList.add('container__botao-desabilitado')
    }
}


function Reiniciar(){
    document.getElementById('quantidade').value = '';
    document.getElementById('de').value = '';
    document.getElementById('ate').value = '';
    exibirTexto('resultado', '<label class="texto__paragrafo">Números sorteados: nenhum até agora</label>')
    alterarStatusBotao();
}

function obterNumeroAleatorio(min, max){
   let numeroAleatorio =  parseInt(Math.random() * (max - min + 1) + min);
    return numeroAleatorio;

}

function exibirTexto(id, texto){
    let campo = document.getElementById(id);
    campo.innerHTML = texto; //textContent faz a mesma coisa que o innerHTML(usado para textos simples)
}