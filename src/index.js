const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (socket) => {
  console.log("New WebSocket Connection");

  socket.emit("message", "Wellcome");

  socket.broadcast.emit("message", "A new user has joined!");

  socket.on("sendMessage", (message) => {
    io.emit("message", message);
  });

  socket.on("sendLocation", ({ latitude, longitude }) => {
    io.emit("message", `https://google.com/maps?q=${latitude},${longitude}`);
  });
  socket.on("disconnect", () => {
    io.emit("message", "A user has left!");
  });
});

const publicDirectoryPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;

app.use(express.static(publicDirectoryPath));
server.listen(port, () => {
  console.log(`Server in up on port ${port}`);
});
