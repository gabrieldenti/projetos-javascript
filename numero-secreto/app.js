/* alert("Boas vindas ao jogo de numero secreto");
let intervaloDeNumero = 100;
let numeroSecreto = parseInt(Math.random() * intervaloDeNumero + 1);
let chute;
let tentativas = 1;

while(chute != numeroSecreto){
    chute = prompt(`Escolha um numero de 1 a ${intervaloDeNumero}`);
    
        if(chute == numeroSecreto) {
            break;
        } else {
                if (chute > numeroSecreto) {
                    alert(`O numero secreto é menor que ${chute}`);
                } else { 
                    alert(`O numero secreto é maior que ${chute}`);
                }
                tentativas++;
        }
}

let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
alert(`Você acertou o numero secreto: ${numeroSecreto} com ${tentativas} ${palavraTentativa}.`);
*/

// let titulo = document.querySelector('h1'); // -> seleciona um documento do html
// titulo.innerHTML = 'Jogo do número secreto'; // acessa o elemento(tag) html(dentro do html)

// let paragrafo = document.querySelector('p');
// paragrafo.innerHTML = 'Escolha um número entre 1 e 10';

let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1; 


function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2}); //-> habilita o script responsive voice 
}
function exibirMensagemInicial(){

    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um numero de 1 a 10.');
}

exibirMensagemInicial();

function gerarNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosLista = listaDeNumerosSorteados.length;

    if(quantidadeDeElementosLista == numeroLimite){
        listaDeNumerosSorteados = [];
    }

    if(listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    }else{
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function verificarChute(){
    let chute = document.querySelector('input').value;
    if(chute == numeroSecreto){
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        exibirTextoNaTela('h1', 'Acertou!!!');
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }else{
        if(chute > numeroSecreto){
            exibirTextoNaTela('p' , `O número secreto é menor que ${chute}`);
        }
        else{
            exibirTextoNaTela('p' , `O número secreto é maior que ${chute}`);
        }
        tentativas++;
        limparCampo();
    }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true); //-> seta o disabled a cada vez que renicia o jogo.

}