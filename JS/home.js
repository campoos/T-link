var profileImg = document.querySelector(".profileImg");
var userMenu = document.getElementById("userMenu");
const botaoPublish = document.getElementById("buttonPostar");

profileImg.addEventListener("click", function (event) {
    // Alterna a visibilidade do menu
    if (userMenu.style.display === "none" || userMenu.style.display === "") {
        userMenu.style.display = "block";
    } else {
        userMenu.style.display = "none";
    }
    event.stopPropagation(); // Impede que o clique se propague para o document
});

// Fecha o menu ao clicar fora dele
document.addEventListener("click", function (event) {
    if (!userMenu.contains(event.target) && !profileImg.contains(event.target)) {
        userMenu.style.display = "none";
    }
});

function criarPostTela(){
    const inputTextPost = document.getElementById("inputTextoPost").value
    const main = document.getElementById('main')

    const cardPost = document.createElement('div')
    cardPost.id = "cardPost"

    const botaoVoltar = document.createElement("a")
    botaoVoltar.href = "/SRC/Pages/screens/home.html"

    const xVoltar = document.createElement('img')
    xVoltar.src = "/SRC/imgs/assets/X.png"
    xVoltar.id = "xVoltar"

    const inputTextoPost = document.createElement("input")
    inputTextoPost.placeholder = "What's in your mind?"
    inputTextoPost.id = "inputTextoPost"
    inputTextoPost.value = inputTextPost

    const inputImagemPost = document.createElement("input")
    inputImagemPost.placeholder = "Image Link of post..."
    inputImagemPost.id = "inputImagemPost"

    const inputLocationPost = document.createElement("input")
    inputLocationPost.placeholder = "Location..."
    inputLocationPost.id = "inputLocationPost"

    const divBotao = document.createElement('div')
    divBotao.id = "divBotao"

    const botaoPostar = document.createElement("button")
    botaoPostar.id = "botaoPostar"
    botaoPostar.textContent = "Publish"

    divBotao.appendChild(botaoPostar)

    botaoVoltar.appendChild(xVoltar)

    cardPost.appendChild(botaoVoltar)
    cardPost.appendChild(inputTextoPost)
    cardPost.appendChild(inputImagemPost)
    cardPost.appendChild(inputLocationPost)
    cardPost.appendChild(divBotao)

    main.appendChild(cardPost)
}

async function pegarPosts(){
    try {
        const response = await fetch("https://back-spider.vercel.app/publicacoes/listarPublicacoes")

        const result = await response.json();

        if (result){
            return result
        }else {
            alert("deu errado")
        }

    } catch (error) {
        console.error("Erro ao fazer a requisição");
        alert("Erro ao conectar ao servidor. Tente novamente.");
    }
}

async function pegarUsuarios(){
    try {
        const response = await fetch("https://back-spider.vercel.app/user/listarUsers")

        const result = await response.json();

        if (result){
            return result
        }else {
            alert("deu errado")
        }

    } catch (error) {
        console.error("Erro ao fazer a requisição");
        alert("Erro ao conectar ao servidor. Tente novamente.");
    }
}

