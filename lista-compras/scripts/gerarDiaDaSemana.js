export default function gerarDiaDaSemana() {
     const diaDaSemana = new Date().toLocaleDateString('pt-BR', { weekday: 'long' }); //-> Obtém o dia da semana atual em português
        const data = new Date().toLocaleDateString('pt-BR'); //-> Obtém a data atual em formato brasileiro
        const hora = new Date().toLocaleTimeString('pt-BR', {hour: "numeric" , minute: "numeric"}); //-> Obtém a hora atual em formato brasileiro

        const dataCompleta = `${diaDaSemana} (${data}) às ${hora}`; //-> Combina o dia da semana e a data em uma string completa
        return dataCompleta;
}