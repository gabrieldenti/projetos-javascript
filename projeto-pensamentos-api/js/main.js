import ui from './ui.js';
import api from './api.js';

document.addEventListener('DOMContentLoaded', () => {
    ui.renderizarPensamentos();

    const formulario = document.getElementById('pensamento-form');

    formulario.addEventListener('submit', submissaoFormulario);
}); //DOMContentLoaded é um evento que é disparado quando o documento HTML foi completamente carregado e analisado, sem aguardar o carregamento de folhas de estilo, imagens e subframes para terminar. Isso significa que o código dentro do callback será executado assim que a estrutura do DOM estiver pronta, permitindo que você manipule os elementos da página com segurança.

async function submissaoFormulario(evento){
    evento.preventDefault();

    const inputId = document.getElementById('pensamento-id').value;
    const inputConteudo = document.getElementById('pensamento-conteudo').value;
    const inputAutoria = document.getElementById('pensamento-autoria').value;

    try{
        await api.salvarPensamento({inputConteudo, inputAutoria});
        ui.renderizarPensamentos();
    }catch(error){
        console.error(error.message);
    }
}