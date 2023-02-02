document.getElementById("file").addEventListener("change", previewImage);

function previewImage() {
  const fileInput = document.getElementById("file");
  const file = fileInput.files[0];
  const preview = document.getElementById("preview");

  const icon = document.querySelector(".add-photo-container i");
  const label = document.querySelector(".add-photo-container label");
  const paragraph = document.querySelector(".add-photo-container p");

  const reader = new FileReader();
  reader.onloadend = function () {
    preview.src = reader.result;
  };

  if (file) {
    reader.readAsDataURL(file);
    preview.style.display = "flex";
    icon.style.display = "none";
    label.style.display = "none";
    paragraph.style.display = "none";
  } else {
    preview.src = "";
  }
}
