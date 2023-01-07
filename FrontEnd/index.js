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
        const  imageElement = document.createElement("img");
        imageElement.src = article.imageUrl;
        imageElement.crossOrigin = "Anonymous";
        const  nomElement = document.createElement("figcaption");
        nomElement.innerText = article.title;
        // On rattache les éléments à leur parent
        divGallery.appendChild(workElement);
        workElement.appendChild(imageElement);
        workElement.appendChild(nomElement);
    }
}

generateWorks(works);

// Gestion des boutons
const allButton = document.querySelector("#all");

allButton.addEventListener("click", function() {
    document.querySelector(".gallery").innerHTML = "";
    generateWorks(works);
});

const objectsButton = document.querySelector("#objects");

objectsButton.addEventListener("click", function() {
    const filteredWorks = works.filter(function(work) {
        return work.categoryId === 1;
    });
    document.querySelector(".gallery").innerHTML = "";
    generateWorks(filteredWorks);
});

const apartmentButton = document.querySelector("#apartment");

apartmentButton.addEventListener("click", function() {
    const filteredWorks = works.filter(function(work) {
        return work.categoryId === 2;
    });
    document.querySelector(".gallery").innerHTML = "";
    generateWorks(filteredWorks);
});

const hotelRestaurantButton = document.querySelector("#hotel-restaurant");

hotelRestaurantButton.addEventListener("click", function() {
    const filteredWorks = works.filter(function(work) {
        return work.categoryId === 3;
    });
    document.querySelector(".gallery").innerHTML = "";
    generateWorks(filteredWorks);
});