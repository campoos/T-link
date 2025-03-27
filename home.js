document.addEventListener("DOMContentLoaded", function () {
    var profileImg = document.querySelector(".profileImg");
    var userMenu = document.getElementById("userMenu");

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
});
