"use strict";

const botaoRecuperacao = document.getElementById("button");

function pegarUsuario() {
    const nomeUsuario = document.getElementById("nameInput").value;

    if (!nomeUsuario) {
        alert("Digite um nome de usuário para continuar");
        return null;
    } else {
        return nomeUsuario;
    }
}

async function validarUsuario(event) {
    event.preventDefault(); // Impede o recarregamento da página

    const pegarNomeUsuario = pegarUsuario();
    if (!pegarNomeUsuario) return; // Interrompe se nome for inválido

    const dadosUsuario = [];
    try {
        const response = await fetch("https://back-spider.vercel.app/user/listarUsers", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        const result = await response.json();

        let status = false;

        result.forEach(item => {
            if (item.nome === pegarNomeUsuario) {
                status = true;
                dadosUsuario.push(item);
            }
        });

        if (status) {
            localStorage.setItem("dadosUsuario", JSON.stringify(dadosUsuario[0]));
            alert("Usuário encontrado!");
            window.location.href = "/SRC/Pages/screens/recuperacao-senha2.html";
        } else {
            alert("Não foi possível achar o usuário");
        }
    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
    }
}

botaoRecuperacao.addEventListener("click", validarUsuario);
