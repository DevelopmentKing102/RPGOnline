/*
Author: Logan Smith - Perkins
*/

// Importing the http library, used to start servers
const http = require('http');
// Importing the websocket library which is used to interface between webpage and nodejs
const WebSocketServer = require('websocket').server;
const fs = require("fs");
// This server is created using the http createServer function, which enables the user to create a http connection with a webpage
const server = http.createServer();
// The server then listens on the port specified
server.listen(13456);

var databaseData = fs.readFileSync("users.database");
// We then create a new variable which will store the actual server I'll be running
const wsServer = new WebSocketServer({
	// Then we set the parameter of httpServer to the server variable that we said that would be listening on the port specified
	httpServer : server
});

// Next we check if someome is trying to connect to the server, i.e. the name request, it's requesting access to the server
wsServer.on('request', function(request){
	// We store the actual connection as a variable and we accept that client to connect to this server
	const connection = request.accept(null, request.origin);
	// This function is run when this client sends a message to the server.
	connection.on('message', function(message){
		// We print out to the console the recieved message decoded to utf8
		console.log("Recieved Message: " + message.utf8Data);
		var splitMessage = message.utf8Data.split(":");
		if(splitMessage[0] == "LOGIN"){
			databaseData = fs.readFileSync("users.database");
			databaseData += "";
			var account = databaseData.split(";");
			var checked = false;
			for(var i = 0; i < account.length; i++){
				var accounts = account[i].split(",");
				if(splitMessage[2] == accounts[0] && splitMessage[4] == accounts[1]){
					connection.sendUTF("LOGIN:ACCEPTED");
				}
			}
		}
	});
	// This code is run when the user disconnects from the server.
	connection.on('close', function(reasonCode, description){
		// We just print to the console that a client has disconnected from the server.
		console.log("A client has disconnected.");
	});
});