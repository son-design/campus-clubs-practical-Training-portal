let trainings = [];

async function loadTrainings() {

    checkLogin();

    try {

        const response = await fetch(API.TRAININGS, {
            headers: authHeaders()
        });

        trainings = await response.json();

        let html = "";

        trainings.forEach(training => {

            let mentors = "Not Assigned";

            if (training.mentors && training.mentors.length > 0) {
                mentors = training.mentors.map(m => m.fullName).join(", ");
            }

            html += `
            <tr>

                <td>${training.title}</td>

                <td>${training.organization ?? ""}</td>

                <td>${training.location ?? ""}</td>

                <td>${mentors}</td>

                <td>${training.availableSlots ?? 0}</td>

                <td>
                    <button onclick="applyTraining(${training.id})">
                        Apply
                    </button>
                </td>

            </tr>
            `;

        });

        document.getElementById("trainingBody").innerHTML = html;

    } catch (e) {

        alert("Unable to load trainings.");

    }

}

async function applyTraining(id) {

    const user = getUser();

    const notes = prompt("Enter application notes");

    if (notes == null) return;

    const response = await fetch(

        `${API.APPLICATIONS}?studentId=${user.id}`,

        {

            method: "POST",

            headers: authHeaders(),

            body: JSON.stringify({

                trainingId: id,

                notes: notes

            })

        }

    );

    if (response.ok) {

        alert("Application submitted successfully.");

    } else {

        alert("Failed to submit application.");

    }

}