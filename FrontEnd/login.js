const emailError = document.getElementById('email-error');
const pswError = document.getElementById('psw-error');
const submitError = document.getElementById('submit-error');

function validateEmail() {
  const email = document.getElementById('email');
  email.addEventListener("keyup", function(e) {
    e.preventDefault();
    if(email.value.length == 0) {
      emailError.innerHTML = 'Email is required';
      return false;
    } else if(!email.value.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
      emailError.innerHTML = 'Email Invalid';
      return false;
    } else {
      emailError.innerHTML = '<i class="fa-solid fa-circle-check fa-lg"></i>';
      return true;
    }
  });
}

function validatePassword() {
  const psw = document.getElementById('psw');
  psw.addEventListener("keyup", function(e) {
    e.preventDefault();
    if(psw.value.length == 0) {
      pswError.innerHTML = 'Password is required';
      return false;
    } else if(!psw.value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/)) {
      pswError.innerHTML = 'Password Invalid';
      return false;
    } else {
      pswError.innerHTML = '<i class="fa-solid fa-circle-check fa-lg"></i>';
      return true
    }
  });
}
async function basicLogin() {
  const formLogin = document.getElementById("formLogin");
  formLogin.addEventListener("submit", async function (e) {
    e.preventDefault();

    const user = {
      email: e.target.querySelector("[name=email]").value,
      password: e.target.querySelector("[name=password]").value,
    };

    const payload = JSON.stringify(user);

    try {
      const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
      });

      if (response.status == 401) {
        console.log(response);
        submitError.style.display = 'block';
        submitError.innerHTML = "Incorrect password";
        pswError.innerHTML = '<i class="fa-solid fa-circle-check fa-lg red"></i>';
        setTimeout(function(){submitError.style.display = 'none';}, 5000);
        return false;
      } else if (response.status == 404) {
        console.log(response);
        submitError.style.display = 'block';
        submitError.innerHTML = "Incorrect email";
        emailError.innerHTML = '<i class="fa-solid fa-circle-check fa-lg red"></i>';
        setTimeout(function(){submitError.style.display = 'none';}, 5000);
        return false;
      } else {
        console.log(response);
        const result = await response.json();
        console.log(result);
        window.sessionStorage.setItem("token", result.token);
        window.location = "index.html";
        return true
      }
    } catch (error) {
      console.error(error);
    }
  });
}

function run() {
  validateEmail();
  validatePassword();
  basicLogin();
}

run();