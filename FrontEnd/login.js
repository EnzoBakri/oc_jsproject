async function basicLogin() {

    const formLogin = document.querySelector("#formElem");

    formLogin.addEventListener("submit", async function (e) {
        
        // Désactivation du comportement par défaut du navigateur
        e.preventDefault();
        
        // Création de l'objet du nouvel utilisateur
        const user = {
            email: e.target.querySelector("[name=email]").value,
            password: e.target.querySelector("[name=password]").value,
        };
        
        //  Création de la charge utile au format JSON
        const payload = JSON.stringify(user);
        
        // Appel de la fonction fetch avec toutes les informations nécessaires
        const response = await fetch("http://localhost:5678/api/users/login", {
            method: "POST", 
            headers: { "Content-Type": "application/json" },
            body: payload
        });
        
        if(response.status !== 200) {
            window.location.reload();
            alert("Incorrect credentials");
            return null;
        } else {
            const result = await response.json();
            window.localStorage.setItem("result", JSON.stringify(result));
            window.location="index.html";
            alert("Successfully connected"); 
        }
    });
}

basicLogin();