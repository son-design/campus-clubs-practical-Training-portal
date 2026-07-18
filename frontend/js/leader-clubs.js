// ============================================
// LEADER CLUBS - FIXED
// ============================================

function checkLeader() {
    checkLogin();
    const role = localStorage.getItem("role");
    if (role !== "CLUB_LEADER" && role !== "ADMIN") {
        alert("Access Denied");
        window.location = "../dashboard.html";
        return false;
    }
    return true;
}

async function loadLeaderClubs() {
    if (!checkLeader()) return;

    // Check if element exists
    const tableBody = document.getElementById("clubTable");
    if (!tableBody) {
        console.error("Element 'clubTable' not found!");
        return;
    }

    try {
        const response = await fetch(API.CLUBS, {
            headers: authHeaders()
        });
        if (!response.ok) throw new Error("Failed to load clubs.");
        const clubs = await response.json();

        let html = "";
        if (!clubs || clubs.length === 0) {
            html = `<tr><td colspan="5" style="text-align:center;">No clubs found. Create one!</td></tr>`;
        } else {
            clubs.forEach(club => {
                html += `
                    <tr>
                        <td>${club.id}</td>
                        <td><a href="../club-details.html?id=${club.id}">${club.name}</a></td>
                        <td>${club.category || "General"}</td>
                        <td>${club.leaderName || club.leader?.name || "-"}</td>
                        <td>${club.memberCount || club.members?.length || 0}</td>
                    </tr>
                `;
            });
        }
        tableBody.innerHTML = html;
    } catch (error) {
        console.error("Error loading clubs:", error);
        alert("Unable to load clubs: " + error.message);
    }
}

async function createClub() {
    const name = document.getElementById("name")?.value?.trim();
    const category = document.getElementById("category")?.value?.trim();
    const description = document.getElementById("description")?.value?.trim();

    if (!name || !category) {
        alert("Club name and category are required.");
        return;
    }

    try {
        const response = await fetch(API.CLUBS, {
            method: "POST",
            headers: authHeaders(),
            body: JSON.stringify({ name, category, description })
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(error || "Failed to create club.");
        }

        alert("Club created successfully.");
        document.getElementById("name").value = "";
        document.getElementById("category").value = "";
        document.getElementById("description").value = "";
        loadLeaderClubs();
    } catch (error) {
        console.error("Error creating club:", error);
        alert("Unable to create club: " + error.message);
    }
}

// Wait for DOM to load
document.addEventListener("DOMContentLoaded", function() {
    console.log("Leader clubs page loaded");
    loadLeaderClubs();

    const form = document.getElementById("clubForm");
    if (form) {
        form.addEventListener("submit", function(e) {
            e.preventDefault();
            createClub();
        });
    } else {
        console.error("Form 'clubForm' not found!");
    }
});