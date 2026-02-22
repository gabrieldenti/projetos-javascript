# 🚀 Coleção de Mini-Projetos em JavaScript (Vanilla)

Bem-vindo(a) ao meu repositório de projetos Front-end! Esta é uma coleção de aplicações web interativas desenvolvidas para consolidar os fundamentos de programação, manipulação dinâmica do DOM e lógica de resolução de problemas utilizando **JavaScript puro (Vanilla)**, HTML5 e CSS3.

## 💻 Tecnologias Utilizadas
- **HTML5:** Estruturação semântica.
- **CSS3:** Estilização, layout (Flexbox/Grid) e responsividade.
- **JavaScript (ES6+):** Lógica de programação, manipulação do DOM, gestão de estado, eventos e validação de dados.

---

## 📂 Projetos Desenvolvidos

Aqui está o resumo de cada aplicação e os principais conceitos técnicos aplicados nelas:

### 1. 🎟️ e-Ticket (Simulador de Bilheteira)
Um simulador de compra de bilhetes com controlo de stock dinâmico.
- **Conceitos:** Implementação de regras de negócio, extração e conversão de dados do HTML, matemática de subtração em tempo real e **validação defensiva** (impedindo a compra com quantidades inválidas ou superiores ao stock disponível).

### 2. 🎁 Amigo Secreto
Uma aplicação para realizar o sorteio do clássico "Amigo Secreto".
- **Conceitos:** Manipulação avançada de arrays, validação de quantidade mínima de participantes e a implementação de um algoritmo de embaralhamento matemático (Fisher-Yates) para garantir um sorteio justo e sem repetições.

### 3. 🛒 Carrinho de Compras
Um simulador de carrinho de e-commerce que soma os produtos adicionados.
- **Conceitos:** Manipulação de *strings* (utilizando o método `split` para separar nomes e valores de produtos), cálculos dinâmicos de multiplicação e adição, e atualização acumulativa da interface do utilizador.

### 4. 🎲 Sorteador de Números
Uma ferramenta para sortear uma quantidade específica de números dentro de um intervalo definido pelo utilizador.
- **Conceitos:** Uso do `Math.random`, laços de repetição, proteção contra loops infinitos (validando se o intervalo é maior que a quantidade de números) e alternância dinâmica do estado dos botões (habilitado/desabilitado).

### 5. 🎮 AluGames
Um painel (dashboard) para gerir o aluguer e a devolução de jogos de tabuleiro.
- **Conceitos:** Gestão de estados (contabilização de quantos jogos estão alugados no momento), utilização de funções com parâmetros dinâmicos e manipulação direta de classes CSS (`classList.add`, `remove`, `contains`) para alterar a interface conforme as ações do utilizador.

### 6. 🔮 Jogo do Número Secreto
Um jogo interativo onde o utilizador deve adivinhar um número gerado aleatoriamente pelo sistema.
- **Conceitos:** Lógica condicional (if/else), limpeza de campos de formulário e a integração com bibliotecas externas (uso da API `ResponsiveVoice` para ditar os textos do ecrã, garantindo acessibilidade).

---

## ⚙️ Como executar os projetos localmente

Como os projetos foram construídos com tecnologias web padrão, não é necessária nenhuma instalação complexa de dependências.

1. Faça o clone deste repositório:
   > git clone https://github.com/gabrieldenti/projetos-javascript

2. Navegue até à pasta do projeto que deseja visualizar.
3. Abra o ficheiro `index.html` diretamente no seu navegador, ou utilize a extensão **Live Server** do VS Code para uma melhor experiência de desenvolvimento.

---

## 🌐 Visualizar Online (Live Preview)

> ⚠️ **Nota sobre o Layout:** O foco principal desta coleção de projetos foi o desenvolvimento e consolidação da lógica de programação em **JavaScript**. Por isso, o CSS foi construído com larguras fixas. Para a melhor experiência, **recomenda-se visualizar as aplicações num ecrã de computador (desktop)**, uma vez que as interfaces ainda não estão otimizadas para dispositivos móveis (responsividade).

*Acesse os links abaixo para testar as aplicações diretamente no navegador:*

- [Ver e-Ticket](https://gabrieldenti.github.io/projetos-javascript/ingresso/index.html)
- [Ver Amigo Secreto](https://gabrieldenti.github.io/projetos-javascript/amigo-secreto/index.html)
- [Ver Carrinho de Compras](https://gabrieldenti.github.io/projetos-javascript/carrinho-compras/index.html)
- [Ver Sorteador de Números](https://gabrieldenti.github.io/projetos-javascript/sorteador-numeros/index.html)
- [Ver AluGames](https://gabrieldenti.github.io/projetos-javascript/alugames/index.html)
- [Ver Jogo do Número Secreto](https://gabrieldenti.github.io/projetos-javascript/numero-secreto/index.html)
