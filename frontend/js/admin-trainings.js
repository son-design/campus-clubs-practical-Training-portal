async function loadTrainings() {
    checkLogin();
    if (getRole() !== "ADMIN") {
        alert("Access Denied");
        window.location = "../dashboard.html";
        return;
    }

    try {
        const response = await fetch(API.TRAININGS, { headers: authHeaders() });
        if (!response.ok) throw new Error("Failed to load trainings");
        const trainings = await response.json();

        let html = "";
        trainings.forEach(training => {
            html += `
                <tr>
                    <td>${training.id}</td>
                    <td>${training.title}</td>
                    <td>${training.organization ?? "-"}</td>
                    <td>${training.location ?? "-"}</td>
                    <td>${training.availableSlots ?? 0}</td>
                    <td>
                        <button onclick="assignMentor(${training.id})">Assign</button>
                        <button onclick="updateTraining(${training.id})">Edit</button>
                        <button onclick="deleteTraining(${training.id})" style="background:red;color:white;">Delete</button>
                    </td>
                </tr>
            `;
        });
        document.getElementById("trainingTable").innerHTML = html || `<tr><td colspan="6">No trainings found</td></tr>`;
    } catch (error) {
        alert("Error: " + error.message);
    }
}

async function createTraining() {
    const body = {
        title: document.getElementById("title").value.trim(),
        description: document.getElementById("description").value.trim(),
        organization: document.getElementById("organization").value.trim(),
        location: document.getElementById("location").value.trim(),
        startDate: document.getElementById("startDate").value,
        endDate: document.getElementById("endDate").value,
        applicationDeadline: document.getElementById("applicationDeadline").value,
        availableSlots: Number(document.getElementById("availableSlots").value),
        requirements: document.getElementById("requirements").value.trim()
    };

    if (!body.title) return alert("Training title is required");

    try {
        const response = await fetch(API.TRAININGS, {
            method: "POST",
            headers: authHeaders(),
            body: JSON.stringify(body)
        });

        if (response.ok) {
            alert("Training created successfully.");
            loadTrainings();
            document.querySelectorAll("input, textarea").forEach(el => {
                if (el.type !== "button") el.value = "";
            });
        } else {
            const text = await response.text();
            alert(text || "Failed to create training.");
        }
    } catch (error) {
        alert("Error: " + error.message);
    }
}

async function assignMentor(trainingId) {
    const mentorId = prompt("Enter Mentor ID:");
    if (!mentorId) return;

    try {
        const response = await fetch(`${API.TRAININGS}/${trainingId}/mentors/${mentorId}`, {
            method: "POST",
            headers: authHeaders()
        });

        if (response.ok) {
            alert("Mentor assigned successfully.");
            loadTrainings();
        } else {
            const text = await response.text();
            alert(text || "Failed to assign mentor.");
        }
    } catch (error) {
        alert("Error: " + error.message);
    }
}

async function deleteTraining(trainingId) {
    if (!confirm("Are you sure you want to delete this training?")) return;

    try {
        const response = await fetch(`${API.TRAININGS}/${trainingId}`, {
            method: "DELETE",
            headers: authHeaders()
        });

        if (response.ok) {
            alert("Training deleted successfully.");
            loadTrainings();
        } else {
            const text = await response.text();
            alert(text || "Failed to delete training.");
        }
    } catch (error) {
        alert("Error: " + error.message);
    }
}

async function updateTraining(trainingId) {
    const title = prompt("Enter new training title:");
    if (!title) return;

    const description = prompt("Enter new description:", "");
    const organization = prompt("Enter new organization:", "");
    const location = prompt("Enter new location:", "");
    const availableSlots = prompt("Enter new available slots:", "0");

    try {
        const response = await fetch(`${API.TRAININGS}/${trainingId}`, {
            method: "PUT",
            headers: authHeaders(),
            body: JSON.stringify({
                title,
                description,
                organization,
                location,
                availableSlots: Number(availableSlots)
            })
        });

        if (response.ok) {
            alert("Training updated successfully.");
            loadTrainings();
        } else {
            const text = await response.text();
            alert(text || "Failed to update training.");
        }
    } catch (error) {
        alert("Error: " + error.message);
    }
}

document.addEventListener("DOMContentLoaded", loadTrainings);