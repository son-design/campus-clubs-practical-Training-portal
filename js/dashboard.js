async function loadDashboard(){

checkLogin();

const user=getUser();

document.getElementById("welcome").innerHTML="Welcome "+user.fullName;

loadClubs();

loadTrainings();

loadApplications();

}

async function loadClubs(){

const response=await fetch(API.CLUBS,{

headers:authHeaders()

});

const clubs=await response.json();

document.getElementById("clubCount").innerHTML=clubs.length;

let rows="";

clubs.forEach(club=>{

rows+=`

<tr>

<td>${club.name}</td>

<td>${club.category}</td>

<td>${club.leaderName??""}</td>

<td>${club.memberCount}</td>

</tr>

`;

});

document.getElementById("clubTable").innerHTML=rows;

}

async function loadTrainings(){

const response=await fetch(API.TRAININGS,{

headers:authHeaders()

});

const trainings=await response.json();

document.getElementById("trainingCount").innerHTML=trainings.length;

}

async function loadApplications(){

const user=getUser();

const response=await fetch(

`${API.APPLICATIONS}/student/${user.id}`,

{

headers:authHeaders()

}

);

const applications=await response.json();

document.getElementById("applicationCount").innerHTML=applications.length;

}