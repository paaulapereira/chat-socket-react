const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");

//importamos las funciones de usuario
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");
//creamos el puerto para la conexion
const PORT = process.env.PORT || 5000;

//creamos el servidor
const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*",
  },
});
app.use(cors());

io.on("connection", (socket) => {
  console.log("We have a new connection!!!");

  socket.on("join", ({ name, room }, callback) => {
    console.log(`The user ${name} has entered the room ${room}`);

    const { error, user } = addUser({ id: socket.id, name, room });
    //error handling
    if (error) return callback(error);

    socket.emit("message", {
      user: "admin",
      text: `${user.name}, bienvenido a la sala ${user.room} :)`,
    });
    socket.broadcast.to(user.room).emit("message", {
      user: "admin",
      text: `${user.name} ha entrado en el chat!`,
    });

    socket.join(user.room);
    //funcion para obtener los usuarios de un room
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit("message", { user: user.name, text: message });

    callback();
  });

  socket.on("disconnect", () => {
    console.log("user had left!!!");
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit("message", {
        user: "admin",
        text: `${user.name} se fue :( igual mañana vuelve.`,
      });
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

server.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
