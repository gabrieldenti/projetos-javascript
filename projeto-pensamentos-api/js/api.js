const api = {
    async buscarPensamentos(){
        try{
            const resposta = await fetch('http://localhost:3001/pensamentos'); //Fetc por padrão usa get 
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
    }


}

export default api;