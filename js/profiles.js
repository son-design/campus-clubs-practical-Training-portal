function loadProfile(){

checkLogin();

const user=getUser();

document.getElementById("fullName").innerHTML=user.fullName;

document.getElementById("username").innerHTML=user.username;

document.getElementById("email").innerHTML=user.email;

document.getElementById("role").innerHTML=user.role;

}