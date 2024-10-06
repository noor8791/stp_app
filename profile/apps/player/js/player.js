// play and pause button coding

var current_email = sessionStorage.getItem("user");
var video = document.getElementById("video_player");
var play_btn = document.getElementById("play_btn");
play_btn.onclick = function()
{
	if(play_btn.className == "fa-solid fa-circle-play")
	{
		video.play();
		play_btn.className = "fa-solid fa-circle-pause";
	}
	else if(play_btn.className == "fa-solid fa-circle-pause")
	{
		video.pause()
		play_btn.className = "fa-solid fa-circle-play";
	}
}
// prograss bar coding
video.ontimeupdate = function()
{
	var t_duration = this.duration;
    var c_current = this.currentTime;
    var v_timing = document.getElementById("v_timing");
    var p_bar = document.getElementById("prograss_bar");
    var sec = c_current - parseInt(c_current/60)*60;
    var t_sec = t_duration - parseInt(t_duration/60)*60;
    v_timing.innerHTML = parseInt(c_current/60)+":"+parseInt(sec)+" / "+parseInt(t_duration/60)+":"+parseInt(t_sec);
    var slide_per = c_current*100/t_duration;
    p_bar.style.width = slide_per+"%";
    
    if(c_current == t_duration)
    {
    	play_btn.className = "fa-solid fa-circle-play";
    }
}

// open and cloce box
var open_video_box_btn=document.getElementById("open_video_box_btn");
open_video_box_btn.onclick=function()
{
	var add_video_box = document.getElementById("add_video_box");
	if(open_video_box_btn.className == "fas fa-plus-circle")
	{
		add_video_box.style.display="block";
		open_video_box_btn.className = "fa-sharp fa-solid fa-circle-xmark";
	}
	else if(open_video_box_btn.className == "fa-sharp fa-solid fa-circle-xmark")
	{
		add_video_box.style.display="none";
		open_video_box_btn.className = "fas fa-plus-circle";
	}
}

// add video local Storage
var add_video_btn = document.getElementById("add_video_btn")
add_video_btn.onclick=function()
{
	var video_name = document.getElementById("video_name");
	var video_link = document.getElementById("video_link");
	if(video_name.value != "" && video_link.value != "")
	{
		var v_obj = {
			name:video_name.value,
			link:video_link.value
		};
		var v_text = JSON.stringify(v_obj);
		localStorage.setItem(current_email+"video"+video_name.value,v_text);
	}
}

// fetch all video form local storage
function load_video()
{
    var i;
    for(i=0; i<localStorage.length; i++)
    {
    	var all_keys = localStorage.key(i);
    	if(all_keys.match(current_email+"video"))
    	{
    	     var v_data = localStorage.getItem(all_keys);
    	     var video_obj = JSON.parse(v_data);

    	     var div = document.createElement("DIV");
    	     div.setAttribute("id","main_video_box");

    	     var p = document.createElement("P");
    	     p.setAttribute("id","playlist_video_name");
    	     p.innerHTML = video_obj.name;
    	     p.className = "p_v_name";

    	     var play_btn = document.createElement("BUTTON");
    	     play_btn.setAttribute("id","video_play_btn");
    	     play_btn.setAttribute("type","button");
    	     play_btn.setAttribute("url",video_obj.link)
    	     play_btn.className = "v_play_btn";
             play_btn.innerHTML = "Play";

             var del_btn = document.createElement("BUTTON");
             del_btn.setAttribute("type","button");
             del_btn.setAttribute("id","video_delete_btn");
             del_btn.innerHTML = "Delete";
             del_btn.className = "delete_btn";

             div.appendChild(p);
             div.appendChild(play_btn);
             div.appendChild(del_btn);

             var all_v = document.getElementById("bottom");
             all_v.appendChild(div)
    	}
    }
}
load_video()

// online video play button coding
function play_video()
{
    var all_v_play_btn = document.getElementsByClassName("v_play_btn");
    var i;
    for(i=0; i<all_v_play_btn.length; i++)
    {
     	all_v_play_btn[i].onclick=function()
     	{
     		clear();
     		var v_url = this.getAttribute("url");
     		var src_tag = document.getElementById("video_src");
     		src_tag.setAttribute("src",v_url);
     		video.load();
     		video.play();
     		play_btn.className = "fa-solid fa-circle-pause";
     		this.innerHTML = "Playing..."
     	}
    }
}
play_video()

