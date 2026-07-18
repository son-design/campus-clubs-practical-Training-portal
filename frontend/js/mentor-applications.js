function checkMentor() {
    checkLogin();
    const role = getRole();
    if (role !== "MENTOR" && role !== "ADMIN") {
        alert("Access Denied");
        window.location = "../dashboard.html";
        return false;
    }
    return true;
}

async function loadApplications() {
    if (!checkMentor()) return;

    try {
        const response = await fetch(API.APPLICATIONS, {
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
                    <td>${app.id}</td>
                    <td>${app.studentName || app.user?.name || "-"}</td>
                    <td>${app.trainingTitle || app.training?.title || "-"}</td>
                    <td><span style="color:${color};font-weight:bold">${app.status || "PENDING"}</span></td>
                    <td>${app.appliedAt ? new Date(app.appliedAt).toLocaleDateString() : "-"}</td>
                    <td>
                        ${app.status === "PENDING" ? `
                            <button onclick="approveApplication(${app.id})" style="background:green;color:white;">Approve</button>
                            <button onclick="rejectApplication(${app.id})" style="background:red;color:white;">Reject</button>
                        ` : app.status}
                    </td>
                </tr>
            `;
        });
        document.getElementById("applicationTable").innerHTML = html || `<tr><td colspan="6">No applications found</td></tr>`;
    } catch (error) {
        alert("Error: " + error.message);
    }
}

async function reviewApplication(applicationId, status) {
    if (!confirm(`Are you sure you want to ${status} this application?`)) return;

    const feedback = prompt("Enter feedback (optional):", "");

    try {
        const response = await fetch(
            `${API.APPLICATIONS}/${applicationId}/review?status=${status}&feedback=${feedback || ""}`,
            {
                method: "PUT",
                headers: authHeaders()
            }
        );

        if (response.ok) {
            alert(`Application ${status} successfully.`);
            loadApplications();
        } else {
            const text = await response.text();
            alert(text || `Failed to ${status} application.`);
        }
    } catch (error) {
        alert("Error: " + error.message);
    }
}

async function approveApplication(applicationId) {
    await reviewApplication(applicationId, "APPROVED");
}

async function rejectApplication(applicationId) {
    await reviewApplication(applicationId, "REJECTED");
}

document.addEventListener("DOMContentLoaded", loadApplications);