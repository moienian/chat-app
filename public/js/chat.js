const socket = io();

const form = document.getElementById("form");
const input = document.getElementById("message");
const submitBtn = form.querySelector("button");
const sendLocationBtn = document.querySelector("#send-location");

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
