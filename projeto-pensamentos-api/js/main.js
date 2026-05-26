import ui from './ui.js';
import api from './api.js';

document.addEventListener('DOMContentLoaded', () => {
    ui.renderizarPensamentos();

    const formulario = document.getElementById('pensamento-form');
    const btCancelar = document.getElementById('botao-cancelar');
    const inputBusca = document.getElementById('campo-busca');

    

    
    formulario.addEventListener('submit', submissaoFormulario); //DOMContentLoaded é um evento que é disparado quando o documento HTML foi completamente carregado e analisado, sem aguardar o carregamento de folhas de estilo, imagens e subframes para terminar. Isso significa que o código dentro do callback será executado assim que a estrutura do DOM estiver pronta, permitindo que você manipule os elementos da página com segurança.
    btCancelar.addEventListener('click', () => {
        formulario.reset();
    });
    inputBusca.addEventListener('input', manipularBusca)
}); 
async function submissaoFormulario(evento){
    evento.preventDefault();

    const id = document.getElementById('pensamento-id').value;
    const conteudo = document.getElementById('pensamento-conteudo').value;
    const autoria = document.getElementById('pensamento-autoria').value;

    try{
        if(id){
            await api.editarPensamento({id , conteudo, autoria});
        }else{
            await api.salvarPensamento({conteudo, autoria});
        }
        ui.renderizarPensamentos();
    }catch(error){
        console.error(error.message);
    }
}

async function manipularBusca(){
    const busca = document.getElementById('campo-busca').value;

    try{
        const pensamentosFiltrados = await api.buscarPensamentosPorBusca(busca);
        ui.renderizarPensamentos(pensamentosFiltrados);
    }catch(error){
        console.error(error.message);
    }
}