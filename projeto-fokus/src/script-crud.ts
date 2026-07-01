//funcoes pura dado o mesmo tipo de parametro retorna o mesmo tipo que recebeu no parametro.

interface Tarefa {
  descricao: string;
  concluida: boolean;
}

interface estadoAplicacao {
  tarefas: Tarefa[];
  tarefaSelecionada: Tarefa | null;
  editando: boolean;
}

let estado: estadoAplicacao = {
  tarefas: [
    {
      descricao: "Estudar TypeScript",
      concluida: false,
    },
    {
      descricao: "Fazer exercícios",
      concluida: true,
    },
    {
      descricao: "Revisar conceitos de arrays",
      concluida: false,
    },
  ],
  tarefaSelecionada: null,
  editando: false,
};

function adicionarTarefa(
  estado: estadoAplicacao,
  tarefa: Tarefa,
): estadoAplicacao {
  return {
    ...estado,
    tarefas: estado.tarefas.concat(tarefa),
  };
}

function selecionarTarefa(
  estado: estadoAplicacao,
  tarefa: Tarefa,
): estadoAplicacao {
  return {
    ...estado,
    tarefaSelecionada: tarefa === estado.tarefaSelecionada ? null : tarefa,
  };
}

function deletar(estado: estadoAplicacao): estadoAplicacao {
  if (estado.tarefaSelecionada) {
    const tarefas = estado.tarefas.filter((t) => t != estado.tarefaSelecionada);
    return { ...estado, tarefas, tarefaSelecionada: null, editando: false };
  } else {
    return estado;
  }
}

function deletarTodasTarefas(estado: estadoAplicacao): estadoAplicacao {
  return {
    ...estado,
    tarefas: [],
    tarefaSelecionada: null,
    editando: false,
  };
}

function deletarTodasConcluidas(estado: estadoAplicacao): estadoAplicacao {
  const tarefas = estado.tarefas.filter((t) => !t.concluida);
  return {
    ...estado,
    tarefas,
    tarefaSelecionada: null,
    editando: false,
  };
}

function editarTarefa(
  estado: estadoAplicacao,
  tarefa: Tarefa,
): estadoAplicacao {
  return { ...estado, editando: !estado.editando, tarefaSelecionada: tarefa };
}

function atualizarUI() {
  const ulTarefas = document.querySelector<HTMLUListElement>(
    ".app__section-task-list",
  );
  const formAdicionarTarefa = document.querySelector<HTMLFormElement>(
    ".app__form-add-task",
  );
  const btnAdicionarTarefa = document.querySelector<HTMLButtonElement>(
    ".app__button--add-task",
  );
  const textArea = document.querySelector<HTMLTextAreaElement>(
    ".app__form-textarea",
  );
  const btCancelar = document.querySelector<HTMLButtonElement>(
    ".app__form-footer__button--cancel",
  );
  const btDeletar = document.querySelector<HTMLButtonElement>(
    ".app__form-footer__button--delete",
  );
  const paragrafoDescricaoTarefa = document.querySelector<HTMLParagraphElement>(
    ".app__section-active-task-description",
  );
  const btnRemoverConcluidas = document.querySelector<HTMLButtonElement>(
    "#btn-remover-concluidas",
  );
  const btnRemoverTodas =
    document.querySelector<HTMLButtonElement>("#btn-remover-todas");

  btnAdicionarTarefa!.onclick = () => {
    formAdicionarTarefa?.classList.toggle("hidden");
  };

  formAdicionarTarefa!.onsubmit = (evento) => {
    //-> submit
    evento.preventDefault();
    const descricao = textArea!.value;
    estado = adicionarTarefa(estado, {
      descricao,
      concluida: false,
    });
    atualizarUI();
  };

  btCancelar!.onclick = () => {
    formAdicionarTarefa!.classList.add("hidden");
    textArea!.value = "";
  };

  btnRemoverTodas!.onclick = () => {
    estado = deletarTodasTarefas(estado);
    atualizarUI();
  };

  btDeletar!.onclick = () => {
    estado = deletar(estado);
    formAdicionarTarefa!.classList.add("hidden");
    atualizarUI();
  };

  btnRemoverConcluidas!.onclick = () => {
    estado = deletarTodasConcluidas(estado);
    atualizarUI();
  };

  if (ulTarefas) {
    ulTarefas.innerHTML = "";
  }

  paragrafoDescricaoTarefa!.textContent = estado.tarefaSelecionada
    ? estado.tarefaSelecionada!.descricao
    : null;

  if (estado.editando && estado.tarefaSelecionada) {
    formAdicionarTarefa!.classList.remove("hidden");
    textArea!.value = estado.tarefaSelecionada.descricao;
  } else {
    formAdicionarTarefa!.classList.add("hidden");
    textArea!.value = "";
  }

  estado.tarefas.forEach((tarefa) => {
    const li = document.createElement("li");
    li.classList.add("app__section-task-list-item");

    const svg = document.createElement("svg");
    svg.innerHTML = `    
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
    `;

    const paragrafo = document.createElement("p");
    paragrafo.textContent = tarefa.descricao;
    paragrafo.classList.add("app__section-task-list-item-description");

    const botao = document.createElement("button");
    botao.classList.add("app_button-edit");
    const imagemBotao = document.createElement("img");
    imagemBotao.setAttribute("src", "./imagens/edit.png");

    if (tarefa.concluida) {
      li.classList.add("app__section-task-list-item-complete");
      botao.setAttribute("disabled", "true");
    }

    if (tarefa == estado.tarefaSelecionada) {
      li.classList.add("app__section-task-list-item-active");
    }

    botao.append(imagemBotao);
    li.append(svg);
    li.append(paragrafo);
    li.append(botao);

    li.addEventListener("click", () => {
      console.log(estado);
      estado = selecionarTarefa(estado, tarefa);
      atualizarUI();
    });

    botao!.onclick = (evento) =>{
      evento.stopPropagation();
      estado = editarTarefa(estado, tarefa)
      atualizarUI();
    }

    ulTarefas?.appendChild(li);
  });
}

document.addEventListener("FocoFinalizado", () => {
  if(estado.tarefaSelecionada){
    estado.tarefaSelecionada.concluida = true;
    atualizarUI();
  }
});

atualizarUI();
