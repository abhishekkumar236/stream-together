// server.js
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("play", (currentTime) => {
    socket.broadcast.emit("play", currentTime);
  });

  socket.on("pause", (currentTime) => {
    socket.broadcast.emit("pause", currentTime);
  });

  socket.on("seek", (currentTime) => {
    socket.broadcast.emit("seek", currentTime);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
