const socket = io();

const form = document.querySelector("#form");
const input = document.querySelector("#message");
const sendLocationBtn = document.querySelector("#send-location");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputMessage = input.value;
  socket.emit("sendMessage", inputMessage);
  input.value = "";
});

socket.on("message", (message) => {
  console.log(message);
});

sendLocationBtn.addEventListener("click", () => {
  if (!navigator.geolocation) {
    return alert("Geolocation is not supported by your browser!");
  }

  navigator.geolocation.getCurrentPosition((position) => {
    socket.emit(
      "sendLocation",
      {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      },
      (callback) => {
        console.log(callback);
      }
    );
  });
});
