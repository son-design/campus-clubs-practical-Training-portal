async function loadClubDetails() {
    if (!checkLogin()) return;

    const params = new URLSearchParams(window.location.search);
    const clubId = params.get("id");
    if (!clubId) {
        alert("Club ID not found.");
        window.location = "clubs.html";
        return;
    }

    try {
        const response = await fetch(`${API.CLUBS}/${clubId}`, {
            headers: authHeaders()
        });
        if (!response.ok) throw new Error("Unable to load club.");
        const club = await response.json();

        document.getElementById("clubId").innerHTML = club.id;
        document.getElementById("clubName").innerHTML = club.name;
        document.getElementById("clubCategory").innerHTML = club.category || "General";
        document.getElementById("clubDescription").innerHTML = club.description || "No description";
        document.getElementById("clubLeader").innerHTML = club.leaderName || club.leader?.name || "-";
        document.getElementById("clubMembers").innerHTML = club.memberCount || club.members?.length || 0;
        document.getElementById("clubCreated").innerHTML = club.createdAt ? new Date(club.createdAt).toLocaleDateString() : "-";
    } catch (error) {
        alert("Error: " + error.message);
        window.location = "clubs.html";
    }
}

async function joinClub() {
    if (!checkLogin()) return;

    const params = new URLSearchParams(window.location.search);
    const clubId = params.get("id");
    if (!clubId) return alert("Club ID not found");

    const user = getUser();
    if (!user?.id) return alert("User not found");

    try {
        const response = await fetch(`${API.CLUBS}/${clubId}/join?studentId=${user.id}`, {
            method: "POST",
            headers: authHeaders()
        });

        if (response.ok) {
            alert("Successfully joined the club!");
            loadClubDetails();
        } else {
            const text = await response.text();
            alert(text || "Failed to join club.");
        }
    } catch (error) {
        alert("Error: " + error.message);
    }
}

async function leaveClub() {
    if (!checkLogin()) return;

    const params = new URLSearchParams(window.location.search);
    const clubId = params.get("id");
    if (!clubId) return alert("Club ID not found");

    const user = getUser();
    if (!user?.id) return alert("User not found");

    if (!confirm("Are you sure you want to leave this club?")) return;

    try {
        const response = await fetch(`${API.CLUBS}/${clubId}/leave?studentId=${user.id}`, {
            method: "POST",
            headers: authHeaders()
        });

        if (response.ok) {
            alert("You have left the club.");
            loadClubDetails();
        } else {
            const text = await response.text();
            alert(text || "Failed to leave club.");
        }
    } catch (error) {
        alert("Error: " + error.message);
    }
}

document.addEventListener("DOMContentLoaded", loadClubDetails);