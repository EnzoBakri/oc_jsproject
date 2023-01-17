async function basicLogin() {

    const formLogin = document.querySelector("#formElem");

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
                body: payload
            });
    
            if(response.status !== 200) {
                window.location.reload();
                return null;
            } else {
                const result = await response.json();
                window.sessionStorage.setItem("token", result.token);
                window.location="index.html";
            }
        } catch(error) {
            console.error(error);
        }
    });
}

basicLogin();