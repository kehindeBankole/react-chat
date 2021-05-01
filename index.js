const cors = require("cors");
const path = require("path");
const express = require("express");
const http = require("http");
const socketio = require("socket.io");

const app = express();

const server = http.createServer(app);
const io = socketio(server);
//run when client connects
io.on("connection", (socket) => {
  console.log(socket.id);
  //single client
  socket.emit("message", "welcome to chatFor");

  //broadcast when user connects--all except user
  socket.broadcast.emit("message", "a user has joined the chat");

  //all clients including user
  io.emit();


  socket.on("disconnect", () => {
    console.log("logged out");
   io.emit("message", "a user has left the chat");
  });
});
app.use(cors());
//app.use(express.static(path.join(__dirname , 'public')))
const PORT = 3002 || process.env.PORT;

server.listen(PORT, () => console.log("server started on port" + " " + PORT));
