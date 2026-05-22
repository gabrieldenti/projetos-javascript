const api = {
    async buscarPensamentos(){
        try{
            const resposta = await fetch('http://localhost:3001/pensamentos'); //Fetch por padrão usa get 
            return resposta.json();
        }catch(error){
            console.log(error.message);
        }
    },
     async salvarPensamento(pensamento){
        try{
            const resposta = await fetch('http://localhost:3001/pensamentos', {
                method: 'POST', // Especifica o método HTTP como POST para indicar que estamos enviando dados para criar um novo recurso.
                headers: {
                    "Content-Type": "application/json" // Define o cabeçalho Content-Type como application/json para informar ao servidor que o corpo da requisição contém dados no formato JSON.
                },
                body: JSON.stringify(pensamento) // Converte o objeto pensamento em uma string JSON para ser enviada no corpo da requisição.
            });
            return resposta.json();
        }catch(error){
            console.log(error.message);
        }
    },
    async buscarPensamentoPorId(id){
        try{
            const resposta = await fetch(`http://localhost:3001/pensamentos/${id}`); 
            return resposta.json();
        }catch(error){
            console.log(error.message);
        }
    },
    async editarPensamento(pensamento){
        try{
            const resposta = await fetch(`http://localhost:3001/pensamentos/${pensamento.id}`, {
                method: 'PUT', // Especifica o método HTTP como PUT para indicar que estamos enviando dados para atualizar um recurso existente.
                headers: {
                    "Content-Type": "application/json" // Define o cabeçalho Content-Type como application/json para informar ao servidor que o corpo da requisição contém dados no formato JSON.
                },
                body: JSON.stringify(pensamento) // Converte o objeto pensamento em uma string JSON para ser enviada no corpo da requisição.
            });
            return resposta.json();
        }catch(error){
            console.log(error.message);
        }
    },

}

export default api;