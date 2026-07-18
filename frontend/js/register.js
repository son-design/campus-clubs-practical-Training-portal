// ============================================
// REGISTRATION - FIXED
// ============================================

const form = document.getElementById("registerForm");
if (form) {
    form.addEventListener("submit", register);
}

async function register(e) {
    e.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const role = document.getElementById("role").value;

    if (!fullName || !username || !email || !password) {
        alert("All fields are required");
        return;
    }

    if (password.length < 6) {
        alert("Password must be at least 6 characters");
        return;
    }

    try {
        // Sasa registrationNumber inaweza kuwa null
        // Tuma username kama registrationNumber (au acha NULL)
        const response = await fetch(API.REGISTER, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                fullName: fullName,
                username: username,
                email: email,
                password: password,
                role: role,
                registrationNumber: username.toUpperCase() + "-" + Date.now().toString().slice(-6)
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || data.error || "Registration failed");
        }

        alert("Registration successful! Please login.");
        window.location.href = "login.html";

    } catch (error) {
        console.error("Registration error:", error);
        alert("Registration failed: " + error.message);
    }
}