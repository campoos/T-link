"use strict";

const botaoPalavraChave = document.getElementById("button");

function pegarUsuario() {
    const palavraChave = document.getElementById("palavraChaveInput").value.trim();

    if (!palavraChave) {
        alert("Digite um nome de usuário para continuar");
        return null;
    }

    return palavraChave;
}

async function validarUsuario(event) {
    event.preventDefault();

    const palavraChave = pegarUsuario();
    if (!palavraChave) return;

    const dadosUsuario = localStorage.getItem("dadosUsuario")

    const usuario = JSON.parse(dadosUsuario);

    const montarDados = {
        email: usuario.email,
        wordKey: palavraChave  
    }

    try {
        const response = await fetch("https://back-spider.vercel.app/user/RememberPassword", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(montarDados)
        });

        const dados = await response.json();

        if (dados.message == "Palavra chave incorreta..") {
            alert("Palavra-chave incorreta");
           
        } else {
            alert(`Senha do usuário: ${dados.senha}`);
            window.location.href = "/index.html";
        }
    } catch (error) {
        console.error("Erro ao recuperar senha:", error);
        alert("Erro ao tentar recuperar a senha. Tente novamente mais tarde.");
    }
}

botaoPalavraChave.addEventListener("click", validarUsuario);

function boasVindasUsuario(){
    const userDados = localStorage.getItem("dadosUsuario");
    const usuario = JSON.parse(userDados);

    const nome = document.getElementById("olaUsuario")

    nome.textContent = `Olá, @${usuario.nome}`
}

window.addEventListener("DOMContentLoaded", boasVindasUsuario);