async function gerarPosts() {
    const dadosPosts = await pegarPosts(); // Espera os dados antes de continuar
    const dadosUsuarios = await pegarUsuarios(); // Espera os dados antes de continuar

    if (dadosPosts) {
        const mainElement = document.querySelector("main"); // Seleciona o elemento <main> onde os posts serão gerados

        dadosPosts.forEach(post => {
            // Criação do div principal para cada post
            const postUserDiv = document.createElement("div");
            postUserDiv.classList.add("postUsers");

            // Criação do conteúdo do post
            const conteudoPostDiv = document.createElement("div");
            conteudoPostDiv.classList.add("conteudoPost");

            // Criação das informações do usuário
            const infoUserDiv = document.createElement("div");
            infoUserDiv.classList.add("infoUser");

            // Criação da imagem do perfil do usuário
            const profileImgDiv = document.createElement("div");
            profileImgDiv.classList.add("profileImg");
            const profileImg = document.createElement("img");
            profileImg.src = "/SRC/imgs/assets/userIcon.png"; // Substitua com a URL da imagem do usuário, se disponível
            profileImg.alt = "User Profile";
            profileImgDiv.appendChild(profileImg);

            // Container do nome, data e local do post
            const containerPostDiv = document.createElement("div");
            containerPostDiv.classList.add("containerPost");

            // Nome do usuário
            const userNameDiv = document.createElement("div");
            userNameDiv.classList.add("userName");
            const userNameP = document.createElement("p");
            userNameP.textContent = "User"; // Substitua com o nome do usuário se disponível
            userNameDiv.appendChild(userNameP);

            // Data do post
            const datePostDiv = document.createElement("div");
            datePostDiv.classList.add("datePost");
            const datePostSpan = document.createElement("span");
            datePostSpan.textContent = post.dataPublicacao; // Data da publicação
            datePostDiv.appendChild(datePostSpan);

            // Local do post
            const localPostDiv = document.createElement("div");
            localPostDiv.classList.add("localPost");
            const localPostImg = document.createElement("img");
            localPostImg.src = "/SRC/imgs/assets/earth.png"; // Ícone de localização (substitua conforme necessário)
            localPostImg.alt = "Location Icon";
            localPostImg.id = "earthIcon"
            localPostDiv.appendChild(localPostImg);
            const localPostSpan = document.createElement("span");
            localPostSpan.textContent = post.local; // Local da publicação
            localPostDiv.appendChild(localPostSpan);

            // Adicionando as partes da "infoUser"
            containerPostDiv.appendChild(userNameDiv);
            containerPostDiv.appendChild(datePostDiv);
            containerPostDiv.appendChild(localPostDiv);
            infoUserDiv.appendChild(profileImgDiv);
            infoUserDiv.appendChild(containerPostDiv);

            // Descrição do post
            const descPostDiv = document.createElement("div");
            descPostDiv.classList.add("descPost");
            const descPostSpan = document.createElement("span");
            descPostSpan.textContent = post.descricao; // Descrição do post
            descPostDiv.appendChild(descPostSpan);

            // Imagem do post
            const imgPostDiv = document.createElement("div");
            imgPostDiv.classList.add("imgPost");
            const imgPost = document.createElement("img");
            imgPost.src = post.imagem; // Imagem do post
            imgPost.alt = "Post Image";
            imgPostDiv.appendChild(imgPost);

            // Interações do post (curtidas e comentários)
            const interationUserDiv = document.createElement("div");
            interationUserDiv.classList.add("interationUser");

            // Curtidas (Verificar se 'curtidas' está definido)
            const likeDiv = document.createElement("div");
            likeDiv.classList.add("like");
            const likeImg = document.createElement("img");
            likeImg.src = "/SRC/imgs/assets/likeIcon.png"; // Ícone de curtidas
            likeImg.alt = "Like Icon";
            likeDiv.appendChild(likeImg);
            const likeP = document.createElement("p");
            likeP.textContent = post.curtidas ? post.curtidas.length : 0; // Verifica se 'curtidas' existe, senão atribui 0
            likeDiv.appendChild(likeP);

            // Comentários (Verificar se 'comentarios' está definido)
            const commentDiv = document.createElement("div");
            commentDiv.classList.add("comment");
            const commentImg = document.createElement("img");
            commentImg.src = "/SRC/imgs/assets/commentsIcon.png"; // Ícone de comentários
            commentImg.alt = "Comment Icon";
            commentDiv.appendChild(commentImg);
            const commentP = document.createElement("p");
            commentP.textContent = post.comentarios ? post.comentarios.length : 0; // Verifica se 'comentarios' existe, senão atribui 0
            commentDiv.appendChild(commentP);

            // Adicionando as partes da "interationUser"
            interationUserDiv.appendChild(likeDiv);
            interationUserDiv.appendChild(commentDiv);

            // Juntando tudo no "conteudoPost"
            conteudoPostDiv.appendChild(infoUserDiv);
            conteudoPostDiv.appendChild(descPostDiv);
            conteudoPostDiv.appendChild(imgPostDiv);
            conteudoPostDiv.appendChild(interationUserDiv);

            // Adicionando o "conteudoPost" no "postUserDiv"
            postUserDiv.appendChild(conteudoPostDiv);

            // Adicionando o post completo no <main>
            mainElement.appendChild(postUserDiv);
        });
    }
}



document.addEventListener('DOMContentLoaded', function() {
    gerarPosts()
});


botaoPublish.addEventListener("click", criarPostTela)