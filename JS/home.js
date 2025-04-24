var profileImg = document.querySelector(".profileImg");
var userMenu = document.getElementById("userMenu");
const botaoPublish = document.getElementById("buttonPostar");

profileImg.addEventListener("click", function (event) {
    userMenu.style.display = userMenu.style.display === "block" ? "none" : "block";
    event.stopPropagation();
});

document.addEventListener("click", function (event) {
    if (!userMenu.contains(event.target) && !profileImg.contains(event.target)) {
        userMenu.style.display = "none";
    }
});

async function novoPost() {
    const descricaoInput = document.getElementById("inputTextoPost").value;
    const imagemInput = document.getElementById("inputImagemPost").value;
    const localInput = document.getElementById("inputLocationPost").value;

    const dadosTotal = JSON.parse(localStorage.getItem("todosDados"));

    const dataAtual = new Date();
    const dataFormatada = `${String(dataAtual.getDate()).padStart(2, '0')}/${String(dataAtual.getMonth() + 1).padStart(2, '0')}/${dataAtual.getFullYear()}`;

    const jsonInformacoes = {
        descricao: descricaoInput,
        dataPublicacao: dataFormatada,
        imagem: imagemInput,
        local: localInput,
        idUsuario: dadosTotal.id
    };

    console.log(jsonInformacoes);

    try {
        const response = await fetch("https://back-spider.vercel.app/publicacoes/cadastrarPublicacao", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jsonInformacoes)
        });

        const dados = await response.json();

        if (dados.message === "Todos os campos são obrigatórios") {
            alert("Não foi possível postar");
        } else {
            alert("Post feito");
            window.location.reload(); // recarrega a página para mostrar o novo post
        }
    } catch (error) {
        console.error("Erro ao postar", error);
        alert("Erro ao tentar postar. Tente novamente mais tarde.");
    }
}

