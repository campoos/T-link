"use strict"

async function fazerLogin(email, senha) {
    try {
        const resposta = await fetch("https://back-spider.vercel.app/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, senha })
        });

        // Verifica se o status é 200 (sucesso no login)
        if (resposta.status !== 200) {
            throw new Error(`Erro no login: ${resposta.status}`);
        }

        // Converte a resposta para JSON
        const dados = await resposta.json();

        // Pegando os dados do usuário dentro do objeto 'user'
        if (!dados.user) {
            throw new Error("Dados do usuário não encontrados.");
        }

        const usuarioLogado = {
            nome: dados.user.nome,
            email: dados.user.email,
            foto: dados.user.imagemPerfil
        };

        console.log("Login bem-sucedido!", usuarioLogado);

        return usuarioLogado; // Retorna os dados para serem usados na tela
    } catch (erro) {
        console.error("Erro ao efetuar login:", erro.message);
        return null;
    }
}


function atualizarPerfilNaTela(usuario) {
    document.querySelector(".mainPerfilNome input").value = usuario.nome;
    document.querySelector(".mainPerfilNomeUsuario input").value = usuario.email;
    document.querySelector(".headerMainPerfil .Buttons img").src = usuario.foto;
}
// Testando com um usuário (troque pelos dados reais)
fazerLogin("vitor@jesus.com", "vitor");
