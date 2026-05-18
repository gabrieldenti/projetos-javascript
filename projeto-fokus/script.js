const html = document.querySelector('html');
const BtFoco = document.querySelector(".app__card-button--foco");
const BtDescanso = document.querySelector(".app__card-button--curto");
const BtLongo = document.querySelector(".app__card-button--longo");
const imagem = document.querySelector(".app__image");
const frase = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const btMusica = document.getElementById('alternar-musica');
const btStartPause = document.getElementById('start-pause');
const btIniciarOuPausar = document.querySelector('#start-pause span');
const btImagemP = document.querySelector('.app__card-primary-butto-icon');
const temporizador = document.getElementById('timer');



const musica = new Audio('./sons/luna-rise-part-one.mp3');
const pausa = new Audio('./sons/pause.mp3');
const play = new Audio('./sons/play.wav');
const alerta = new Audio('./sons/beep.mp3');
musica.loop = true;

let tempoEmSegundos = 1500;
let intervaloId = null;


btMusica.addEventListener('change', () => {
    if(musica.paused){
        musica.play();
    } else {
        musica.pause();
    }
});

function alterarContexto(contexto) {
    IniciarContagem();
    botoes.forEach(botao => botao.classList.remove('active'));
    html.setAttribute('data-contexto', `${contexto}`);
    imagem.setAttribute('src', `./imagens/${contexto}.png`);
    switch(contexto){
        case 'foco':
            frase.innerHTML = 'Otimize sua produtividade,<br><strong class="app__title-strong">mergulhe no que importa.</strong>';
            break;
        case 'descanso-curto':
            frase.innerHTML = 'Que tal dar uma respirada?<br><strong class="app__title-strong">Faça uma pausa curta!</strong>';
            break;
        case 'descanso-longo':
            frase.innerHTML = 'Hora de voltar à superfície.<br><strong class="app__title-strong">Faça uma pausa longa.</strong>';
            break;
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if(tempoEmSegundos <= 0){
        alerta.play();
        alert('Tempo esgotado!');
        const focoAtivo = html.getAttribute('data-contexto') == 'foco';
        if(focoAtivo){
            const evento = new CustomEvent('FocoFinalizado'); //- cria um evento personalizado
            document.dispatchEvent(evento); // -> dispara o evento personalizado para que outros componentes possam ouvir e reagir a ele.
        }
        zerarContagem();
        return;
    }
    tempoEmSegundos -= 1;
    IniciarContagem();
}

function iniciarOuPausarContagem() {
    if(intervaloId){
        pausa.play();
        zerarContagem();
        return;
    }
    play.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    btIniciarOuPausar.textContent = 'Pausar';
    btImagemP.setAttribute('src', './imagens/pause.png');

}

function zerarContagem() {
    clearInterval(intervaloId);
    btIniciarOuPausar.textContent = 'Começar';
    intervaloId = null;
    btImagemP.setAttribute('src', './imagens/play_arrow.png');
}

btStartPause.addEventListener('click', iniciarOuPausarContagem);


function IniciarContagem() {
    const tempo = new Date(tempoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    temporizador.innerHTML = `${tempoFormatado}`;
}

IniciarContagem();

BtFoco.addEventListener('click' , () => {
    tempoEmSegundos = 1500;
    alterarContexto('foco');
    BtFoco.classList.add('active');
});

BtDescanso.addEventListener('click' , () => {
    tempoEmSegundos = 300;
    alterarContexto('descanso-curto');
    BtDescanso.classList.add('active');
});

BtLongo.addEventListener('click' , () => {
    tempoEmSegundos = 900;
    alterarContexto('descanso-longo');
    BtLongo.classList.add('active');

});
