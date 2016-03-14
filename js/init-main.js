$(document).ready(function(){
	checkSession();
});

function initMap() {
	var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -6.2733363, lng: 106.8352261},
zoom: 13, //6 or 13
		minZoom: 5,
		maxZoom: 20,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		mapTypeControl: true,
		streetViewControl: true,
		mapTypeControlOptions: {
			style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
			position: google.maps.ControlPosition.BOTTOM_LEFT
		},
		panControl: false,
		navigationControl: false,
		zoomControl: true,
		zoomControlOptions: 	{ 	position : google.maps.ControlPosition.RIGHT_BOTTOM ,
									style: google.maps.MapTypeControlStyle.VERTICAL_BAR
								},
  });
}


function initLoad()
{
var content=' ';
content+='<div class="image" > ';
content+='	<div id="login">';
content+='		<table id="kolum">';
content+='			<tr>';
content+='				<td id="go"><img src="icon/daun.png" id="daun"> GO GREEN</center></td>';
content+='			</tr>';
content+='			<tr><td><hr></td></tr>';
content+='			<tr class="user">';
content+='				<td><input type="text" id="user" placeholder="Username" maxlength="20"></td>';
content+='			</tr>';
content+='			<tr class="user">';
content+='				<td><input type="password" id="pass" placeholder="Password" maxlength="20"></td></td>';
content+='			</tr>';
content+='			<tr><td id="remember"><input type="checkbox" name="setcookie" value="true" id="setcookie" >Remember Me</td></tr>';
content+='			<tr>';
content+='				<td><input class="myButton" onclick="login()" type="submit" value="Submit">';
content+='		</table>';
content+='	</div>';
content+='	<img class="zoom" src="image/bridge.jpg">';
content+='	<div id="footer">&copy; Copyright 2015 AN</div>';
content+='</div>';

$("body").append(content);

$("#user").focus();
}


function checkSession(){
	$.ajax({
		type : 'GET',
		url : 'ajax/app_sessionGet.php',
		dataType : 'json',
		success : function(data){
			if (data.length>0){
				
				initMap();
				initMenu();
			}else{
				initLoad();
			}
		}
	});
}

function login(){
	var username = $('#user').val();
	var password = $('#pass').val();
	var checkbox = $('#setcookie').is(':checked');

	strQuery = 'login~'+ username + '~' + password + '~' + checkbox;
	$.getJSON('ajax/app_command.php?' + strQuery , function (data){
	
	console.log(data);
	if (data.status == 'ok'){
		$(".image").hide( "slide", {direction: "up" }, 9000 );
		initMap();
		initMenu();
		registerSession(username,checkbox);
	}else{
		console.log('salah');
	}
	});
}

function registerSession(username,check) {
	$.ajax({
		type: "POST",
		url: "ajax/app_sessionAdd.php",
		async:false,
		data: { username : username , check : check },
		success: function() { },
		error: function() { }
	});
}

function initMenu() {
	var content = '';
	content += '<div id="test">ABCD Application</div>';

	$('body').append(content);
	topMenu();
}

function topMenu(){
	var content = '';
	content += '<div id="search"><input type="text" id="txtSearch"></div>';

	$('#test').append(content);
}

