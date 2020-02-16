// This is the link for connecting to the server. We are connecting to the server with this command
const connection = new WebSocket("ws://localhost:7000");
// This function runs when the client is fully connected to the server.
connection.onopen = function(){
	// We write to the webpage that the connection has been established.
	document.write("Connected Fully. Ready to send messages.\n");
	// Then we send back a message that says that we connected to the network
	connection.send("Hi I just connected to your network!");
}
// This function runs when the client reciveves a message from the server.
connection.onmessage = function(e){
	// Then we write to the document that we recieved a message
	document.write("Recieved Message: " + e.data + "\n");
}