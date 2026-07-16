const form = document.getElementById("loginForm");

if(form){
    form.addEventListener("submit", login);
}

async function login(e){

    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    const error = document.getElementById("errorMessage");
    error.textContent = "";

    try{

        const response = await fetch(API.LOGIN,{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                username,
                password

            })

        });

        const data = await response.json();

        if(!response.ok){

            throw new Error(data.message || "Login failed");

        }

        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("username", data.username);
        localStorage.setItem("fullName", data.fullName);
        localStorage.setItem("email", data.email);
        localStorage.setItem("role", data.role);

        // Redirect based on role
        switch(data.role){

            case "ADMIN":
                window.location.href = "dashboard.html";
                break;

            case "MENTOR":
                window.location.href = "dashboard.html";
                break;

            case "CLUB_LEADER":
                window.location.href = "dashboard.html";
                break;

            case "STUDENT":
            default:
                window.location.href = "dashboard.html";
                break;
        }

    }catch(err){

        error.textContent = err.message;

    }

}