"use strict";

// Espera o DOM carregar antes de adicionar o evento
document.addEventListener("DOMContentLoaded", function () {
    // Botão de registro chamado pelo ID
    const button = document.getElementById("button");

    function pegarDadosCadastro() {
        // Chamando os elementos do registro pelo ID
        const nome = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const senha = document.getElementById("password").value;
        const img = document.getElementById("img").value;
        const senhaRecuperacao = document.getElementById("senhaRecuperacao").value;
        const checkbox = document.getElementById("checkbox").checked ? 1 : 0;

        // Verifica se todos os campos obrigatórios estão preenchidos
        if (!nome || !email || !senha || !img) {
            alert("Todos os campos são obrigatórios!");
            return null;
        }

        return {
            nome: nome,
            email: email,
            senha: senha,
            premium: checkbox,
            imagemPerfil: img,
            senhaRecuperacao: senhaRecuperacao  
        };
    }

    async function cadastrarUsuario() {
        try {
            const dadosCadastro = pegarDadosCadastro();

            if (!dadosCadastro) return; // Interrompe a função se os dados forem inválidos

            // Envia os dados para a API usando o método POST
            const response = await fetch("https://back-spider.vercel.app/user/cadastrarUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dadosCadastro),
            });

            // Converte a resposta para JSON
            const result = await response.json();

            // Verifica se o cadastro foi bem-sucedido
            if (response.ok) {
                alert("Cadastro realizado com sucesso!");
            } else {
                alert(`Erro: ${result.message || "Algo deu errado"}`);
            }
        } catch (error) {
            console.error("Erro ao fazer a requisição:", error);
            alert("Ocorreu um erro ao tentar cadastrar o usuário.");
        }
    }

    button.addEventListener("click", cadastrarUsuario);
});
