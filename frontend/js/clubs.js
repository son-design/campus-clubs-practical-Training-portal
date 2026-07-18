async function loadClubs() {
    try {
        const response = await fetch(API.CLUBS);
        if (!response.ok) throw new Error("Failed to load clubs");
        const clubs = await response.json();

        let html = "";
        clubs.forEach(club => {
            html += `
                <div class="card">
                    <h3>${club.name}</h3>
                    <p>${club.description || "No description"}</p>
                    <span class="badge">${club.category || "General"}</span>
                    <p><small>Leader: ${club.leaderName || club.leader?.name || "-"}</small></p>
                    <p><small>Members: ${club.memberCount || club.members?.length || 0}</small></p>
                    <a href="club-details.html?id=${club.id}" class="btn btn-primary">View Details</a>
                    ${isAuthenticated() ? `<button onclick="joinClub(${club.id})" class="btn btn-success">Join</button>` : ''}
                </div>
            `;
        });
        document.getElementById("clubsGrid").innerHTML = html || "<p>No clubs found</p>";
    } catch (error) {
        alert("Error: " + error.message);
    }
}

async function joinClub(clubId) {
    if (!checkLogin()) return;
    const user = getUser();
    if (!user?.id) return alert("User not found");

    try {
        const response = await fetch(`${API.CLUBS}/${clubId}/join?studentId=${user.id}`, {
            method: "POST",
            headers: authHeaders()
        });

        if (response.ok) {
            alert("Successfully joined the club!");
            loadClubs();
        } else {
            const text = await response.text();
            alert(text || "Failed to join club.");
        }
    } catch (error) {
        alert("Error: " + error.message);
    }
}

document.addEventListener("DOMContentLoaded", loadClubs);