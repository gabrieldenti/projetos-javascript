import { criarItemDaLista } from "./scripts/criarItemDaLista.js";
import verificarListaVazia from "./scripts/verificarListaVazia.js";

const botaoAdicionar = document.getElementById('adicionar-item');
const listaDeCompras = document.getElementById('lista-de-compras');

botaoAdicionar.addEventListener('click', (evento) => { //-> Adiciona um evento de clique ao botão "Adicionar"
    evento.preventDefault(); //-> Evita que a página seja recarregada ao clicar no botão
    const itemDaLista = criarItemDaLista(); //-> Chama a função para criar um novo item da lista e armazena o elemento li retornado
    listaDeCompras.appendChild(itemDaLista); //-> Adiciona o elemento li à lista de compras 
    verificarListaVazia(listaDeCompras); //-> Chama a função para verificar se a lista está vazia após adicionar um item
});

verificarListaVazia(listaDeCompras); //-> Chama a função para verificar se a lista está vazia ao carregar a página