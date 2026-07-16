async function loadTrainings() {

    checkLogin();

    const role = localStorage.getItem("role");

    if (role !== "ADMIN") {

        alert("Access Denied");
        window.location = "../dashboard.html";
        return;

    }

    const response = await fetch(API.TRAININGS, {
        headers: authHeaders()
    });

    const trainings = await response.json();

    let html = "";

    trainings.forEach(training => {

        html += `

        <tr>

            <td>${training.id}</td>

            <td>${training.title}</td>

            <td>${training.organization ?? ""}</td>

            <td>${training.location ?? ""}</td>

            <td>${training.availableSlots ?? 0}</td>

            <td>

                <button onclick="assignMentor(${training.id})">

                    Assign

                </button>

            </td>

        </tr>

        `;

    });

    document.getElementById("trainingTable").innerHTML = html;

}

async function createTraining() {

    const body = {

        title: document.getElementById("title").value,

        description: document.getElementById("description").value,

        organization: document.getElementById("organization").value,

        location: document.getElementById("location").value,

        startDate: document.getElementById("startDate").value,

        endDate: document.getElementById("endDate").value,

        applicationDeadline: document.getElementById("applicationDeadline").value,

        availableSlots: Number(document.getElementById("availableSlots").value),

        requirements: document.getElementById("requirements").value

    };

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

        alert("Failed to create training.");

    }

}

async function assignMentor(trainingId) {

    const mentorId = prompt("Enter Mentor ID");

    if (!mentorId) return;

    const response = await fetch(

        `${API.TRAININGS}/${trainingId}/mentors/${mentorId}`,

        {

            method: "POST",

            headers: authHeaders()

        }

    );

    if (response.ok) {

        alert("Mentor assigned successfully.");

        loadTrainings();

    } else {

        alert("Failed to assign mentor.");

    }

}