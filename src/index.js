const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const Filter = require("bad-words");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (socket) => {
  console.log("New WebSocket Connection");

  socket.emit("message", "Wellcome");

  socket.broadcast.emit("message", "A new user has joined!");

  socket.on("sendMessage", (message, callback) => {
    const filter = new Filter();
    if (filter.isProfane(message)) {
      return callback("Profanity is not allowed!");
    }
    io.emit("message", message);
    callback();
  });

  socket.on("sendLocation", ({ latitude, longitude }, callback) => {
    io.emit("message", `https://google.com/maps?q=${latitude},${longitude}`);
    callback("Location shared!");
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
