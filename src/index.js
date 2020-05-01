const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on("connection", () => {
  console.log("New WebSocket Connection");
});

const publicDirectoryPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;

app.use(express.static(publicDirectoryPath));
server.listen(port, () => {
  console.log(`Server in up on port ${port}`);
});
