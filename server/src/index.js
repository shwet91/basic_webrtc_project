import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});

const PORT = 8000;

app.get("/", (req, res) => {
  console.log("This part is working");
  res.send("Server is running!");
});

const nameToSocketIdMapping = new Map();
const socketIdToNameMapping = new Map();

io.on("connection", (socket) => {
  socket.on("join-room", (data) => {
    const { roomId, name } = data;
    console.log(`roomId and name joined is ${roomId} ${name}`, socket.id);
    nameToSocketIdMapping.set(name, socket.id);
    socketIdToNameMapping.set(socket.id, name);

    socket.join(roomId);
    socket.emit("joined-room", roomId);
    socket.broadcast.to(roomId).emit("new-user-joined", name);
  });

  socket.on("calling-peer", (data) => {
    const { receiverName, offer } = data;
    console.log(receiverName, offer);
    const receiverSocketId = nameToSocketIdMapping.get(receiverName);
    const senderName = socketIdToNameMapping.get(socket.id);
    console.log(receiverSocketId);
    socket.to(receiverSocketId).emit("incomming-call", { offer, senderName });
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
