async function getData() {
  try {
    const res = await fetch("http://localhost:5678/api/works");

    if (!res.ok) {
      const message = `An error has occured: ${res.status} - ${res.statusText}`;
      throw new Error(message);
    } else {
      const data = await res.json();
      return data;
    }
  } catch (error) {
    console.log("Error: " + error);
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
    imageElement.setAttribute("alt", "Sophie Bluel project");
    imageElement.crossOrigin = "Anonymous";

    const nameElement = document.createElement("figcaption");
    nameElement.innerText = article.title;

    divGallery.appendChild(workElement);
    workElement.appendChild(imageElement);
    workElement.appendChild(nameElement);
  }
}

generateWorks();

async function filterWorks() {
  const works = await getData();
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
}

function initEditMod() {
  const auth = window.sessionStorage.getItem("token");
  const connectMsg = document.getElementById("connected-message");
  if (auth !== null) {
    document.getElementById("edit").style.display = "flex";
    document.querySelector("header").style.margin = "100px 0 50px 0";
    document.querySelector(".js-logout").innerHTML = "logout";
    document.getElementById("edit-intro-image").style.display = "flex";
    document.getElementById("edit-intro-description").style.display = "flex";
    document.getElementById("edit-portfolio").style.display = "flex";
    connectMsg.style.display = "flex";
    setTimeout(function () {
      connectMsg.style.display = "none";
    }, 5000);

    const logout = document.querySelector(".js-logout");
    logout.addEventListener("click", function (e) {
      e.preventDefault();
      window.sessionStorage.removeItem("token");
      window.location = "login.html";
    });
  }
}

initEditMod();

async function generateWorksModal(worksToDisplayModal) {
  const works = worksToDisplayModal ? worksToDisplayModal : await getData();
  for (let i = 0; i < works.length; i++) {
    const article = works[i];

    const divModal = document.querySelector(".modal-wrapper-container");

    const modalElement = document.createElement("figure");
    modalElement.id = "figureModal";
    modalElement.dataset.id = article.id;
    modalElement.classList.add("js-figureModal");

    const imageModal = document.createElement("img");
    imageModal.src = article.imageUrl;
    imageModal.setAttribute("alt", "Sophie Bluel project");
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

generateWorksModal();

async function removeItems() {
  const deleteIcons = document.querySelectorAll(".fa-trash-can");
  for (let i = 0; i < deleteIcons.length; i++) {
    deleteIcons[i].addEventListener("click", async function (e) {
      e.preventDefault();
      const id = event.target.dataset.id;
      console.log(id);
      const deleteMethod = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${sessionStorage["token"]}`,
          "Content-Type": "application/json",
        },
      };
      try {
        const res = await fetch(
          `http://localhost:5678/api/works/${id}`,
          deleteMethod
        );

        if (!res.ok) {
          const message = "Error with Status code: " + res.status;
          throw new Error(message);
        } else {
          console.log(res);
          const addedWork = document.getElementById("add-message");
          addedWork.innerHTML =
            '<i class="fa-solid fa-circle-check fa-xl"></i>';
          setTimeout(function () {
            addedWork.style.display = "none";
          }, 5000);
          clearAll();
          generateWorks();
          generateWorksModal();
          run();
        }
      } catch (error) {
        console.log("Error: " + error);
      }
    });
  }
}

function validateTitleNewWork() {
  const titleError = document.getElementById("title-error");
  const title = document.getElementById("title");
  title.addEventListener("keyup", function (e) {
    e.preventDefault();
    if (title.value.length == 0) {
      titleError.innerHTML = "Required";
      return false;
    } else {
      titleError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
      return true;
    }
  });
}

validateTitleNewWork();

