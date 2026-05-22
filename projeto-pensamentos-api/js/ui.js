import api from './api.js';

const ui = {
    async renderizarPensamentos(){
        const listaPensamentos = document.getElementById('lista-pensamentos');
        listaPensamentos.innerHTML = '';

        try{
            const pensamentos = await api.buscarPensamentos();
            if(pensamentos.length === 0){
                ui.muralVazio(pensamentos);
            }else{
                pensamentos.forEach(ui.adicionarPensamento);
            }

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
        btEditar.classList.add('botao-editar');
        btEditar.onclick = () => ui.preencherFormulario(pensamento);

        const iconeEditar = document.createElement('img');
        iconeEditar.src = 'assets/imagens/icone-editar.png';
        iconeEditar.alt = 'Ícone editar';
        btEditar.appendChild(iconeEditar);

        const btExcluir = document.createElement('button');
        btExcluir.classList.add('botao-excluir');
        btExcluir.onclick = async () => {
            try{
                await api.excluirPensamento(pensamento.id);
                ui.renderizarPensamentos();
            }catch(error){
                console.error(error.message);
            }
        };

        const iconeExcluir = document.createElement('img');
        iconeExcluir.src = 'assets/imagens/icone-excluir.png';
        iconeExcluir.alt = 'Ícone excluir';
        btExcluir.appendChild(iconeExcluir);

        const icones = document.createElement('div');
        icones.classList.add('icones');
        icones.appendChild(btEditar);
        icones.appendChild(btExcluir);

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
        
    },

    muralVazio(pensamentos){

        const sectionMural = document.getElementById('lista-pensamentos-container');
        const formulario = document.getElementById('form-container');

        formulario.style.display = 'none';

        const botaoAdicionar = document.createElement('button');
        botaoAdicionar.textContent = 'Adicionar pensamentos';

        
        const p = document.createElement('p');
        p.textContent = 'Nada por aqui ainda, que tal compartilhar alguma ideia?';
        p.setAttribute('id', 'lista-pensamentos-container');

        const img = document.createElement('img');
        img.src = 'assets/imagens/lista-vazia.png';
        img.alt = 'Lista vazia';
        img.setAttribute('id', 'lista-pensamentos-container');

        sectionMural.appendChild(p);
        sectionMural.appendChild(img);
        return sectionMural;

    }
}

export default ui;