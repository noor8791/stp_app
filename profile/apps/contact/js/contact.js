
if(sessionStorage.getItem("user") == null)
{
     window.location.replace("../../..index.html");
}
else
{
	//profile picter coding
	var user_email=sessionStorage.getItem("user");
	var user_profile_pic=localStorage.getItem(user_email+"image");
	var profile_pic=document.getElementById("profile_pic");
	profile_pic.style.backgroundImage="url("+user_profile_pic+")";
	profile_pic.style.backgroundSize="cover";
	profile_pic.style.backgroundPosition="center";

	// contact add button coding
    var new_contact=document.getElementById("new_contact");
    var contact_bg=document.getElementById("contact_bg");
    new_contact.onclick=function()
    {
    	var contact_bg=document.getElementById("contact_bg");
    	contact_bg.style.display="block";
    }

    // close button coding 
    var close = document.getElementById("close");
    close.onclick=function()
    {
    	var contact_bg=document.getElementById("contact_bg");
    	contact_bg.style.display="none";
    }

    // contact data stor localstor coding
    var add = document.getElementById("add")
    var name=document.getElementById("name");
    add.onclick = function()
    {
        var name_c = document.getElementById("name_c");
        var num_c = document.getElementById("num_c");
        var user_data = {
        	name:name_c.value,
        	Number:num_c.value
        };
        var json_text = JSON.stringify(user_data)
        if(name.value != "" && num_c.value != "")
        {
            localStorage.setItem(user_email+"contact"+name_c.value,json_text);
            contact_bg.style.display="none";
            num_c.value= "";
            name_c.value="";
        }
        else
        {
        	var number_name=document.getElementById("number_name");
            var number=document.getElementById("number");
        	if(name_c.value == "" && num_c.value == "")
        	{
        		name_c.style.border="2px solid red";
        		num_c.style.border="2px solid red";
        		number_name.style.display="block";
        		name_c.onclick=function()
        		{
        			name_c.style.border="1px solid purple";
        			name_c.style.borderLeft="5px solid purple";
        			number_name.style.display="none";
        		}
        		num_c.onclick=function()
        		{
        			num_c.style.border="1px solid purple";
        			num_c.style.borderLeft="5px solid purple";
        			number_name.style.display="none";
         		}
        	}
            else
            {
                if(name_c.value == "")
                {                  
                    alert("name");    
                }
                if(num_c.value == "")
                {
                    number.style.display="block";
                    num_c.style.borderLeft="2px solid red";
                    add.disabled=true;
                    add.style.background="#ccc";
                    num_c.onclick=function()
                    {
                        number.style.display="block";
                        num_c.style.borderLeft="2px solid red";
                        add.style.background="purple";
                        add.disabled=false;
                        number.style.display="none";
                    }
                }
            }
            return false;
        }       
    }

    // add contact number coding 
    function all_contact()
    {
        var i;
        for(i=0; i<localStorage.length; i++)
        {
            var all_keys = localStorage.key(i)
            if(all_keys.match(sessionStorage.getItem("user")+"contact"))
            {
                var all_txt = localStorage.getItem(all_keys);
                var obj = JSON.parse(all_txt);

                var contact_box=document.createElement("DIV");
                contact_box.setAttribute("id","contacts");
                var name_p=document.createElement("P");
                name_p.setAttribute("class","contact_name")
                var name_i=document.createElement("I");
                name_i.setAttribute("class","fas fa-user");
                var tool=document.createElement("DIV");
                tool.setAttribute("id","tool");
                var edit_i=document.createElement("I");
                edit_i.setAttribute("class","fas fa-edit edit");
                var del_i=document.createElement("I");
                del_i.setAttribute("class","fas fa-trash del")
                var line=document.createElement("HR");
                line.setAttribute("color","purple");
                line.setAttribute("widht","75%");
                line.setAttribute("size","1");
                var num_p=document.createElement("P");
                var num_i=document.createElement("I");
                num_i.setAttribute("class","fas fa-mobile-alt");

                name_p.appendChild(name_i);
                name_p.innerHTML += obj.name;

                tool.appendChild(edit_i);
                tool.appendChild(del_i)

                num_p.appendChild(num_i);
                num_p.innerHTML += obj.Number;

                contact_box.appendChild(name_p);
                contact_box.appendChild(tool);
                contact_box.appendChild(line);
                contact_box.appendChild(num_p);

                var all_contact_box=document.getElementById("all_contact_box");
                all_contact_box.appendChild(contact_box)
            }
        }
    }
    all_contact();

    // searching number coding
    var search = document.getElementById("search");
    search.oninput=function()
    {
        var all_contact_name = document.getElementsByClassName("contact_name");
        var i;
        for(i=0; i<all_contact_name.length; i++)
        {
            if(all_contact_name[i].innerHTML.match(search.value))
            {
                all_contact_name[i].parentElement.style.display="block";
            }
            else
            {
                all_contact_name[i].parentElement.style.display="none";
            }
        }
    }
    // delet button button coding
    function del()
    {
        var del = document.getElementsByClassName("del");
        var i;
        for(i=0; i<del.length; i++)
        {
           del[i].onclick = function()
           {
               var parent=this.parentElement.parentElement;
               var p_ele = parent.getElementsByClassName("contact_name")[0];
               var username = p_ele.innerHTML.replace('<i class="fas fa-user"></i>','')
               localStorage.removeItem(user_email+"contact"+username.trim())
               parent.className = "animate__animated animate__bounceOut";
               setTimeout(function(){
               parent.remove();
               },1000);
           }
        }
    }
    del();

    // contact number edit funcanulte coding 
    function edit()
    {
        var edit_icon = document.getElementsByClassName("edit");
        var i;
        for(i=0; i<edit_icon.length; i++)
        {
            edit_icon[i].onclick = function()
            {
                var parent = this.parentElement.parentElement;
                var para = parent.getElementsByTagName("P");
                var name = para[0].innerHTML.replace('<i class="fas fa-user"></i>',"").trim();
                var number = para[1].innerHTML.replace('<i class="fas fa-mobile-alt"></i>',"").trim();
                var name_c = document.getElementById("name_c");
                var num_c = document.getElementById("num_c");
                var add_btn = document.getElementById("new_contact");
                var c_header = document.getElementById("c_header");
                var add = document.getElementById("add");
                var close = document.getElementById("close");
                name_c.value = name;
                num_c.value = number;
                c_header.innerHTML = "Edit contact";
                add.innerHTML = "Update";
                add_btn.click();
                close.style.display = "none";
                localStorage.removeItem(user_email+"contact"+name)
            }
        }
    }
    edit();
}