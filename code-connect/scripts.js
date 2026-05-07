const uploadBtn = document.getElementById('upload-btn');
const inputUpload = document.getElementById('imagem-upload');
const imagemPrincipal = document.querySelector(".main-imagem");
const nomeDaImagem = document.querySelector(".container-imagem-nome p");
const inputTags = document.getElementById("categorias-tags");
const listaTags = document.querySelector(".lista-tags");
const btPublicar = document.querySelector(".botao-publicar");
const btDescartar = document.querySelector(".botao-descartar");

const tagsDisponiveis = ["Front-end", "Programação", "Data Science", "Full-stack", "HTML", "CSS", "JavaScript"];

uploadBtn.addEventListener("click", () =>{
    inputUpload.click();
});

inputUpload.addEventListener('change', async (evento) => {
    const arquivo = evento.target.files[0];
    if (!arquivo) return;

    try {
        const conteudoDoArquivo  = await lerConteudoDoArquivo(arquivo);
        imagemPrincipal.src = conteudoDoArquivo.url;
        nomeDaImagem.textContent = conteudoDoArquivo.nome;
    } catch (erro) {
        console.error("Erro na leitura do arquivo");
    }
});

inputTags.addEventListener('keypress' , async (evento) => {
    if(evento.key === "Enter"){
        evento.preventDefault();
        const tagTexto = inputTags.value.trim();
        if(tagTexto !== ""){
            try{
                const tagExiste = await verificaTags(tagTexto);
                if(tagExiste){
                    const novaTag = document.createElement('li');
                    novaTag.innerHTML = `<p>${tagTexto}</p> <img src="./img/close-black.svg" class="remove-tag">`;
                    listaTags.appendChild(novaTag);
                    inputTags.value = "";    

                }else{
                    alert("Tag não foi encontrada!");
                }
            } catch(error){
                console.error("Erro ao verificar a existência da tag " + error);
                alert("Erro ao verificar a existencia da tag. Verifique o console");
            }
        }
    }
})

listaTags.addEventListener('click', (evento) => {
    if(evento.target.classList.contains("remove-tag")){
        const tagRemover = evento.target.parentElement;
        listaTags.removeChild(tagRemover);
    }
})

btPublicar.addEventListener("click" , async (evento) =>{
    evento.preventDefault();
    const nomeDoProjeto = document.getElementById("nome").value
    const descricaoProjeto = document.getElementById("descricao").value
    const tagProjetos = Array.from(listaTags.querySelectorAll("p")).map(tag => tag.textContent);

    try{
        
        const mensagem = await publicarProjeto(nomeDoProjeto, descricaoProjeto, tagProjetos);
        alert(mensagem);
    } catch(error){
        console.error("Erro ao publicar o projeto " + erro);
        alert("Erro ao publicar o projeto");
    }

});

btDescartar.addEventListener('click', (evento) => {
    evento.preventDefault();

    const formulario = document.querySelector("form");
    formulario.reset();

    imagemPrincipal.src = "./img/imagem1.png";
    nomeDaImagem.textContent = "image_projeto.png";

    listaTags.innerHTML = "";
});

function lerConteudoDoArquivo(arquivo){
    return new Promise((resolve, reject) => {
        const leitor = new FileReader();
        leitor.onload = () => {
            resolve({ url: leitor.result, nome: arquivo.name });
        };

        leitor.onerror = () => {
            reject(`Erro na leitura do arquivo ${arquivo.name}`);
        };

        leitor.readAsDataURL(arquivo);
    });
}

async function verificaTags(tagTexto){
    return new Promise((resolve) =>{
        setTimeout(() => {
            resolve(tagsDisponiveis.includes(tagTexto));
        }, 1000);

    })
}

async function publicarProjeto(nomeDoProjeto, descricaoDoProjeto, tagsProjeto) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const sucesso = Math.random() > 0.5;

            if(sucesso){
                resolve("Projeto publicado com sucesso!");
            }else{
                reject("Erro ao publicar projeto");
            }
        }, 2000);
    })
}


