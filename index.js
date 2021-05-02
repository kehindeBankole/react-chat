const cors = require("cors");
const path = require("path");
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const { Socket } = require("dgram");

const app = express();

const server = http.createServer(app);
const io = socketio(server);
const formatMessage = require('./utils/messages')
//run when client connects
io.on("connection", (socket) => {
  console.log(socket.id);
  //single client
  socket.emit('id' , socket.id)
  socket.emit("messagewelcome", formatMessage('bot' , `welcome to chatFor ${socket.id}`));

  //broadcast when user connects--all except user
  socket.broadcast.emit("messagewelcome", formatMessage('bot' , `a user has joined the chat`));

  //all clients including user
  io.emit();

  //listen for chat message

  socket.on("chatMessage", (msg) => {
    console.log(msg);
    io.emit("message", formatMessage('USER' , `${msg}` , socket.id));
  });

  socket.on("disconnect", () => {
    console.log("logged out");
    io.emit("messagewelcome", "a user has left the chat");
  });
});
app.use(cors());
//app.use(express.static(path.join(__dirname , 'public')))
const PORT = 3002 || process.env.PORT;

server.listen(PORT, () => console.log("server started on port" + " " + PORT));
