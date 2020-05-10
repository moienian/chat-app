const socket = io();

const form = document.getElementById("form");
const input = document.getElementById("message");
const submitBtn = form.querySelector("button");
const sendLocationBtn = document.querySelector("#send-location");
const messages = document.querySelector("#messages");

// Templates
const messageTemplate = document.querySelector("#message-template").innerHTML;
const locationTemplate = document.querySelector("#location-template").innerHTML;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  submitBtn.setAttribute("disabled", "disabled");

  const message = input.value;
  socket.emit("sendMessage", message, (error) => {
    submitBtn.removeAttribute("disabled");

    if (error) {
      console.log(error);
    }
    console.log("Message delivered!");
  });
  input.value = "";
});

socket.on("message", (message) => {
  console.log(message);
  const html = Mustache.render(messageTemplate, {
    message: message.text,
    createdAt: moment(message.createdAt).format("h:mm A"),
  });
  messages.insertAdjacentHTML("beforeend", html);
});

socket.on("locationMessage", (url) => {
  console.log(url);
  const html = Mustache.render(locationTemplate, {
    url,
  });
  messages.insertAdjacentHTML("beforeend", html);
});

sendLocationBtn.addEventListener("click", () => {
  if (!navigator.geolocation) {
    return alert("Geolocation is not supported by your browser!");
  }

  sendLocationBtn.setAttribute("disabled", "disabled");

  navigator.geolocation.getCurrentPosition((position) => {
    socket.emit(
      "sendLocation",
      {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      },
      (callback) => {
        sendLocationBtn.removeAttribute("disabled");
        console.log(callback);
      }
    );
  });
});
