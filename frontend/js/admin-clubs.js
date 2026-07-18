async function loadClubs() {
    checkLogin();
    if (getRole() !== "ADMIN") {
        alert("Access Denied");
        window.location = "../dashboard.html";
        return;
    }

    try {
        const response = await fetch(API.CLUBS, { headers: authHeaders() });
        if (!response.ok) throw new Error("Failed to load clubs");
        const clubs = await response.json();

        let html = "";
        clubs.forEach(club => {
            html += `
                <tr>
                    <td>${club.id}</td>
                    <td>${club.name}</td>
                    <td>${club.category || "General"}</td>
                    <td>${club.leaderName || club.leader?.name || "-"}</td>
                    <td>${club.memberCount || club.members?.length || 0}</td>
                    <td>
                        <button onclick="updateClub(${club.id})">Edit</button>
                        <button onclick="deleteClub(${club.id})" style="background:red;color:white;">Delete</button>
                    </td>
                </tr>
            `;
        });
        document.getElementById("clubTable").innerHTML = html || `<tr><td colspan="6">No clubs found</td></tr>`;
    } catch (error) {
        alert("Error: " + error.message);
    }
}

async function createClub() {
    const body = {
        name: document.getElementById("name").value.trim(),
        description: document.getElementById("description").value.trim(),
        category: document.getElementById("category").value
    };

    if (!body.name) return alert("Club name is required");

    try {
        const response = await fetch(API.CLUBS, {
            method: "POST",
            headers: authHeaders(),
            body: JSON.stringify(body)
        });

        if (response.ok) {
            alert("Club Created Successfully");
            document.getElementById("name").value = "";
            document.getElementById("category").value = "";
            document.getElementById("description").value = "";
            loadClubs();
        } else {
            const text = await response.text();
            alert(text || "Failed to create club");
        }
    } catch (error) {
        alert("Error: " + error.message);
    }
}

async function deleteClub(clubId) {
    if (!confirm("Are you sure you want to delete this club?")) return;

    try {
        const response = await fetch(`${API.CLUBS}/${clubId}`, {
            method: "DELETE",
            headers: authHeaders()
        });

        if (response.ok) {
            alert("Club deleted successfully.");
            loadClubs();
        } else {
            const text = await response.text();
            alert(text || "Failed to delete club.");
        }
    } catch (error) {
        alert("Error: " + error.message);
    }
}

async function updateClub(clubId) {
    const name = prompt("Enter new club name:");
    if (!name) return;

    const description = prompt("Enter new description:", "");
    const category = prompt("Enter new category:", "General");

    try {
        const response = await fetch(`${API.CLUBS}/${clubId}`, {
            method: "PUT",
            headers: authHeaders(),
            body: JSON.stringify({ name, description, category })
        });

        if (response.ok) {
            alert("Club updated successfully.");
            loadClubs();
        } else {
            const text = await response.text();
            alert(text || "Failed to update club.");
        }
    } catch (error) {
        alert("Error: " + error.message);
    }
}

document.addEventListener("DOMContentLoaded", loadClubs);