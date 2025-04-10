"use strict"

document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("button");

    function pegarDadosLogin() {
        const email = document.getElementById("email").value;
        const senha = document.getElementById("password").value;

        if (!email || !senha) {
            alert("Todos os campos são obrigatórios!");
            return null;
        }

        return { email, senha };
    }

    async function loginUsuario(event) {
        event.preventDefault(); // Previne recarregar a página

        const dadosLogin = pegarDadosLogin();
        if (!dadosLogin) return;

        try {
            const response = await fetch("https://back-spider.vercel.app/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dadosLogin),
            });

            const result = await response.json();

            if (response.ok) {
                
                localStorage.setItem("usuarioId", result.user.id); // salva apenas o ID

                alert("Login bem-sucedido!");
                window.location.href = "/SRC/Pages/screens/home.html";
            } else {
                alert(`Erro: ${result.message || result.error || "Algo deu errado"}`);
            }
        } catch (error) {
            console.error("Erro ao fazer a requisição:", error);
            alert("Erro ao conectar ao servidor. Tente novamente.");
        }
    }

    button.addEventListener("click", loginUsuario);
    document.addEventListener("keypress", function (event) {
        if (event.key === "Enter") loginUsuario(event);
    });
});

















