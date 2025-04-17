'use strict';

const userId = parseInt(localStorage.getItem("usuarioId"));

// Carrega os dados do usuário
async function carregarDadosUsuario() {
    try {
        const response = await fetch("https://back-spider.vercel.app/user/listarUsers");
        const data = await response.json();

        const usuario = data.find(user => user.id === userId);

        if (usuario) {
            document.querySelector('input[placeholder="Nome do usuario"]').value = usuario.nome;
            document.querySelector('input[placeholder="Email do usuario"]').value = usuario.email;
            document.querySelector('input[placeholder="Coloque sua URL"]').value = usuario.imagemPerfil;

            document.querySelector('.profileImg img').src = usuario.imagemPerfil || '';
            document.querySelector('.Buttons img').src = usuario.imagemPerfil || '';
            document.querySelector('.descUserHeader p').textContent = usuario.nome || '';
        } else {
            alert("Usuário não encontrado.");
        }

    } catch (error) {
        console.error("Erro ao carregar dados:", error);
        alert("Erro ao buscar dados do usuário.");
    }
}

// Salva as alterações
async function salvarAlteracoes() {
    const nome = document.querySelector('input[placeholder="Nome do usuario"]').value;
    const email = document.querySelector('input[placeholder="Email do usuario"]').value;
    const imagemPerfil = document.querySelector('input[placeholder="Coloque sua URL"]').value;
    const novaSenha = document.querySelector('input[placeholder="Senha do usuario"]').value;
    const novaSenhaRecuperacao = document.querySelector('input[placeholder="Senha de recuperação"]').value;

    // Atualiza nome, email e imagem de perfil
    const dadosAtualizados = {
        nome,
        email,
        imagemPerfil
    };

    if (novaSenhaRecuperacao.length > 0) {
        dadosAtualizados.senhaRecuperacao = novaSenhaRecuperacao;
    }

    try {
        const response = await fetch(`https://back-spider.vercel.app/user/atualizarUser/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosAtualizados)  // Envia os dados de nome, email, imagem e senha de recuperação
        });

        if (response.ok) {
            alert(`Dados atualizados com sucesso!`);
        } else {
            alert("Erro ao atualizar os dados. Verifique os campos.");
        }

    } catch (error) {
        console.error("Erro de conexão:", error);
        alert("Erro ao conectar com o servidor.");
    }

    // Atualiza a senha (se fornecida)
    if (novaSenha.length > 0) {
        await atualizarSenha(novaSenha);
    }
}

// Atualiza a senha
async function atualizarSenha(novaSenha) {
    try {
        const response = await fetch(`https://back-spider.vercel.app/user/newPassword/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ senha: novaSenha })  // Envia apenas a nova senha
        });

        const resultado = await response.json();

        if (response.ok) {
            alert(`Senha atualizada com sucesso!\n\nNova senha: ${novaSenha}`);

        } else {
            alert("Erro ao atualizar a senha.");
        }

    } catch (error) {
        console.error("Erro de conexão ao atualizar senha:", error);
        alert("Erro ao conectar com o servidor ao atualizar a senha.");
    }
}

// Inicializa
carregarDadosUsuario();
document.querySelector('.buttonSaveChanges button').addEventListener('click', salvarAlteracoes);
