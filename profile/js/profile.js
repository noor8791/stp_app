
    if(sessionStorage.getItem("user") == null)
    {
    	window.location.replace("../index.html");
    }
    else
    {
        // logout coding start
        var logout=document.getElementById("logout");
        logout.onclick=function()
        {
        	sessionStorage.clear();
        	var logut_text=document.getElementById("logut_text");
        	logut_text.innerHTML = "Please Wait..";
        	setTimeout(function(){
        		window.location = "../index.html";
        	},2000);
        }

    	// profile name coding 
        var user_email = sessionStorage.getItem("user");
        var json_text = localStorage.getItem(user_email);
        var obj_data = JSON.parse(json_text);
        var user_name = document.getElementById("user_name");
        user_name.innerHTML = atob(obj_data.name);
        document.getElementById("profile_user_name").innerHTML = atob(obj_data.name);
        
        // profile pic coding 
        var img_pic = localStorage.getItem(user_email+"image");
        var profile_picher= document.getElementById("profile_picher");
        profile_picher.style.backgroundImage = "url("+img_pic+")";
        profile_picher.style.backgroundSize="cover";
        profile_picher.style.backgroundPosition="center";

        if(localStorage.getItem(user_email+"image") != null)
        {
        	var cover=document.getElementById("cover");
            cover.style.display="none";
        }
        
        // profile picture upload coding
    	var user_profile_box = document.getElementById("user_profile_box");    	
    	user_profile_box.onchange=function()
    	{
    		var reader = new FileReader();
    		reader.readAsDataURL(user_profile_box.files[0]);
    		reader.onload = function()
    		{
    			var filename = reader.result;
    			var profile_pic = document.getElementById("profile_pic");
    			var user_icon=document.getElementById("user_icon");
    			profile_pic.style.backgroundImage="url("+filename+")";
    			profile_pic.style.backgroundSize="cover";
    			profile_pic.style.backgroundPosition="center";
    			user_icon.style.display="none";
    			var profile_btn=document.getElementById("profile_btn");
    			profile_btn.style.display="block";
    			profile_btn.onclick = function()
    			{
                    localStorage.setItem(user_email+"image",filename);
                    var cover=document.getElementById("cover");
                    cover.style.display="none";
                    window.location=location.href;
    			}
    		}
    	}
    }
