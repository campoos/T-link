"use strict"

//Botao de registro chamado pelo ID
const button = document.getElementById('button')

function pegarDadosCadastro(){
    //Chamando os elementos do registro pelo ID
    const nome = document.getElementById('name').value
    const email = document.getElementById('email').value
    const senha = document.getElementById('password').value
    const img = document.getElementById('img').value

     // Verificando o checkbox: se estiver marcado, retorna 1; senão, retorna 0
     const checkbox = document.getElementById('checkbox').checked ? 1 : 0

    //Compilando dados de cadastro do usuario em um JSON
    const JsonDadosCadastro = {
        nome: nome,
        email: email,
        senha: senha,
        checkbox: checkbox,
        img: img
    }

    return JsonDadosCadastro

}

async function cadastrarUsuario() {
    try {
        // Envia os dados para a API usando o método POST
        const response = await fetch('https://back-spider.vercel.app/user/cadastrarUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Especifica que estamos enviando um JSON
            },
            body: JSON.stringify(pegarDadosCadastro()), // Transforma o objeto em uma string JSON
        });

        // Converte a resposta para JSON
        const result = await response.json();

        // Verifica se o cadastro foi bem-sucedido
        if (response.ok == 201) {
            alert('Cadastro realizado com sucesso!');
        } else {
            alert(`Erro: ${result.message || 'Algo deu errado'}`);
        }
    } catch (error) {
        console.error('Erro ao fazer a requisição:', error);
        alert('Ocorreu um erro ao tentar cadastrar o usuário.');
    }
}

button.addEventListener('click', cadastrarUsuario)
