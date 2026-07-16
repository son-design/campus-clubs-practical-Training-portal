async function loadApplications(){

    checkLogin();

    if(localStorage.getItem("role")!=="MENTOR"){

        alert("Access Denied");

        window.location="../dashboard.html";

        return;

    }

    const trainingId=document.getElementById("trainingId").value;

    if(trainingId==="") return;

    const response=await fetch(

        `${API.APPLICATIONS}/training/${trainingId}`,

        {

            headers:authHeaders()

        }

    );

    const applications=await response.json();

    let html="";

    applications.forEach(app=>{

        html+=`

        <tr>

            <td>${app.studentName}</td>

            <td>${app.studentRegistration}</td>

            <td>${app.status}</td>

            <td>${app.notes??""}</td>

            <td>${app.feedback??"-"}</td>

            <td>

                <button onclick="reviewApplication(${app.id},'APPROVED')">

                    Approve

                </button>

                <button onclick="reviewApplication(${app.id},'REJECTED')">

                    Reject

                </button>

            </td>

        </tr>

        `;

    });

    document.getElementById("applicationTable").innerHTML=html;

}

async function reviewApplication(id,status){

    const feedback=prompt("Enter feedback");

    if(feedback===null) return;

    const response=await fetch(

`${API.APPLICATIONS}/${id}/review?status=${status}&feedback=${encodeURIComponent(feedback)}`,

        {

            method:"PUT",

            headers:authHeaders()

        }

    );

    if(response.ok){

        alert("Application updated.");

        loadApplications();

    }else{

        alert("Failed.");

    }

}