import api from './api.js';

const ui = {
    async renderizarPensamentos(pensamentosFiltrados = null){
        const listaPensamentos = document.getElementById('lista-pensamentos');
        const muralVazio = document.getElementById('mural-vazio');

        if(muralVazio){
            muralVazio.remove();
        }
        
        listaPensamentos.innerHTML = '';

        try{
            let pensamentosParaRenderizar = pensamentosFiltrados;
            if(!pensamentosFiltrados){ 
                pensamentosParaRenderizar = await api.buscarPensamentos();
            }else{
                pensamentosParaRenderizar = pensamentosFiltrados;
            }
            
            if(pensamentosParaRenderizar.length === 0){
                ui.muralVazio();
            }else{
                pensamentosParaRenderizar.forEach(ui.adicionarPensamento);
            }

        }catch(error){
            console.error(error.message);
        }
    },

    adicionarPensamento(pensamento){  

        const listaPensamentos = document.getElementById('lista-pensamentos');
        const formContainer = document.getElementById('form-container');
        const botaoAdicionar = document.getElementById('botao-adicionar');


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

        const pensamentoData = document.createElement('div');
        const dataWeek = pensamento.data.toLocaleDateString('pt-BR', { weekday: 'long' });
        const dataFormadata = pensamento.data.toLocaleDateString('pt-BR', {day: '2-digit', month: 'long' , year: 'numeric'});
        const dataFinal = `${dataWeek}, ${dataFormadata}`;
        pensamentoData.classList.add('pensamento-data');
        pensamentoData.textContent = dataFinal;

        const btEditar = document.createElement('button');
        btEditar.classList.add('botao-editar');
        btEditar.onclick = () => {
            botaoAdicionar.style.display = 'none';
            formContainer.style.display = 'block';
            ui.preencherFormulario(pensamento); 
        };

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

        const botaoFavorito = document.createElement('button');
        botaoFavorito.classList.add('botao-favorito');

        const iconeFavorito = document.createElement('img');
        iconeFavorito.src = pensamento.favorito ? 'assets/imagens/icone-favorito.png' : 'assets/imagens/icone-favorito_outline.png';
        iconeFavorito.alt = 'Ícone favorito';
        botaoFavorito.appendChild(iconeFavorito);

        botaoFavorito.onclick = async () => {
            try{
                await api.atualizarFavotito(pensamento.id, !pensamento.favorito);
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
        icones.appendChild(botaoFavorito);
        icones.appendChild(btEditar);
        icones.appendChild(btExcluir);

        liPensamento.appendChild(imgAspas);
        liPensamento.appendChild(pensamentoConteudo);
        liPensamento.appendChild(pensamentoAutoria);
        liPensamento.appendChild(pensamentoData);
        liPensamento.appendChild(icones);

        listaPensamentos.appendChild(liPensamento);
    },

    async preencherFormulario(pensamento){
        const pensameneto = await api.buscarPensamentoPorId(pensamento.id);

        document.getElementById('pensamento-id').value = pensameneto.id;
        document.getElementById('pensamento-conteudo').value = pensameneto.conteudo;
        document.getElementById('pensamento-autoria').value = pensameneto.autoria;
        document.getElementById('pensamento-data').value = pensameneto.data.toISOString().split('T')[0];
        document.getElementById('form-container').scrollIntoView(); // Rola a página para o formulário, garantindo que ele esteja visível para o usuário quando for preenchido com os dados do pensamento selecionado para edição.
        document.getElementById('botao-salvar').textContent = 'Salvar alterações';
        
    },

    muralVazio(){

        const sectionMural = document.getElementById('lista-pensamentos-container');
        const formulario = document.getElementById('form-container');
        const botaoAdicionar = document.getElementById('botao-adicionar');
        const muralVazio = document.getElementById('mural-vazio');

        if(muralVazio){
            muralVazio.remove();
        }
      
        botaoAdicionar.onclick = () => {
            formulario.style.display = 'block';
        }
        
        const elementoMuralVazio = document.createElement('div');
        elementoMuralVazio.setAttribute('id', 'mural-vazio');

        const p = document.createElement('p');
        p.textContent = 'Nada por aqui ainda, que tal compartilhar alguma ideia?';
        p.classList.add('mural-vazio-texto');

        const img = document.createElement('img');
        img.src = 'assets/imagens/lista-vazia.png';
        img.alt = 'Lista vazia';
        img.classList.add('lista-pensamentos-img');

        elementoMuralVazio.appendChild(p);
        elementoMuralVazio.appendChild(img);
        sectionMural.appendChild(elementoMuralVazio);

    }
}

export default ui;