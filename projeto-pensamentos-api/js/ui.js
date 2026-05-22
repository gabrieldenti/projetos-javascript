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

        const btEditar = document.createElement('button');
        pensamentoAutoria.classList.add('botao-editar');
        btEditar.onclick = () => ui.preencherFormulario(pensamento);

        const iconeEditar = document.createElement('img');
        iconeEditar.src = 'assets/imagens/icone-editar.png';
        iconeEditar.alt = 'Ícone editar';
        btEditar.appendChild(iconeEditar);
       
        const icones = document.createElement('div');
        icones.classList.add('icones');
        icones.appendChild(btEditar);

        liPensamento.appendChild(imgAspas);
        liPensamento.appendChild(pensamentoConteudo);
        liPensamento.appendChild(pensamentoAutoria);
        liPensamento.appendChild(icones);

        listaPensamentos.appendChild(liPensamento);
    },

    async preencherFormulario(pensamento){
        const pensameneto = await api.buscarPensamentoPorId(pensamento.id);

        document.getElementById('pensamento-id').value = pensameneto.id;
        document.getElementById('pensamento-conteudo').value = pensameneto.conteudo;
        document.getElementById('pensamento-autoria').value = pensameneto.autoria;
        document.getElementById('botao-salvar').textContent = 'Salvar alterações';
        
    }
}

export default ui;