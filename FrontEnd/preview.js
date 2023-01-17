document.getElementById("file").addEventListener("change", previewImage);

function previewImage() {
  var fileInput = document.getElementById("file");
  var file = fileInput.files[0];
  var preview = document.getElementById("preview");

  var icon = document.querySelector(".add-photo-container i");
  var label = document.querySelector(".add-photo-container label");
  var paragraph = document.querySelector(".add-photo-container p");

  var reader = new FileReader();
  reader.onloadend = function () {
    preview.src = reader.result;
  };

  if (file) {
    reader.readAsDataURL(file);
    preview.style.display = null;
    icon.style.display = "none";
    label.style.display = "none";
    paragraph.style.display = "none";
  } else {
    preview.src = "";
  }
}
