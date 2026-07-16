async function loadClubDetails(){

    checkLogin();

    const params = new URLSearchParams(window.location.search);

    const clubId = params.get("id");

    if(!clubId){

        alert("Club ID not found.");

        window.location = "clubs.html";

        return;

    }

    const response = await fetch(

        `${API.CLUBS}/${clubId}`,

        {

            headers: authHeaders()

        }

    );

    if(!response.ok){

        alert("Unable to load club.");

        return;

    }

    const club = await response.json();

    document.getElementById("clubId").innerHTML = club.id;

    document.getElementById("clubName").innerHTML = club.name;

    document.getElementById("clubCategory").innerHTML = club.category;

    document.getElementById("clubDescription").innerHTML = club.description;

    document.getElementById("clubLeader").innerHTML = club.leaderName || "-";

    document.getElementById("clubMembers").innerHTML = club.memberCount;

    document.getElementById("clubCreated").innerHTML =
        new Date(club.createdAt).toLocaleDateString();

}