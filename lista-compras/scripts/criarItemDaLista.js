import gerarDiaDaSemana from "./gerarDiaDaSemana.js";


const inputItem = document.getElementById('input-item');
let contador = 0; //-> Variável para contar o número de itens na lista

export function criarItemDaLista() {
   
    if(inputItem.value === '') { //-> Verifica se o campo de input está vazio
        alert('Por favor, insira um item para adicionar à lista.'); //-> Exibe um alerta caso o campo esteja vazio
        return;
    }
        const itemDaLista = document.createElement('li'); //-> cria um elemento html
        const containerItemDaLista = document.createElement('div');
        containerItemDaLista.classList.add('lista-item-container'); //-> classlist acessa a lista de classes e seus metodos!
        const inputCheckbox = document.createElement('input');
        inputCheckbox.type = 'checkbox'; //-> Define o tipo do input como checkbox
        inputCheckbox.id = `checkbox-${contador++}`; //-> Define um id único para o checkbox usando o contador
        const nomeItem = document.createElement('p');
        nomeItem.innerHTML= inputItem.value;
        
        inputCheckbox.addEventListener('click', function(){
            if(inputCheckbox.checked){
                nomeItem.style.textDecoration = 'line-through'; //-> Adiciona um estilo de texto riscado ao nome do item quando o checkbox é marcado
            }else{
                nomeItem.style.textDecoration = 'none';
            }
        });


        containerItemDaLista.appendChild(inputCheckbox); //-> Adiciona o checkbox ao container do item da lista
        containerItemDaLista.appendChild(nomeItem);
        itemDaLista.appendChild(containerItemDaLista); //-> Adiciona o container do item da lista ao elemento li
        
        const dataCompleta = gerarDiaDaSemana(); //-> Chama a função para obter a data completa formatada
       
        const itemData = document.createElement('p');
        itemData.classList.add('texto-data'); //-> Adiciona a classe "item-data" ao elemento p que exibirá a data
        itemData.innerHTML = dataCompleta; //-> Define o conteúdo do elemento p como a data completa
       
        itemDaLista.appendChild(itemData); //-> Adiciona o elemento p com a data ao elemento li
        
        inputItem.value = ''; //-> Limpa o campo de input após adicionar o item à lista

       return itemDaLista; //-> Retorna o elemento li criado para ser adicionado à lista de compras
    
}