const leftArrowIcon = document.querySelector(".fa-arrow-left");
const modalWrapperIcons = document.querySelector(".modal-wrapper-icon");
const modalWrapperTitle = document.querySelector(".modal-wrapper-title h2");
const modalWrapperContainer = document.querySelector(
  ".modal-wrapper-container"
);
const modal2WrapperContainer = document.querySelector(
  ".modal2-wrapper-container"
);
const modalButton = document.getElementById("add-photo");
const modalLink = document.getElementById("modal-Deletelink");
const modalWrapper = document.querySelector(".modal-wrapper");
const modalWrapperHrTag = document.getElementById("js-hrTag");

function switchModalAdd() {
  modalButton.addEventListener("click", function (event) {
    event.preventDefault();
    modalWrapperContainer.style.display = "none";
    modal2WrapperContainer.style.display = "flex";
    leftArrowIcon.style.display = "flex";
    modalWrapperTitle.innerText = "Ajout photo";
    modalLink.style.display = "none";
    modalButton.style.display = "none";
    modalWrapperHrTag.style.display = "none";
  });
  return null;
}

switchModalAdd();

function switchBackModal() {
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
  return null;
}

switchBackModal();

async function submitForm() {
  const submitError = document.getElementById("modalSubmit-error");
  const preview = document.getElementById("preview");
  const icon = document.querySelector(".add-photo-container i");
  const label = document.querySelector(".add-photo-container label");
  const paragraph = document.querySelector(".add-photo-container p");
  document
    .getElementById("submit")
    .addEventListener("click", async function (event) {
      event.preventDefault();
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
        const res = await fetch("http://localhost:5678/api/works", {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });
        if (!res.ok) {
          submitError.style.display = "block";
          submitError.innerHTML = "Informations manquantes";
          setTimeout(function () {
            submitError.style.display = "none";
          }, 5000);
          const message = `An error has occured: ${res.status} - ${res.statusText}`;
          throw new Error(message);
        } else {
          const data = await res.json();
          const addedWork = document.getElementById("add-message");
          addedWork.innerHTML =
            '<i class="fa-solid fa-circle-check fa-xl"></i>';
          setTimeout(function () {
            addedWork.style.display = "none";
          }, 5000);
          addElement(data);
          addElementModal(data);
          run();
          preview.style.display = "none";
          icon.style.display = "flex";
          label.style.display = "flex";
          paragraph.style.display = "flex";
          modalWrapperContainer.style.display = "flex";
          modal2WrapperContainer.style.display = "none";
          leftArrowIcon.style.display = "none";
          modalWrapperTitle.innerText = "Galerie photo";
          modalLink.style.display = null;
          modalButton.style.display = "flex";
          modalWrapperHrTag.style.display = "flex";
        }
      } catch (error) {
        console.log("Error: " + error);
      }
    });
}

submitForm();

async function addElement(worksToDisplay) {
  const works = worksToDisplay ? worksToDisplay : await getData();
  const divGallery = document.querySelector(".gallery");
  const newFigure = document.createElement("figure");
  newFigure.innerHTML = `<img src="${works.imageUrl}" alt="Sophie Bluel project" crossOrigin = "Anonymous"><figcaption>${works.title}</figcaption>`;
  divGallery.appendChild(newFigure);
}

async function addElementModal(worksToDisplayModal) {
  const works = worksToDisplayModal ? worksToDisplayModal : await getData();
  const divModal = document.querySelector(".modal-wrapper-container");
  const newFigure = document.createElement("figure");
  newFigure.id = "figureModal";
  newFigure.classList.add("js-figureModal");
  newFigure.innerHTML = `<img src="${works.imageUrl}" alt="Sophie Bluel project" crossOrigin = "Anonymous">
  <div class="modal-icons">
  <i class="fa-solid fa-arrows-up-down-left-right fa-xs" id="crossIconModal"></i>
  <i class="fa-solid fa-trash-can fa-xs" data-id="${works.id}"></i>
  </div>
  <p>éditer</p>`;
  divModal.appendChild(newFigure);
}

function clearAll() {
  document.querySelector(".gallery").innerHTML = "";
  document.querySelector(".modal-wrapper-container").innerHTML = "";
}

async function run() {
  const works = await getData();
  filterWorks(works);
  removeItems();
}

run();
