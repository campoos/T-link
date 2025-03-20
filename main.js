"use strict";

// Espera o DOM carregar antes de adicionar o evento
document.addEventListener("DOMContentLoaded", function () {
    // Botão de registro chamado pelo ID
    const button = document.getElementById("button");

    function pegarDadosLogin() {
        // Chamando os elementos do registro pelo ID
        const email = document.getElementById("email").value;
        const senha = document.getElementById("password").value;

        // Verifica se todos os campos obrigatórios estão preenchidos
        if (!email || !senha) {
            alert("Todos os campos são obrigatórios!");
            return null;
        }

        return {
            email: email,
            senha: senha
        };
    }

    async function loginUsuario() {
        try {
            const dadosLogin = pegarDadosLogin();

            if (!dadosLogin) return; // Interrompe a função se os dados forem inválidos

            // Envia os dados para a API usando o método POST
            const response = await fetch("https://back-spider.vercel.app/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dadosLogin),
            });

            // Converte a resposta para JSON
            const result = await response.json();
            // Verifica se o cadastro foi bem-sucedido
            
            if (response.status == 200) {
                window.location.href = "home.html"
            } else {
                alert(`Erro: ${result.message || "Algo deu errado"}`);
            }
        } catch (error) {
            console.error("Erro ao fazer a requisição:", error);
            alert("Ocorreu um erro ao tentar logar.");
        }
    }

    button.addEventListener("click", loginUsuario);
});
