function loadProfile() {
    if (!checkLogin()) return;

    const user = getUser();
    if (!user) return;

    document.getElementById("profileName").textContent = user.fullName || user.username;
    document.getElementById("profileEmail").textContent = user.email || "-";
    document.getElementById("profileRole").textContent = user.role || "STUDENT";
    document.getElementById("profileJoined").textContent = user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "-";

    document.getElementById("updateFullName").value = user.fullName || "";
    document.getElementById("updateEmail").value = user.email || "";
}

async function updateProfile(e) {
    e.preventDefault();

    const fullName = document.getElementById("updateFullName").value.trim();
    const email = document.getElementById("updateEmail").value.trim();

    if (!fullName || !email) {
        alert("All fields are required");
        return;
    }

    try {
        const user = getUser();
        const response = await fetch(`${API.USERS}/${user.id}`, {
            method: "PUT",
            headers: authHeaders(),
            body: JSON.stringify({ fullName, email })
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem("user", JSON.stringify(data));
            alert("Profile updated successfully!");
            loadProfile();
        } else {
            const text = await response.text();
            alert(text || "Failed to update profile.");
        }
    } catch (error) {
        alert("Error: " + error.message);
    }
}

const form = document.getElementById("profileForm");
if (form) {
    form.addEventListener("submit", updateProfile);
}

document.addEventListener("DOMContentLoaded", loadProfile);