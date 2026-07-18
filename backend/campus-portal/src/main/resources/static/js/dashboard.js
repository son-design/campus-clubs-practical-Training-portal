// ===== DASHBOARD =====

redirectIfNotLoggedIn();

const user = getUser();
if (user) {
    document.getElementById('userName').textContent = user.fullName || user.username;
}

async function loadDashboard() {
    try {
        const headers = getAuthHeaders();

        // Get all clubs
        const clubsRes = await fetch('/api/clubs', { headers });
        const clubs = clubsRes.ok ? await clubsRes.json() : [];
        document.getElementById('totalClubs').textContent = clubs.length;

        // Get all trainings
        const trainingsRes = await fetch('/api/pt-trainings', { headers });
        const trainings = trainingsRes.ok ? await trainingsRes.json() : [];
        document.getElementById('totalTrainings').textContent = trainings.length;

        // Student specific data
        if (user && user.role === 'STUDENT' && user.userId) {
            const myClubsRes = await fetch(`/api/clubs/student/${user.userId}`, { headers });
            const myClubs = myClubsRes.ok ? await myClubsRes.json() : [];
            document.getElementById('myClubs').textContent = myClubs.length;

            const myAppsRes = await fetch(`/api/applications/student/${user.userId}`, { headers });
            const myApps = myAppsRes.ok ? await myAppsRes.json() : [];
            document.getElementById('myApplications').textContent = myApps.length;
        }
    } catch (err) {
        console.error('Dashboard error:', err);
    }
}

loadDashboard();