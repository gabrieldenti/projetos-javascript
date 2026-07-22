
function tocaSom(idElementoAudio) {

    const elemento = document.querySelector(idElementoAudio); //seleciona o elemento de áudio

    if(elemento === null) { //verifica se o elemento é nulo, ou seja, se não foi encontrado
        alert('Elemento não encontrado'); //exibe um alerta informando que o elemento não foi encontrado
    }else if(elemento.localName === 'audio' && elemento != null) { //verifica se o elemento é um áudio e se não é nulo, ou seja, se foi encontrado e é do tipo correto
        elemento.play(); //play() é um método do objeto de áudio que executa o som
    }
}

const listaDeTeclas = document.querySelectorAll('.tecla'); //retorna uma lista de elementos que possuem a classe 'tecla'



for(let contador = 0; contador < listaDeTeclas.length; contador++) {

    const tecla = listaDeTeclas[contador] ; //classList é uma propriedade que retorna uma coleção de todas as classes do elemento, e [1] acessa a segunda classe (tecla_pom, tecla_clap, etc)
    const som = tecla.classList[1]; //classList é uma propriedade que retorna uma coleção de todas as classes do elemento, e [1] acessa a segunda classe (tecla_pom, tecla_clap, etc)
    const idAudio = `#som_${som}`; //template string que cria o id do elemento de áudio correspondente à tecla

    tecla.onclick = function() { //onclick é um evento que ocorre quando o elemento é clicado, e a função atribuída a ele é executada quando isso acontece
        tocaSom(idAudio);
    }

    tecla.onkeydown = function(evento) { //onkeydown é um evento que ocorre quando uma tecla é pressionada, e a função atribuída a ele é executada quando isso acontece
        if(evento.code === 'Enter' || evento.code === 'Space') { //evento.code é uma propriedade que retorna o código da tecla pressionada, e a condição verifica se é Enter ou Space
            tecla.classList.add('ativa'); //classList.add() é um método que adiciona a classe 'ativa' ao elemento, o que pode ser usado para aplicar estilos CSS
        }
    };

    tecla.onkeyup = function() { //onkeyup é um evento que ocorre quando uma tecla é liberada, e a função atribuída a ele é executada quando isso acontece
        tecla.classList.remove('ativa'); //classList.remove() é um método que remove a classe 'ativa' do elemento, o que pode ser usado para remover estilos CSS
    };

};   