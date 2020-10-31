const chatForm = document.getElementById("chat-form");
const msgBox = document.getElementById("msg-box");
const chatLog = document.getElementById("chat-log");

const username = prompt("Please enter the name you wish to use.");

const socket = io();

socket.emit("joinRoom", username);

socket.on("message", (message) => {
	outputMessage(message);
	chatLog.scrollTop = chatLog.scrollHeight;
});

chatForm.addEventListener("submit", (e) => {
	e.preventDefault();

	const msg = msgBox.value;
	msgBox.value = "";

	socket.emit("chatMessage", msg);
});

function outputMessage(message) {
	const div = document.createElement("div");
	div.classList.add("message");
	div.innerHTML = `<p>${message}</p>`;
	document.getElementById("chat-log").appendChild(div);
}
