// Récupération des projets depuis le fichier JSON
const response = await fetch("http://localhost:5678/api/works");
const works = await response.json();

// Generate project in gallery

function generateWorks(works) {
  for (let i = 0; i < works.length; i++) {
    const article = works[i];

    const divGallery = document.querySelector(".gallery");

    const workElement = document.createElement("figure");

    const imageElement = document.createElement("img");
    imageElement.src = article.imageUrl;
    imageElement.setAttribute("alt", "Sophie Bluel image of her project");
    imageElement.crossOrigin = "Anonymous";

    const nameElement = document.createElement("figcaption");
    nameElement.innerText = article.title;

    divGallery.appendChild(workElement);
    workElement.appendChild(imageElement);
    workElement.appendChild(nameElement);
  }
}

generateWorks(works);

// Filter

const buttons = [
  {
    id: "all",
    categoryId: null,
  },
  {
    id: "objects",
    categoryId: 1,
  },
  {
    id: "apartment",
    categoryId: 2,
  },
  {
    id: "hotel-restaurant",
    categoryId: 3,
  },
];

buttons.forEach((button) => {
  const buttonElement = document.getElementById(button.id);
  buttonElement.addEventListener("click", function () {
    document.querySelector(".gallery").innerHTML = "";
    if (button.categoryId === null) {
      generateWorks(works);
    } else {
      const filteredWorks = works.filter(
        (work) => work.categoryId === button.categoryId
      );
      generateWorks(filteredWorks);
    }
  });
});

// Edit Mod

const auth = window.sessionStorage.getItem("token");
if (auth !== null) {
  document.querySelector("#edit").style.display = null;
  document.querySelector("header").style.margin = "100px 0 50px 0";
  document.querySelector(".js-logout").innerHTML = "logout";
  document.querySelector("#edit-intro-image").style.display = null;
  document.querySelector("#edit-intro-description").style.display = null;
  document.querySelector("#edit-portfolio").style.display = null;

  const logout = document.querySelector(".js-logout");
  logout.addEventListener("click", function (e) {
    e.preventDefault();
    window.sessionStorage.removeItem("token");
    window.location = "login.html";
  });
}

// Open-Close Modal

let modal = null;

const openModal = function (e) {
  e.preventDefault();
  modal = document.querySelector(e.target.getAttribute("href"));
  modal.style.display = null;
  modal.removeAttribute("aria-hidden");
  modal.setAttribute("aria-modal", "true");
  modal.addEventListener("click", closeModal);
  modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .addEventListener("click", stopPropagation);
};

const closeModal = function (e) {
  if (modal === null) return;
  e.preventDefault();
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
  modal.removeEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-close")
    .removeEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .removeEventListener("click", stopPropagation);
  modal = null;
};

const stopPropagation = function (e) {
  e.stopPropagation();
};

document.querySelectorAll(".js-modal").forEach((a) => {
  a.addEventListener("click", openModal);
});

window.addEventListener("keydown", function (e) {
  if (e.key === "Escape" || e.key === "Esc") {
    closeModal(e);
  }
});

// Generate project in modal

function generateWorksModal(works) {
  /*
    const monTexte = 'Kévin'
    const maDiv = document.getElementById('root')
    maDiv.innerHTML = `<div>
        <p class="maClass">Coucou ${monTexte}</p>
    </div>
    `;*/

  for (let i = 0; i < works.length; i++) {
    const article = works[i];

    const divModal = document.querySelector(".modal-wrapper-container");

    const modalElement = document.createElement("figure");
    modalElement.id = "figureModal";
    modalElement.classList.add("js-figureModal");

    const imageModal = document.createElement("img");
    imageModal.src = article.imageUrl;
    imageModal.crossOrigin = "Anonymous";

    const divIcons = document.createElement("div");
    divIcons.setAttribute("class", "modal-icons");

    const trashIcon = document.createElement("i");
    trashIcon.setAttribute("class", "fa-solid fa-trash-can fa-xs");
    trashIcon.dataset.id = article.id;

    const crossIcon = document.createElement("i");
    crossIcon.setAttribute(
      "class",
      "fa-solid fa-arrows-up-down-left-right fa-xs"
    );
    crossIcon.id = "crossIconModal";

    const editModal = document.createElement("p");
    editModal.innerText = "éditer";

    divModal.appendChild(modalElement);
    modalElement.appendChild(imageModal);
    modalElement.appendChild(divIcons);
    divIcons.appendChild(crossIcon);
    divIcons.appendChild(trashIcon);
    modalElement.appendChild(editModal);
  }
}

generateWorksModal(works);

// Remove projects

function removeItems() {
  const deleteIcons = document.querySelectorAll(".fa-trash-can");

  for (let i = 0; i < deleteIcons.length; i++) {
    deleteIcons[i].addEventListener("click", async function (event) {
      const id = event.target.dataset.id;
      const deleteMethod = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${sessionStorage["token"]}`,
          "Content-Type": "application/json",
        },
      };
      try {
        const response = await fetch(
          `http://localhost:5678/api/works/${id}`,
          deleteMethod
        );
        return response;
      } catch (error) {
        console.log(error);
      }
    });
  }
}

removeItems();

// Switch Modal

const leftArrowIcon = document.querySelector(".fa-arrow-left");
const modalWrapperIcons = document.querySelector(".modal-wrapper-icon");
const modalWrapperTitle = document.querySelector(".modal-wrapper-title h2");
const modalWrapperContainer = document.querySelector(
  ".modal-wrapper-container"
);
const modal2WrapperContainer = document.querySelector(
  ".modal2-wrapper-container"
);
const modalButton = document.querySelector(".modal-wrapper button");
const modalLink = document.getElementById("modal-Deletelink");
const modalWrapper = document.querySelector(".modal-wrapper");
const modalWrapperHrTag = document.getElementById("js-hrTag");

modalButton.addEventListener("click", function (event) {
  event.preventDefault();
  modalWrapperContainer.style.display = "none";
  modal2WrapperContainer.style.display = "flex";
  leftArrowIcon.style.display = null;
  modalWrapperTitle.innerText = "Ajout photo";
  modalLink.style.display = "none";
  modalButton.style.display = "none";
  modalWrapperHrTag.style.display = "none";
});

leftArrowIcon.addEventListener("click", function (event) {
  event.preventDefault();
  modalWrapperContainer.style.display = null;
  modal2WrapperContainer.style.display = null;
  leftArrowIcon.style.display = "none";
  modalWrapperTitle.innerText = "Galerie photo";
  modalLink.style.display = null;
  modalButton.style.display = "flex";
  modalWrapperHrTag.style.display = "flex";
});

// Add project

async function submitForm() {
  const formAdd = document.getElementById("add-form");

  formAdd.addEventListener("submit", async function (event) {
    event.preventDefault();
    event.stopPropagation();
    // Récupération des valeurs des champs de formualire
    var fileInput = document.getElementById("file");
    var title = document.getElementById("title");
    var select = document.getElementById("category");
    var selectedOption = select.options[select.selectedIndex].value;

    var formData = new FormData();
    formData.append("image", fileInput.files[0]);
    formData.append("title", title.value);
    formData.append("category", selectedOption);

    var token = window.sessionStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });
      const data = await response.json();
      console.log("Success:", data);
    } catch (error) {
      console.log(error);
    }
  });
}

submitForm();