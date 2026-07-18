const form = document.getElementById("loginForm");
if (form) {
    form.addEventListener("submit", login);
}

async function login(e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const error = document.getElementById("errorMessage");
    if (error) error.textContent = "";

    if (!username || !password) {
        if (error) error.textContent = "Username and password are required";
        return;
    }

    try {
        const response = await fetch(API.LOGIN, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || data.error || "Login failed");
        }

        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId || data.id || data.user?.id);
        localStorage.setItem("username", data.username || data.user?.username);
        localStorage.setItem("fullName", data.fullName || data.user?.fullName || data.name);
        localStorage.setItem("email", data.email || data.user?.email);
        localStorage.setItem("role", data.role || data.user?.role || "STUDENT");

        window.location.href = "dashboard.html";
    } catch (err) {
        if (error) error.textContent = err.message;
    }
}