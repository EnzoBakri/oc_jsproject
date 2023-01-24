async function getData() {
  try {
    const response = await fetch("http://localhost:5678/api/works");

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.log("Failed to get works from server");
    }
  } catch (error) {
    console.log("Error:", error);
  }
}

async function generateWorks(worksToDisplay) {
  const works = worksToDisplay ? worksToDisplay : await getData();

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

async function filterWorks(works) {
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
        generateWorks();
      } else {
        const filteredWorks = works.filter(
          (work) => work.categoryId === button.categoryId
        );
        generateWorks(filteredWorks);
      }
    });
  });
}

function initEditMod() {
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
}

async function generateWorksModal(works) {
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

function removeItems() {
  const deleteIcons = document.querySelectorAll(".fa-trash-can");
  for (let i = 0; i < deleteIcons.length; i++) {
    deleteIcons[i].addEventListener("click", async function (event) {
      event.preventDefault();
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
        if (response.ok) {
          const result = await response.json();
          console.log("Success: ", result);
          return result;
        } else {
          console.log("Error with deleting work");
        }
      } catch (error) {
        console.log(error);
      }
    });
  }
}

function submitForm() {
  document
    .getElementById("submit")
    .addEventListener("click", async function (event) {
      console.log("test");
      event.preventDefault();
      // Récupération des valeurs des champs de formualire
      const fileInput = document.getElementById("file");
      const title = document.getElementById("title");
      const select = document.getElementById("category");
      const selectedOption = select.options[select.selectedIndex].value;

      const formData = new FormData();
      formData.append("image", fileInput.files[0]);
      formData.append("title", title.value);
      formData.append("category", selectedOption);

      const token = window.sessionStorage.getItem("token");

      try {
        const response = await fetch("http://localhost:5678/api/works", {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });
        if (response.ok) {
          const result = await response.json();
          console.log("Success: ", result);
        } else {
          console.log("Failed to add work");
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    });
}

async function run() {
  const works = await getData();

  generateWorks(works);
  filterWorks(works);
  initEditMod();
  generateWorksModal(works);
  removeItems();
  submitForm();
}

run();
