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
    inputTextPost.id = "inputTextoPost"

    const inputImagemPost = document.createElement("input")
    inputImagemPost.placeholder = "Image Link of post..."
    inputImagemPost.id = "inputImagemPost"

    const inputLocationPost = document.createElement("input")
    inputLocationPost.placeholder = "Location..."
    inputLocationPost.id = "inputLocationPost"

    botaoVoltar.appendChild(xVoltar)

    cardPost.appendChild(botaoVoltar)
    cardPost.appendChild(inputTextoPost)
    cardPost.appendChild(inputImagemPost)
    cardPost.appendChild(inputLocationPost)

    main.appendChild(cardPost)
}

botaoPublish.addEventListener("click", criarPostTela)