function criarPostTela(descricaoInicial = "") {
    const main = document.getElementById('main');

    const cardPost = document.createElement('div');
    cardPost.id = "cardPost";

    const botaoVoltar = document.createElement("a");
    botaoVoltar.href = "/SRC/Pages/screens/home.html";

    const xVoltar = document.createElement('img');
    xVoltar.src = "/SRC/imgs/assets/X.png";
    xVoltar.id = "xVoltar";

    const inputTextoPost = document.createElement("input");
    inputTextoPost.placeholder = "What's in your mind?";
    inputTextoPost.id = "inputTextoPost";
    inputTextoPost.required = true;
    inputTextoPost.value = descricaoInicial;

    const inputImagemPost = document.createElement("input");
    inputImagemPost.placeholder = "Image Link of post...";
    inputImagemPost.id = "inputImagemPost";
    inputImagemPost.required = true;

    const inputLocationPost = document.createElement("input");
    inputLocationPost.placeholder = "Location...";
    inputLocationPost.id = "inputLocationPost";
    inputLocationPost.required = true;

    const divBotao = document.createElement('div');
    divBotao.id = "divBotao";

    const botaoPostar = document.createElement("button");
    botaoPostar.id = "botaoPostar";
    botaoPostar.textContent = "Publish";

    botaoPostar.addEventListener("click", novoPost);

    divBotao.appendChild(botaoPostar);
    botaoVoltar.appendChild(xVoltar);

    cardPost.appendChild(botaoVoltar);
    cardPost.appendChild(inputTextoPost);
    cardPost.appendChild(inputImagemPost);
    cardPost.appendChild(inputLocationPost);
    cardPost.appendChild(divBotao);

    main.appendChild(cardPost);
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

async function buscarUsuarioPorId(id) {
    try {
        const resposta = await fetch(`https://back-spider.vercel.app/user/pesquisarUser/${id}`);
        if (!resposta.ok) throw new Error("Erro ao buscar usuário");
        const usuario = await resposta.json();
        return usuario;
    } catch (erro) {
        console.error("Erro ao buscar usuário:", erro);
        return null;
    }
}




async function gerarPosts() {
    const dadosPosts = await pegarPosts();
    const dadosUsuarios = await pegarUsuarios();

    if (dadosPosts && dadosUsuarios) {
        const mainElement = document.querySelector("main");

        dadosPosts.forEach(post => {
            const usuarioPost = dadosUsuarios.find(user => user.id === post.idUsuario);
        
            
            // Div principal
            const postUserDiv = document.createElement("div");
            postUserDiv.classList.add("postUsers");
        
            const conteudoPostDiv = document.createElement("div");
            conteudoPostDiv.classList.add("conteudoPost");
        
            const infoUserDiv = document.createElement("div");
            infoUserDiv.classList.add("infoUser");
        
            const profileImgDiv = document.createElement("div");
            profileImgDiv.classList.add("profileImg");
            const profileImg = document.createElement("img");
            profileImg.src = usuarioPost?.imagemPerfil || "/SRC/imgs/assets/userIcon.png";
            profileImg.alt = "User Profile";
            profileImgDiv.appendChild(profileImg);
        
            const containerPostDiv = document.createElement("div");
            containerPostDiv.classList.add("containerPost");
        
            const userNameDiv = document.createElement("div");
            userNameDiv.classList.add("userName");
            const userNameP = document.createElement("p");
            userNameP.textContent = usuarioPost?.nome || "Usuário Desconhecido";
            userNameDiv.appendChild(userNameP);
        
            const datePostDiv = document.createElement("div");
            datePostDiv.classList.add("datePost");
            const datePostSpan = document.createElement("span");
            datePostSpan.textContent = post.dataPublicacao;
            datePostDiv.appendChild(datePostSpan);
        
            const localPostDiv = document.createElement("div");
            localPostDiv.classList.add("localPost");
            const localPostImg = document.createElement("img");
            localPostImg.src = "/SRC/imgs/assets/earth.png";
            localPostImg.alt = "Location Icon";
            localPostImg.id = "earthIcon";
            localPostDiv.appendChild(localPostImg);
            const localPostSpan = document.createElement("span");
            localPostSpan.textContent = post.local;
            localPostDiv.appendChild(localPostSpan);
        
            containerPostDiv.appendChild(userNameDiv);
            containerPostDiv.appendChild(datePostDiv);
            containerPostDiv.appendChild(localPostDiv);
        
            infoUserDiv.appendChild(profileImgDiv);
            infoUserDiv.appendChild(containerPostDiv);
        
            const descPostDiv = document.createElement("div");
            descPostDiv.classList.add("descPost");
            const descPostSpan = document.createElement("span");
            descPostSpan.textContent = post.descricao;
            descPostDiv.appendChild(descPostSpan);
        
            const imgPostDiv = document.createElement("div");
            imgPostDiv.classList.add("imgPost");
            const imgPost = document.createElement("img");
            imgPost.src = post.imagem;
            imgPost.alt = "Post Image";
            imgPostDiv.appendChild(imgPost);
        
            const interationUserDiv = document.createElement("div");
            interationUserDiv.classList.add("interationUser");
        
            const likeDiv = document.createElement("div");
            likeDiv.classList.add("like");
            const likeImg = document.createElement("img");
            likeImg.src = "/SRC/imgs/assets/likeIcon.png";
            likeImg.alt = "Like Icon";
            likeDiv.appendChild(likeImg);
            const likeP = document.createElement("p");
            likeP.textContent = post.curtidas ? post.curtidas.length : 0;
            likeDiv.appendChild(likeP);
        
            const commentDiv = document.createElement("div");
            commentDiv.classList.add("comment");
            const commentImg = document.createElement("img");
            commentImg.src = "/SRC/imgs/assets/commentsIcon.png";
            commentImg.alt = "Comment Icon";
            commentDiv.appendChild(commentImg);
            const commentP = document.createElement("p");
            commentP.textContent = post.comentarios ? post.comentarios.length : 0;
            commentDiv.appendChild(commentP);
        
            interationUserDiv.appendChild(likeDiv);
            interationUserDiv.appendChild(commentDiv);
        
            conteudoPostDiv.appendChild(infoUserDiv);
            conteudoPostDiv.appendChild(descPostDiv);
            conteudoPostDiv.appendChild(imgPostDiv);
            conteudoPostDiv.appendChild(interationUserDiv);
        
            postUserDiv.appendChild(conteudoPostDiv);
            mainElement.appendChild(postUserDiv);
        });
    }
}

async function ColocarFotinha(){
    const NovoUser = document.getElementById('nomeUser')
    const NovaIMG = document.getElementById('fotinha')

    
    const dadosTotal = JSON.parse(localStorage.getItem("todosDados"));
    console.log(dadosTotal)
    try {
    NovoUser.textContent = dadosTotal.nome
    NovaIMG.src = dadosTotal.imagemPerfil
    } catch (error) {
    
}    
}

document.addEventListener('DOMContentLoaded', function() {
    gerarPosts()
    ColocarFotinha()
});

botaoPublish.addEventListener("click", function () {
    const descricaoDigitada = document.getElementById("inputTextoPostHome").value;
    criarPostTela(descricaoDigitada);
});



























