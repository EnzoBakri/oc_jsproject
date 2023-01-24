let modal = null;

// Open Modal

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

// Close Modal

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

document.querySelectorAll(".js-modal").forEach((a) => {
  a.addEventListener("click", openModal);
});

window.addEventListener("keydown", function (e) {
  if (e.key === "Escape" || e.key === "Esc") {
    closeModal(e);
  }
});

// Stop propagation in modal

const stopPropagation = function (e) {
  e.stopPropagation();
};

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
const modalButton = document.getElementById("add-photo");
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
