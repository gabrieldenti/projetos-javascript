const api = {
    async buscarPensamentos(){
        try{
            const resposta = await fetch('http://localhost:3001/pensamentos');
            return resposta.json();
        }catch(error){
            console.log(error.message);
        }
    }
}

export default api;