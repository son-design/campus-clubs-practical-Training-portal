async function loadLeaderClubs(){

    checkLogin();

    const role = localStorage.getItem("role");

    if(role !== "CLUB_LEADER"){

        alert("Access Denied");

        window.location = "../dashboard.html";

        return;

    }

    const response = await fetch(API.CLUBS,{

        headers: authHeaders()

    });

    const clubs = await response.json();

    let html = "";

    clubs.forEach(club=>{

        html += `

        <tr>

            <td>${club.id}</td>

            <td>${club.name}</td>

            <td>${club.category}</td>

            <td>${club.leaderName ?? "-"}</td>

            <td>${club.memberCount}</td>

        </tr>

        `;

    });

    document.getElementById("clubTable").innerHTML = html;

}

async function createClub(){

    const body = {

        name: document.getElementById("name").value,

        description: document.getElementById("description").value,

        category: document.getElementById("category").value

    };

    const response = await fetch(API.CLUBS,{

        method:"POST",

        headers: authHeaders(),

        body: JSON.stringify(body)

    });

    if(response.ok){

        alert("Club created successfully.");

        document.getElementById("name").value = "";
        document.getElementById("category").value = "";
        document.getElementById("description").value = "";

        loadLeaderClubs();

    }else{

        alert("Failed to create club.");

    }

}