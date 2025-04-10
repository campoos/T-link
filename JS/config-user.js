"use strict"

document.addEventListener("DOMContentLoaded", async () => {
    const userId = parseInt(localStorage.getItem("usuarioId"));

    try {
        const response = await fetch("https://back-spider.vercel.app/user/listarUsers");
        const data = await response.json();

        const usuario = data.find(user => user.id === userId);

        if (usuario) {
            document.querySelector('input[placeholder="Nome do usuario"]').value = usuario.nome;
            document.querySelector('input[placeholder="Email do usuario"]').value = usuario.email;
            document.querySelector('input[placeholder="Coloque sua URL"]').value = usuario.imagemPerfil;

            const profileImage = document.querySelector('.profileImg img');
            if (profileImage && usuario.imagemPerfil) {
                profileImage.src = usuario.imagemPerfil;
            }

            const imagemPreview = document.querySelector('.Buttons img');
            if (imagemPreview && usuario.imagemPerfil) {
                imagemPreview.src = usuario.imagemPerfil;
            }

            const nomeUsuarioTopo = document.querySelector('.descUserHeader p');
            if (nomeUsuarioTopo && usuario.nome) {
                nomeUsuarioTopo.textContent = usuario.nome;
            }

        } else {
            console.warn("Usuário com ID não encontrado.");
        }

    } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
    }
});
