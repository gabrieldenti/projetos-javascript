function alterarStatus(id){

    
    let jogo = document.getElementById(`game-${id}`);
    let imagem = jogo.querySelector('div');
    if(imagem.classList.contains('dashboard__item__img--rented')){
        
        if(confirm(`Você tem certeza que deseja devolver o jogo ${jogo.textContent}?`)){ // confirm -> gera um alerta com botao ok ou cancelar!
            imagem.classList.remove('dashboard__item__img--rented');
            jogo.querySelector('a').textContent = 'Alugar';
            jogo.querySelector('a').classList.remove('dashboard__item__button--return');
            jogosAlugados--;
        }
        
    }else
    {   

        imagem.classList.add('dashboard__item__img--rented');
        jogo.querySelector('a').textContent = 'Devolver';
        jogo.querySelector('a').classList.add('dashboard__item__button--return');
        jogosAlugados++;
    }

    contadorDeJogosAlugados();

}

let jogosAlugados = 0;

function contadorDeJogosAlugados(){
    console.log(`Total de jogos alugados: ${jogosAlugados}`);
}

// Inicializa a contagem considerando que os jogos já começam alugados
document.addEventListener('DOMContentLoaded', function() {
    jogosAlugados = document.querySelectorAll('.dashboard__item__img--rented').length;
    contadorDeJogosAlugados();
});


