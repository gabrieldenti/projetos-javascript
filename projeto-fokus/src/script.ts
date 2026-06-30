// Tipagem dos elementos do DOM
const html = document.querySelector("html") as HTMLHtmlElement;
const BtFoco = document.querySelector(".app__card-button--foco") as HTMLButtonElement;
const BtDescanso = document.querySelector(".app__card-button--curto") as HTMLButtonElement;
const BtLongo = document.querySelector(".app__card-button--longo") as HTMLButtonElement;
const imagem = document.querySelector(".app__image") as HTMLImageElement;
const frase = document.querySelector(".app__title") as HTMLElement;
const botoes = document.querySelectorAll(".app__card-button") as NodeListOf<HTMLButtonElement>;
const btMusica = document.getElementById("alternar-musica") as HTMLInputElement;
const btStartPause = document.getElementById("start-pause") as HTMLButtonElement;
const btIniciarOuPausar = document.querySelector("#start-pause span") as HTMLElement;
const btImagemP = document.querySelector(".app__card-primary-butto-icon") as HTMLImageElement;
const temporizador = document.getElementById("timer") as HTMLElement;

// Instâncias de Áudio
const musica: HTMLAudioElement = new Audio("./sons/luna-rise-part-one.mp3");
const pausa: HTMLAudioElement = new Audio("./sons/pause.mp3");
const play: HTMLAudioElement = new Audio("./sons/play.wav");
const alerta: HTMLAudioElement = new Audio("./sons/beep.mp3");
musica.loop = true;

// Variáveis de controle com tipos explícitos
let tempoEmSegundos: number = 1500;
let tempoOriginal: number = tempoEmSegundos;
let intervaloId: number | null = null; // No navegador, o setInterval retorna um number

btMusica.addEventListener("change", () => {
  if (musica.paused) {
    musica.play();
  } else {
    musica.pause();
  }
});

// Criamos um tipo específico para os contextos possíveis
type ContextoObjeto = "foco" | "descanso-curto" | "descanso-longo";

function alterarContexto(contexto: ContextoObjeto): void {
  IniciarContagem();
  botoes.forEach((botao) => botao.classList.remove("active"));
  html.setAttribute("data-contexto", contexto);
  imagem.setAttribute("src", `./imagens/${contexto}.png`);
  
  switch (contexto) {
    case "foco":
      frase.innerHTML =
        'Otimize sua produtividade,<br><strong class="app__title-strong">mergulhe no que importa.</strong>';
      break;
    case "descanso-curto":
      frase.innerHTML =
        'Que tal dar uma respirada?<br><strong class="app__title-strong">Faça uma pausa curta!</strong>';
      break;
    case "descanso-longo":
      frase.innerHTML =
        'Hora de voltar à superfície.<br><strong class="app__title-strong">Faça uma pausa longa.</strong>';
      break;
    default:
      break;
  }
}

const contagemRegressiva = (): void => {
  if (tempoEmSegundos <= 0) {
    alerta.play();
    alert("Tempo esgotado!");
    tempoEmSegundos = tempoOriginal;
    IniciarContagem();
    
    const focoAtivo: boolean = html.getAttribute("data-contexto") === "foco";
    if (focoAtivo) {
      const evento = new CustomEvent("FocoFinalizado"); //- cria um evento personalizado
      document.dispatchEvent(evento); // -> dispara o evento personalizado para que outros componentes possam ouvir e reagir a ele.
    }
    zerarContagem();
    return;
  }
  tempoEmSegundos -= 1;
  IniciarContagem();
};

function iniciarOuPausarContagem(): void {
  if (intervaloId) {
    pausa.play();
    zerarContagem();
    return;
  }
  play.play();
  // Usamos window.setInterval para garantir o retorno do tipo 'number' do browser
  intervaloId = window.setInterval(contagemRegressiva, 1000);
  btIniciarOuPausar.textContent = "Pausar";
  btImagemP.setAttribute("src", "./imagens/pause.png");
}

function zerarContagem(): void {
  if (intervaloId) {
    clearInterval(intervaloId);
  }
  btIniciarOuPausar.textContent = "Começar";
  intervaloId = null;
  btImagemP.setAttribute("src", "./imagens/play_arrow.png");
}

btStartPause.addEventListener("click", iniciarOuPausarContagem);

function IniciarContagem(): void {
  const tempo = new Date(tempoEmSegundos * 1000);
  const tempoFormatado = tempo.toLocaleTimeString("pt-Br", {
    minute: "2-digit",
    second: "2-digit",
  });
  temporizador.innerHTML = `${tempoFormatado}`;
}

// Inicialização da tela
IniciarContagem();

BtFoco.addEventListener("click", () => {
  tempoOriginal = 1500;
  tempoEmSegundos = tempoOriginal;
  alterarContexto("foco");
  BtFoco.classList.add("active");
});

BtDescanso.addEventListener("click", () => {
  tempoOriginal = 300;
  tempoEmSegundos = tempoOriginal;
  alterarContexto("descanso-curto");
  BtDescanso.classList.add("active");
});

BtLongo.addEventListener("click", () => {
  tempoOriginal = 900;
  tempoEmSegundos = tempoOriginal;
  alterarContexto("descanso-longo");
  BtLongo.classList.add("active");
});