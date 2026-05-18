const Btntarefas = document.querySelector('.app__button--add-task');
const formListaTarefas = document.querySelector('.app__form-add-task');
const textArea = document.querySelector('.app__form-textarea');
const ulTarefas = document.querySelector('.app__section-task-list');
const btCancelar = document.querySelector('.app__form-footer__button--cancel');
const btDeletar = document.querySelector('.app__form-footer__button--delete');
const paragrafoDescricaoTarefa = document.querySelector('.app__section-active-task-description');
const btnRemoverConcluidas = document.querySelector('#btn-remover-concluidas');
const btnRemoverTodas = document.querySelector('#btn-remover-todas');

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

let tarefaSelecionada = null;
let liTarefaSelecionada = null;

btCancelar.addEventListener('click', limpaFormulario);

btDeletar.addEventListener('click', () => {
    if(tarefaSelecionada && liTarefaSelecionada){
        if(confirm('Tem certeza que deseja deletar essa tarefa?')){
            liTarefaSelecionada.remove();
            tarefas = tarefas.filter(tarefa => tarefa !== tarefaSelecionada);
            atualizarTarefas();
            paragrafoDescricaoTarefa.textContent = '';
            tarefaSelecionada = null;
            liTarefaSelecionada = null;
        }
    }
})

Btntarefas.addEventListener('click', () => {
    formListaTarefas.classList.toggle('hidden');
})


formListaTarefas.addEventListener('submit' , (evento) => {
    evento.preventDefault();
    const tarefa = {
        descricao: textArea.value
    }
    tarefas.push(tarefa);
    const elementoTarefa = criarElementoTarefa(tarefa);
    ulTarefas.append(elementoTarefa);
    localStorage.setItem('tarefas', JSON.stringify(tarefas)); // -> guarda no navegador
    textArea.value = '';
    formListaTarefas.classList.add('hidden');
    
});

document.addEventListener('FocoFinalizado', () => {
    if(tarefaSelecionada && liTarefaSelecionada){
        liTarefaSelecionada.classList.remove('app__section-task-list-item-active');
        liTarefaSelecionada.classList.add('app__section-task-list-item-complete');
        liTarefaSelecionada.querySelector('button').setAttribute('disabled', 'true');
        tarefaSelecionada.completa = true;
    }
});

const removerTarefas = (tarefasCompletas) => {
    const classeSeletor = tarefasCompletas ? '.app__section-task-list-item-complete' : '.app__section-task-list-item';
    document.querySelectorAll(classeSeletor).forEach(elemento => elemento.remove());
    tarefas = tarefasCompletas ? tarefas.filter(tarefa => !tarefa.completa) : [];
    atualizarTarefas();
}

btnRemoverConcluidas.onclick = () => removerTarefas(true)
btnRemoverTodas.onclick = () => removerTarefas(false);

function limpaFormulario(){
    formListaTarefas.classList.add('hidden');
    textArea.value = '';
}

function atualizarTarefas(){
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function criarElementoTarefa(tarefa){
    const li = document.createElement('li');
    li.classList.add('app__section-task-list-item');

    const svg = document.createElement('svg');
    svg.innerHTML = `    
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
    `
    const paragrafo = document.createElement('p');
    paragrafo.textContent = tarefa.descricao;
    paragrafo.classList.add('app__section-task-list-item-description');

    const botao = document.createElement('button');
    const imagemBotao = document.createElement('img');
    botao.classList.add('app_button-edit');

    botao.onclick = () =>{
        const editarTarefa = prompt("Edite o nome da tarefa!");
        if(editarTarefa == '' || editarTarefa == null){
            alert('Campo vazio, insira um nome para a tarefa');
            return;
        }
        paragrafo.textContent = editarTarefa;
        tarefa.descricao = editarTarefa;
        atualizarTarefas();
    }

    imagemBotao.setAttribute('src' , './imagens/edit.png')

    botao.append(imagemBotao);
    li.append(svg);
    li.append(paragrafo);
    li.append(botao);

    if(tarefa.completa){
        li.classList.add('app__section-task-list-item-complete');
        botao.setAttribute('disabled', 'true');
    }else{
        li.onclick = () => {
    
            document.querySelectorAll('.app__section-task-list-item-active')
            .forEach(elemento => elemento.classList.remove('app__section-task-list-item-active'));
    
            if(tarefaSelecionada == tarefa){
                paragrafoDescricaoTarefa.textContent = '';
                tarefaSelecionada = null;
                liTarefaSelecionada = null
                return;
            }
    
            tarefaSelecionada = tarefa;
            liTarefaSelecionada = li;
            paragrafoDescricaoTarefa.textContent = tarefa.descricao;
            li.classList.add('app__section-task-list-item-active');
        }
    }

    return li;
}

tarefas.forEach(tarefa => {
    const elementoTarefa = criarElementoTarefa(tarefa);
    ulTarefas.append(elementoTarefa);
});


