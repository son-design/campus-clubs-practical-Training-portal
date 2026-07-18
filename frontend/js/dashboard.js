async function loadDashboard() {
    if (!checkLogin()) return;

    const user = getUser();
    if (user) {
        document.getElementById("userName").textContent = user.fullName || user.username;
        document.getElementById("userRole").textContent = user.role || "STUDENT";
    }

    try {
        const clubs = await fetch(API.CLUBS, { headers: authHeaders() });
        const clubsData = await clubs.json();
        document.getElementById("totalClubs").textContent = clubsData.length || 0;

        const trainings = await fetch(API.TRAININGS, { headers: authHeaders() });
        const trainingsData = await trainings.json();
        document.getElementById("totalTrainings").textContent = trainingsData.length || 0;

        if (user?.id) {
            const apps = await fetch(`${API.APPLICATIONS}/student/${user.id}`, {
                headers: authHeaders()
            });
            const appsData = await apps.json();
            document.getElementById("myApplications").textContent = appsData.length || 0;
        }
    } catch (error) {
        console.error("Dashboard error:", error);
    }
}

document.addEventListener("DOMContentLoaded", loadDashboard);