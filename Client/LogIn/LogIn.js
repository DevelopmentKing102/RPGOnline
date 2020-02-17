// This is the link for connecting to the server. We are connecting to the server with this command
const connection = new WebSocket("ws://localhost:13456");
// This function runs when the client is fully connected to the server.
connection.onopen = function(){
	if(Cookies.get("USERNAME") != undefined){
		connection.send("LOGIN:USERNAME:" + Cookies.get("USERNAME")+":PASSWORD:" + Cookies.get("PASSWORD"));
	}
}
// This function runs when the client reciveves a message from the server.
connection.onmessage = function(e){
	// Then we write to the document that we recieved a message
	if(e.data == "LOGIN:ACCEPTED"){
		console.log("Authenticated.");
	}
	if(e.data == "LOGIN:DENIED:NOTEXIST"){
		console.log("Authenticated.");
	}
	if(e.data == "LOGIN:DENIED:INCORRECT"){
		jQuery('#output').html("Those are the wrong login details for this account.");
	}
}





jQuery("#headingText").click(function(){ location.href = "../MainMenu/MainMenu.html"; });
jQuery("#updates").click(function(){ location.href = "../Updates/Updates.html"; });
jQuery("#loginButton").click(function(){ 
	var checked = false;
	for(var i = 0; i < jQuery("#usernameInput").val().length; i++){
		if(jQuery("#usernameInput").val()[i] == ":" || jQuery("#usernameInput").val()[i] == ","){
			checked = true;
		}
	}
	for(var i = 0; i < jQuery("#passwordInput").val().length; i++){
		if(jQuery("#passwordInput").val()[i] == ":" || jQuery("#passwordInput").val()[i] == ","){
			checked = true;
		}
	}
	if(checked == false){
		connection.send("LOGIN:USERNAME:" + jQuery("#usernameInput").val() + ":PASSWORD:"+jQuery('#passwordInput').val());
		
	} else {
		jQuery('#output').html("You have entered an invalid character. Make sure that your login details don't have a : or , in them.");
	}
});
jQuery("#signupButton").click(function(){
	location.href = "../LogIn/LogIn.html";
});
jQuery("#play").click(function(){ location.href = "../LogIn/LogIn.html"; });
jQuery("#credits").click(function(){ location.href = "../Credits/Credits.html"; });
