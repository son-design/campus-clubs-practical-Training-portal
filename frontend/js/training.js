async function loadTrainings() {
    try {
        const response = await fetch(API.TRAININGS);
        if (!response.ok) throw new Error("Failed to load trainings");
        const trainings = await response.json();

        let html = "";
        trainings.forEach(training => {
            html += `
                <div class="card">
                    <h3>${training.title}</h3>
                    <p>${training.description || "No description"}</p>
                    <p><strong>Organization:</strong> ${training.organization || "-"}</p>
                    <p><strong>Location:</strong> ${training.location || "-"}</p>
                    <p><strong>Slots:</strong> ${training.availableSlots || 0}</p>
                    <p><strong>Start:</strong> ${training.startDate ? new Date(training.startDate).toLocaleDateString() : "-"}</p>
                    ${isAuthenticated() ? `<button onclick="applyForTraining(${training.id})" class="btn btn-primary">Apply</button>` : ''}
                </div>
            `;
        });
        document.getElementById("trainingsList").innerHTML = html || "<p>No trainings found</p>";
    } catch (error) {
        alert("Error: " + error.message);
    }
}

async function applyForTraining(trainingId) {
    if (!checkLogin()) return;

    const user = getUser();
    if (!user?.id) return alert("User not found");

    const motivation = prompt("Enter your motivation:");

    try {
        const response = await fetch(`${API.APPLICATIONS}?studentId=${user.id}`, {
            method: "POST",
            headers: authHeaders(),
            body: JSON.stringify({
                trainingId: trainingId,
                motivation: motivation || "No motivation provided"
            })
        });

        if (response.ok) {
            alert("Application submitted successfully!");
            loadTrainings();
        } else {
            const text = await response.text();
            alert(text || "Failed to apply.");
        }
    } catch (error) {
        alert("Error: " + error.message);
    }
}

document.addEventListener("DOMContentLoaded", loadTrainings);