function clear()
{
	var all_v_play_btn = document.getElementsByClassName("v_play_btn");
	var i;
	for(i=0; i<all_v_play_btn.length; i++)
	{
		all_v_play_btn[i].innerHTML = "Play";
	}
}

// next button coding
function nextbtn()
{
     var right_btn = document.getElementById("right_btn");
     right_btn.onclick = function()
     {
     	var all_play_btn = document.getElementsByClassName("v_play_btn");
     	var i;
     	for(i=0; i<all_play_btn.length; i++)
     	{
     		if(all_play_btn[i].innerHTML == "Playing...")
     		{
     			var next_element = all_play_btn[i].parentElement.nextSibling;
     			var next_play_button = next_element.getElementsByClassName("v_play_btn")[0];
     			next_play_button.click();
     			return false;
     		}
     	}
     }
}
nextbtn();

// previous button coding
function previousbtn()
{
     var left_btn = document.getElementById("left_btn");
     left_btn.onclick = function()
     {
     	var all_play_btn = document.getElementsByClassName("v_play_btn");
     	var i;
     	for(i=0; i<all_play_btn.length; i++)
     	{
     		if(all_play_btn[i].innerHTML == "Playing...")
     		{
     			var previous_element = all_play_btn[i].parentElement.previousSibling;
     			var previous_play_button = previous_element.getElementsByClassName("v_play_btn")[0];
     			previous_play_button.click();
     			return false;
     		}
     	}
     }
}
previousbtn();

// delete button button
function delete_button()
{
    var all_del_button = document.getElementsByClassName("delete_btn");
    var i;
    for(i=0; i<all_del_button.length; i++)
    {
    	all_del_button[i].onclick = function()
    	{
    		var parent = this.parentElement;
    		var video_name = parent.getElementsByTagName("P")[0].innerHTML;
    		localStorage.removeItem(current_email+"video"+video_name);
    		parent.className = "animate__animatrd animate__bounceOut";
    		setTimeout(function(){
    			parent.remove();
    		},1000)
    	}
    }     
}
delete_button();

// voluem 
function volume()
{
    var vol_icon = document.getElementById("volume");
    vol_icon.onclick = function()
    {
    	var vol_control = document.getElementById("vol_control");
    	if(vol_control.style.display == "none")
    	{
    		vol_control.style.display="block";
    		vol_control.oninput = function()
    		{
    			video.volume = this.value;
    		}
    	}
    	else
    	{
    		vol_control.style.display="none";
    	}
    }
}
volume()

// video forward and backword coding
var p_box = document.getElementById("prograss_box");
p_box.onclick=function(event)
{
    var par = event.offsetX/this.offsetWidth;
    video.currentTime = par*video.duration;
}

// video full screen coding
var full_screen = document.getElementById("full_screen");
full_screen.onclick = function()
{
    video.requestFullscreen();
}

// video speed controlar coding
var speed_icon = document.getElementById("speed_icon");
speed_icon.onclick = function()
{
    var speed_slider = document.getElementById("speed_control");
    if(speed_slider.style.display == "none")
    {
         speed_slider.style.display = "block";
         speed_slider.oninput = function()
         {
         	video.playbackRate = this.value;
         }
    }
    else if(speed_slider.style.display == "block")
    {
    	 speed_slider.style.display = "none";
    }
}

// video searching funsinalite coding
var search = document.getElementById("search");
search.oninput=function()
{ 
    var all_v_name = document.getElementsByClassName("p_v_name");
    var i;
    for(i=0; all_v_name.length; i++)
    {
    	if(all_v_name[i].innerHTML.toUpperCase().match(search.value.toUpperCase()))
    	{
    		all_v_name[i].parentElement.style.display = "block";
    	}
    	else
    	{
    		all_v_name[i].parentElement.style.display = "none";
    	}
    }
}
