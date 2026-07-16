async function loadApplications(){

checkLogin();

const user=getUser();

const response=await fetch(

`${API.APPLICATIONS}/student/${user.id}`,

{

headers:authHeaders()

}

);

const data=await response.json();

let html="";

data.forEach(app=>{

let color="orange";

if(app.status==="APPROVED") color="green";

if(app.status==="REJECTED") color="red";

html+=`

<tr>

<td>${app.trainingTitle}</td>

<td>

<span style="color:${color};font-weight:bold">

${app.status}

</span>

</td>

<td>${app.notes??""}</td>

<td>${app.feedback??"-"}</td>

<td>${new Date(app.appliedAt).toLocaleDateString()}</td>

</tr>

`;

});

document.getElementById("applicationBody").innerHTML=html;

}