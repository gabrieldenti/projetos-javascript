import api from './api.js';

const ui = {
    async renderizarPensamentos(){
        const listaPensamentos = document.getElementById('lista-pensamentos');

        try{
            const pensamentos = await api.buscarPensamentos();
            pensamentos.forEach(ui.adicionarPensamento);
        }catch(error){
            console.error(error.message);
        }
    },

    adicionarPensamento(pensamento){
        const listaPensamentos = document.getElementById('lista-pensamentos');
        const liPensamento = document.createElement('li');
        liPensamento.setAttribute('data-id', pensamento.id);
        liPensamento.classList.add('li-pensamento');

        const imgAspas = document.createElement('img');
        imgAspas.src = 'assets/imagens/aspas-azuis.png';
        imgAspas.alt = 'Aspas azuis';
        imgAspas.classList.add('icone-aspas');

        const pensamentoConteudo = document.createElement('div');
        pensamentoConteudo.classList.add('pensamento-conteudo');
        pensamentoConteudo.textContent = pensamento.conteudo;

        const pensamentoAutoria = document.createElement('div');
        pensamentoAutoria.classList.add('pensamento-autoria');
        pensamentoAutoria.textContent = pensamento.autoria;

        liPensamento.appendChild(imgAspas);
        liPensamento.appendChild(pensamentoConteudo);
        liPensamento.appendChild(pensamentoAutoria);

        listaPensamentos.appendChild(liPensamento);
    }
}

export default ui;