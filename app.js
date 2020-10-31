const path = require("path");
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const PORT = process.env.PORT || 5000;

const User = require("./user.js");

const UserList = require("./userList.js");

const activeUsers = new UserList();
// Set static folder
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
	socket.on("joinRoom", (username) => {
		const user = new User(socket.id, username, "Chess");
		activeUsers.addUser(user);
		console.log(activeUsers.getUserList());
		// Welcome current user
		socket.emit("message", "Welcome to the chat.");

		// Broadcast to everyone except for client
		socket.broadcast.emit(
			"message",
			`${user.username} has joined the chat`
		);
	});

	//Whenever someone disconnects this piece of code executed
	socket.on("disconnect", () => {
		const user = activeUsers.removeUser(socket.id);
		if (user) {
			io.emit("message", `${user.username} has left the chat`);
		}
	});

	// Listen for chat message
	socket.on("chatMessage", (msg) => {
		const user = activeUsers.getCurrentUser(socket.id);
		if (user) {
			io.emit("message", `${user.username}: ${msg}`);
		}
	});
});

http.listen(PORT, () => console.log(`Server started on ${PORT}`));
