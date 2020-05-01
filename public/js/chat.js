const socket = io();

const form = document.querySelector("#form");
const input = document.querySelector("#message");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputMessage = input.value;
  socket.emit("sendMessage", inputMessage);
  input.value = "";
});
socket.on("message", (message) => {
  console.log(message);
});
