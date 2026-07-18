// ============================================
// ADMIN - Manage Users
// ============================================

async function loadUsers() {
    const role = localStorage.getItem("role");
    if (role !== "ADMIN") {
        alert("Access Denied");
        window.location = "../dashboard.html";
        return;
    }

    try {
        const response = await fetch(API.USERS, { headers: authHeaders() });
        if (!response.ok) throw new Error("Failed to load users");
        const users = await response.json();

        let html = "";
        if (users.length === 0) {
            html = `<tr><td colspan="6" style="text-align:center;">No users found</td></tr>`;
        } else {
            users.forEach(user => {
                const statusColor = user.status === "APPROVED" ? "green" : "orange";
                html += `
                    <tr>
                        <td>${user.id}</td>
                        <td>${user.username}</td>
                        <td>${user.email || "-"}</td>
                        <td><span class="badge">${user.role}</span></td>
                        <td><span style="color:${statusColor};font-weight:bold;">${user.status || "PENDING"}</span></td>
                        <td>
                            ${user.role !== "ADMIN" ? `
                                <button onclick="deleteUser(${user.id})" class="btn btn-danger btn-sm">Delete</button>
                            ` : "—"}
                        </td>
                    </tr>
                `;
            });
        }
        document.getElementById("userTable").innerHTML = html;
    } catch (error) {
        alert("Error: " + error.message);
    }
}

async function deleteUser(userId) {
    if (!confirm("Delete this user permanently?")) return;

    try {
        const response = await fetch(`${API.USERS}/${userId}`, {
            method: "DELETE",
            headers: authHeaders()
        });

        if (response.ok) {
            alert("User deleted successfully!");
            loadUsers();
        } else {
            const text = await response.text();
            alert(text || "Failed to delete user.");
        }
    } catch (error) {
        alert("Error: " + error.message);
    }
}

document.addEventListener("DOMContentLoaded", loadUsers);