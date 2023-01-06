// Récupération des travaux depuis le fichier JSON
const reponse = await fetch('http://localhost:5678/api/works');
const works = await reponse.json();

// Création des balises
const article = works[0];

for (let i = 0; i < works.length; i++) {

    // Récupération de l'élément du DOM qui accueillera les travaux
    const divGallery = document.querySelector(".gallery");

    // Création d'une balise dédiée à un travail
    const workElement = document.createElement("figure");

    // On créé l'élément img.
    const  imageElement = document.createElement("img");

    // On accède à l'indice i de la liste works pour configurer la source de l'image.
    imageElement.src = works[i].imageUrl;
    imageElement.crossOrigin = "Anonymous";
    
    // Idem pour le nom
    const  nomElement = document.createElement("figcaption");
    nomElement.innerText = works[i].title;
    
    // On rattache la balise figure à la div Gallery
    divGallery.appendChild(workElement);

    // On rattache l'image à workElement (la balise figure)
    workElement.appendChild(imageElement);

    // Idem pour le nom
    workElement.appendChild(nomElement);
}
