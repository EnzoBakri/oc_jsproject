// Récupération des projets depuis le fichier JSON
const reponse = await fetch('http://localhost:5678/api/works');
const works = await reponse.json();

function generateWorks(works) {
    for (let i = 0; i < works.length; i++) {

        const article = works[i];
        // Récupération de l'élément du DOM qui accueillera les travaux
        const divGallery = document.querySelector(".gallery");
        // Création d'une balise dédiée à un projet
        const workElement = document.createElement("figure");
        // Création des balises
        const imageElement = document.createElement("img");
        imageElement.src = article.imageUrl;
        imageElement.crossOrigin = "Anonymous";
        const nameElement = document.createElement("figcaption");
        nameElement.innerText = article.title;
        // On rattache les éléments à leur parent
        divGallery.appendChild(workElement);
        workElement.appendChild(imageElement);
        workElement.appendChild(nameElement);
    }
}

generateWorks(works);

const buttons = [{
    id: 'all',
    categoryId: null
}, {
    id: 'objects',
    categoryId: 1
}, {
    id: 'apartment',
    categoryId: 2
}, {
    id: 'hotel-restaurant',
    categoryId: 3
},
]

buttons.forEach(button => {
    const buttonElement = document.getElementById(button.id)
    buttonElement.addEventListener("click", function () {
        document.querySelector(".gallery").innerHTML = "";
        if (button.categoryId === null) {
            generateWorks(works);
         } else {
            const filteredWorks = works.filter(work => work.categoryId === button.categoryId);
            generateWorks(filteredWorks);
         }
        
    });
})

const auth = window.sessionStorage.getItem("token");
if (auth !== null) {
    document.querySelector("#edit").style.display = null;
    document.querySelector("header").style.margin= "100px 0 50px 0";
    document.querySelector(".js-logout").innerHTML="logout";
    document.querySelector("#edit-intro-image").style.display= null;
    document.querySelector("#edit-intro-description").style.display= null;
    document.querySelector("#edit-portfolio").style.display= null;

    const logout = document.querySelector(".js-logout");
    logout.addEventListener("click", function (e) {
    e.preventDefault();
    window.sessionStorage.removeItem("token");
    window.location ="login.html";
})
}

let modal = null;

const openModal = function (e) {
    e.preventDefault();
    modal = document.querySelector(e.target.getAttribute('href'));
    modal.style.display = null;
    modal.removeAttribute('aria-hidden');
    modal.setAttribute('aria-modal', 'true');
    modal.addEventListener('click', closeModal);
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal);
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation);
}

const closeModal = function (e) {
    if (modal === null) return
    e.preventDefault();
    modal.style.display = "none";
    modal.setAttribute('aria-hidden', 'true');
    modal.removeAttribute('aria-modal');
    modal.removeEventListener('click', closeModal);
    modal.querySelector('.js-modal-close').removeEventListener('click', closeModal);
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation);
    modal = null;
}

const stopPropagation = function (e) {
    e.stopPropagation();
}

document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', openModal);
})

window.addEventListener('keydown', function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e);
    }
})

function generateWorksModal(works) {
    for (let i = 0; i < works.length; i++) {

        const article = works[i];
        // Récupération de l'élément du DOM qui accueillera les travaux
        const divModal = document.querySelector(".modal-wrapper-container");
        // Création d'une balise dédiée à un projet
        const modalElement = document.createElement("figure");
        modalElement.id = "figureModal";
        // Création des balises
        const imageModal = document.createElement("img");
        imageModal.src = article.imageUrl;
        imageModal.crossOrigin = "Anonymous";

        const divIcons = document.createElement("div");
        divIcons.setAttribute("class", "modal-icons");

        const trashIcon = document.createElement("i");
        trashIcon.setAttribute("class", "fa-solid fa-trash-can fa-xs");

        const crossIcon = document.createElement("i");
        crossIcon.setAttribute("class", "fa-solid fa-arrows-up-down-left-right fa-xs");
        crossIcon.id = "crossIconModal";

        const editModal = document.createElement("p");
        editModal.innerText = "éditer";

        // On rattache les éléments à leur parent
        divModal.appendChild(modalElement);
        modalElement.appendChild(imageModal);
        modalElement.appendChild(divIcons);
        divIcons.appendChild(crossIcon);
        divIcons.appendChild(trashIcon);
        modalElement.appendChild(editModal);

    }
}

generateWorksModal(works);