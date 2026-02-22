let listaPessoas = [];

function adicionar(){

    let nomeAmigo = document.getElementById('nome-amigo');

    if(nomeAmigo.value == ''){
        alert('Insira um nome');
        return;
    }

    let listaAmigos = document.getElementById('lista-amigos');
   
    listaPessoas.push(nomeAmigo.value);

    if (listaAmigos.textContent == '') {
        listaAmigos.textContent = nomeAmigo.value;
    } else {
        listaAmigos.textContent = listaAmigos.textContent + ', ' + nomeAmigo.value;
    }

    amigo.value = '';
   
}

function sortear(){
    embaralha(listaPessoas);
    let listaSorteio = document.getElementById('lista-sorteio');
    
    if(listaPessoas.length < 4){
        alert('Adicione no minimo 4 nomes');
        return;
    }
    for(let i = 0; i < listaPessoas.length; i++){
       
       if(i == listaPessoas.length - 1){
        listaSorteio.innerHTML = listaSorteio.innerHTML + listaPessoas[i] + ' --> ' + listaPessoas[0] + '<br>';
       }else{
        listaSorteio.innerHTML = listaSorteio.innerHTML + listaPessoas[i] + ' --> ' + listaPessoas[i + 1] + '<br>';
       }
    }

}

function embaralha(lista) {

    for (let indice = lista.length; indice; indice--) {

        const indiceAleatorio = Math.floor(Math.random() * indice);

        // atribuição via destructuring
        [lista[indice - 1], lista[indiceAleatorio]] = 
            [lista[indiceAleatorio], lista[indice - 1]];
    }
}

function reiniciar(){

    listaPessoas = [];
    document.getElementById('nome-amigo').value = '';
    document.getElementById('lista-amigos').innerHTML = '';
    document.getElementById('lista-sorteio').innerHTML = '';    
}

