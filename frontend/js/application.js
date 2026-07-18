async function loadApplications() {
    if (!checkLogin()) return;

    const user = getUser();
    if (!user?.id) return alert("User not found");

    try {
        const response = await fetch(`${API.APPLICATIONS}/student/${user.id}`, {
            headers: authHeaders()
        });
        if (!response.ok) throw new Error("Failed to load applications");
        const data = await response.json();

        let html = "";
        data.forEach(app => {
            let color = "orange";
            if (app.status === "APPROVED") color = "green";
            if (app.status === "REJECTED") color = "red";

            html += `
                <tr>
                    <td>${app.trainingTitle || app.training?.title || "-"}</td>
                    <td><span style="color:${color};font-weight:bold">${app.status || "PENDING"}</span></td>
                    <td>${app.notes || app.motivation || "-"}</td>
                    <td>${app.feedback || app.reviewNotes || "-"}</td>
                    <td>${app.appliedAt ? new Date(app.appliedAt).toLocaleDateString() : "-"}</td>
                </tr>
            `;
        });
        document.getElementById("applicationBody").innerHTML = html || `<tr><td colspan="5">No applications found</td></tr>`;
    } catch (error) {
        alert("Error: " + error.message);
    }
}

document.addEventListener("DOMContentLoaded", loadApplications);