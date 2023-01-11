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

const auth = window.localStorage.getItem("token");
if (auth === null) {
    console.log("test");
} else {
    document.querySelector(".edit").style.display = "flex";
    document.querySelector(".header").style.margin= "100px 0 50px 0";
    document.querySelector(".edit-intro-image").style.display="flex";
    document.querySelector(".edit-intro-description").style.display="flex";
    document.querySelector(".edit-portfolio").style.display="flex";
}