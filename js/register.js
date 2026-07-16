const form=document.getElementById("registerForm");

form.addEventListener("submit",register);

async function register(e){

e.preventDefault();

const body={

username:document.getElementById("username").value,

email:document.getElementById("email").value,

password:document.getElementById("password").value,

fullName:document.getElementById("fullName").value,

phoneNumber:document.getElementById("phoneNumber").value,

role:document.getElementById("role").value,

registrationNumber:document.getElementById("registrationNumber").value,

yearOfStudy:Number(document.getElementById("yearOfStudy").value),

department:document.getElementById("department").value

};

const response=await fetch(API.REGISTER,{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify(body)

});

const data=await response.json();

if(response.ok){

alert("Registration successful.");

window.location="login.html";

}else{

document.getElementById("message").innerHTML=data.message;

}
}