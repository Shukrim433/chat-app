import { Server } from "socket.io";
import http from "http"; // built in node.js module
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

// recieverId will be passed from backend, sendMessage controller
export const getRecieverSocketId = (recieverId) => {
  return userSocketMap[recieverId];
};

const userSocketMap = {}; // {userId: socketId}

// listening for connections and disconnections
io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId != "undefined") {
    userSocketMap[userId] = socket.id;
  }

  // io.emit() is used to send events to all connected clients // shows who is online
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // socket.on() is used to listen to the events. can be used both on client and server side
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap)); // shows whos offline
  });
});

export { app, io, server };

//**
// Object.keys(userSocketMap): This returns an array of all the keys in the userSocketMap object. In this context, userSocketMap likely represents a mapping of users to their respective socket connections.

// If userSocketMap looks like this:
/* const userSocketMap = {
    "user123": someSocketObject,
    "user456": anotherSocketObject
  }; */

// Object.keys(userSocketMap) will return:
// ["user123", "user456"]

// !!** The "userId" variable passed from the front end will be replaced by its value of the actual userId itself **
