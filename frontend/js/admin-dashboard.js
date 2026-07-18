// ============================================
// ADMIN DASHBOARD - Simple Version
// ============================================

async function loadAdminDashboard() {
    const role = localStorage.getItem("role");
    if (role !== "ADMIN") {
        alert("Access Denied! Admin only.");
        window.location = "../dashboard.html";
        return;
    }

    try {
        // Fetch clubs
        const clubsRes = await fetch(API.CLUBS);
        const clubs = clubsRes.ok ? await clubsRes.json() : [];
        document.getElementById("totalClubs").textContent = clubs.length || 0;

        // Fetch trainings
        const trainingsRes = await fetch(API.TRAININGS);
        const trainings = trainingsRes.ok ? await trainingsRes.json() : [];
        document.getElementById("totalTrainings").textContent = trainings.length || 0;

        // Stats for users (mock or from localStorage)
        document.getElementById("totalUsers").textContent = "—";
        document.getElementById("pendingUsers").textContent = "—";

        // Recent activities
        let html = "";
        if (clubs.length > 0) {
            const recent = clubs.slice(-3).reverse();
            html += `<h4>🏛️ Recent Clubs</h4>`;
            recent.forEach(c => {
                html += `<p>• ${c.name} (${c.category || "General"})</p>`;
            });
        } else {
            html = "<p>No clubs found.</p>";
        }
        document.getElementById("recentActivities").innerHTML = html;

    } catch (error) {
        console.error("Error:", error);
        document.getElementById("recentActivities").innerHTML = `
            <p style="color:red;">Error loading data. Make sure backend is running.</p>
        `;
    }
}

document.addEventListener("DOMContentLoaded", loadAdminDashboard);