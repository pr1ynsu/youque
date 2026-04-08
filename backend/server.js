const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

let drivers = {}; // store live driver locations

io.on("connection", (socket) => {
  console.log("Connected:", socket.id);

  // DRIVER SENDS LOCATION
  socket.on("driverLocation", (data) => {
    drivers[data.driverId] = data;

    // send to all users
    io.emit("updateDrivers", drivers);
  });

  socket.on("disconnect", () => {
    console.log("Disconnected:", socket.id);
  });
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});