var signup_link=document.getElementById("signup_link");
var login_link=document.getElementById("login_link");
var login=document.getElementById("login");
var signup=document.getElementById("signup");
signup_link.onclick=function()
{
	login.style.display="none";
	signup.style.display="block";
}
login_link.onclick=function()
{
	login.style.display="block";
	signup.style.display="none";
}