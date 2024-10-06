// signup form coding
var signup_form=document.getElementById("signup_form");
signup_form.onsubmit=function()
{
	var username=btoa(document.getElementById("username").value);
	var email=btoa(document.getElementById("email").value);
	var phone=btoa(document.getElementById("phone").value);
	var pass=btoa(document.getElementById("pass").value);
	var user_all_data={
		name:username,
		email:email,
		number:phone,
		password:pass
	};
	var signup_btn=document.getElementById("signup_btn");
	var user_text_data=JSON.stringify(user_all_data);
	if(username != "" && email != "" && phone != "" && pass != "")
	{
        localStorage.setItem(email,user_text_data);
        signup_btn.style.background="green";
        signup_btn.innerHTML=' <i class="fa-solid fa-circle-check"></i> Sign up Succesfull'
        setTimeout(function(){
            signup_btn.style.background="#7F00FF";
            signup_btn.innerHTML="Sign up";
            signup_form.reset();

        },2000)
	}
	return false;
}

// email baledaction coding
var email_barning = document.getElementById("email_barning");
var signup_btn = document.getElementById("signup_btn");
var email_input=document.getElementById("email");
email_input.onchange=function()
{
	if(localStorage.getItem(btoa(email_input.value)) != null)
	{
        email_barning.style.display="block";
        email_input.style.borderBottom="2px solid red";
        signup_btn.disabled=true;
        signup_btn.style.background="#ccc";
        email_input.onclick=function()
        {
        	email_barning.style.display="none";
            email_input.style.borderBottom="2px solid #ccc";
            signup_btn.disabled=false;
            signup_btn.style.background="#7F00FF";
            email_input.onblur=function()
            {
            	email_barning.style.display="block";
                email_input.style.borderBottom="2px solid red";
                signup_btn.disabled=true;
                signup_btn.style.background="#ccc";
            }
        }
	}
}

// login form coding
var login_frm=document.getElementById("login_frm");
login_frm.onsubmit=function()
{
    var user_email = document.getElementById("user_email");
	var password = document.getElementById("Password");
	var woring_email=document.getElementById("woring_email");
	var woring_pass=document.getElementById("woring_pass");
	if(localStorage.getItem(btoa(user_email.value)) == null)
	{
		user_email.style.borderBottom="2px solid red";
		woring_email.style.display="block";
        user_email.onclick=function()
        {
        	user_email.style.borderBottom="2px solid #ccc";
		    woring_email.style.display="none";
		    user_email.value = "";
        }
	}
	else
	{
		var text_data=localStorage.getItem(btoa(user_email.value));
		var obj_data=JSON.parse(text_data);
		var correct_email=obj_data.email;
		var correct_pass = obj_data.password;
		if(btoa(user_email.value) == correct_email)
		{
			if(btoa(password.value) == correct_pass)
			{
				sessionStorage.setItem("user",btoa(user_email.value));
				window.location.replace("profile/profile.html");
			}
			else
			{
				woring_pass.style.display="block";
				password.style.background="2px solid red";
				password.onclick=function()
				{
					woring_pass.style.display="block";
				    password.style.background="2px solid red";
				    password.value = "";
				}
			}
		}
	}	
	return false;
}