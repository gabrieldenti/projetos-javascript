import ui from './ui.js';
import api from './api.js';

const pensamentosSet = new Set();

async function adicionarChaveAoPensamento(){

    try{
        const pensamentos = await api.buscarPensamentos();
        pensamentos.forEach(pensamento => {
            const chavePensamento = `${pensamento.conteudo.trim().toLowerCase()}-${pensamento.autoria.trim().toLowerCase()}`;
            pensamentosSet.add(chavePensamento);
        });
    }catch(error){
        console.error(error.message);
    }
}

const regexConteudo = /^[\p{L}\s.,!?]{10,}$/u
const regexAutor = /^[\p{L}\s.,!?]{3,10}$/u

function removerEspacos(string){
    return string.replaceAll(/\s+/g, '');
}

function validarConteudo(conteudo){
    return regexConteudo.test(conteudo);
}

function validarAutor(autoria){
    return regexAutor.test(autoria);
}

document.addEventListener('DOMContentLoaded', () => {
    ui.renderizarPensamentos();
    adicionarChaveAoPensamento();

    const formContainer = document.getElementById('form-container');
    const formulario = document.getElementById('pensamento-form');
    const btCancelar = document.getElementById('botao-cancelar');
    const inputBusca = document.getElementById('campo-busca');
    const botaoAdicionar = document.getElementById('botao-adicionar');
    const botaoSalvar = document.getElementById('botao-salvar');

    formContainer.style.display = 'none'; // Esconde o formulário inicialmente, definindo a propriedade display como 'none'. Isso significa que o formulário não será visível na página até que seja necessário exibi-lo, como quando o usuário clicar no botão para adicionar um novo pensamento.
    
    formulario.addEventListener('submit', submissaoFormulario); //DOMContentLoaded é um evento que é disparado quando o documento HTML foi completamente carregado e analisado, sem aguardar o carregamento de folhas de estilo, imagens e subframes para terminar. Isso significa que o código dentro do callback será executado assim que a estrutura do DOM estiver pronta, permitindo que você manipule os elementos da página com segurança.
    botaoAdicionar.addEventListener('click', () => {
        botaoSalvar.textContent = 'Adicionar';
        formContainer.style.display = 'block';
        botaoAdicionar.style.display = 'none';
    });
    btCancelar.addEventListener('click', () => {
        formulario.reset();
        formContainer.style.display = 'none';
        botaoAdicionar.style.display = 'block';
    });
    inputBusca.addEventListener('input', manipularBusca)
}); 
async function submissaoFormulario(evento){
    evento.preventDefault();

    const id = document.getElementById('pensamento-id').value;
    const conteudo = document.getElementById('pensamento-conteudo').value;
    const autoria = document.getElementById('pensamento-autoria').value;
    const data = document.getElementById('pensamento-data').value;
    const dataElemento = document.getElementById('pensamento-data');

    const conteudoSemEspacos = removerEspacos(conteudo);
    const autoriaSemEspacos = removerEspacos(autoria);

    if(!validarConteudo(conteudoSemEspacos)){
        alert('O conteúdo do pensamento deve conter pelo menos 10 caracteres e não pode conter números. Por favor, revise o conteúdo e tente novamente.');
        return;
    }

    if(!validarAutor(autoriaSemEspacos)){
        alert('O nome do autor deve conter entre 3 e 10 caracteres e não pode conter números. Por favor, revise o nome do autor e tente novamente.');
        return;
    }

    if(!validarData(data)){
        alert('A data informada é inválida. Por favor, insira uma data igual ou anterior à data atual.');
        dataElemento.focus();
        dataElemento.value = '';
        return;
    }

    const chavePensamento = `${conteudo.trim().toLowerCase()}-${autoria.trim().toLowerCase()}`;
    console.log(chavePensamento);

    if (id) {
        const pensamentoOriginal = await api.buscarPensamentoPorId(id);

        const chaveOriginal =
        `${pensamentoOriginal.conteudo.trim().toLowerCase()}-${pensamentoOriginal.autoria.trim().toLowerCase()}`;

        if(
            chavePensamento !== chaveOriginal &&
            pensamentosSet.has(chavePensamento)) {
            alert('Este pensamento já foi adicionado.');
            return;
        }
    } else{
        if (pensamentosSet.has(chavePensamento)) {
            alert('Este pensamento já foi adicionado.');
            return;
        }
    }

    try{
        if(id){
            await api.editarPensamento({id , conteudo, autoria, data});
        }else{
            await api.salvarPensamento({conteudo, autoria, data});
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

function validarData(data){
    const dataAtual = new Date();
    const dataInformada = new Date(data);
    return dataInformada <= dataAtual;
}