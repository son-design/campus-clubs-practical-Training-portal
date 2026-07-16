function checkLeader() {

    checkLogin();

    const role = localStorage.getItem("role");

    if (role !== "CLUB_LEADER") {

        alert("Access Denied");

        window.location = "../dashboard.html";

        return false;
    }

    return true;
}

async function loadLeaderClubs() {

    if (!checkLeader()) return;

    try {

        const response = await fetch(API.CLUBS, {
            headers: authHeaders()
        });

        if (!response.ok) {
            throw new Error("Failed to load clubs.");
        }

        const clubs = await response.json();

        let html = "";

        clubs.forEach(club => {

            html += `
                <tr>
                    <td>${club.id}</td>

                    <td>
                        <a href="../club-details.html?id=${club.id}">
                            ${club.name}
                        </a>
                    </td>

                    <td>${club.category}</td>

                    <td>${club.leaderName || "-"}</td>

                    <td>${club.memberCount}</td>
                </tr>
            `;

        });

        document.getElementById("clubTable").innerHTML = html;

    } catch (error) {

        console.error(error);

        alert("Unable to load clubs.");

    }

}

async function createClub() {

    const body = {

        name: document.getElementById("name").value.trim(),

        category: document.getElementById("category").value.trim(),

        description: document.getElementById("description").value.trim()

    };

    if (!body.name || !body.category) {

        alert("Club name and category are required.");

        return;

    }

    try {

        const response = await fetch(API.CLUBS, {

            method: "POST",

            headers: authHeaders(),

            body: JSON.stringify(body)

        });

        if (!response.ok) {

            throw new Error("Failed to create club.");

        }

        alert("Club created successfully.");

        document.getElementById("name").value = "";
        document.getElementById("category").value = "";
        document.getElementById("description").value = "";

        loadLeaderClubs();

    } catch (error) {

        console.error(error);

        alert("Unable to create club.");

    }

}