import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import { useLocation } from "react-router";
//componentes
import Information from "./Information";
import Input from "./Input";
import Messages from "./Messages";
import OnlineUsers from "./OnlineUsers";
import Line from "./Line";
//animaciones
import { motion } from "framer-motion";
import { fadeIn } from "../animations";

let socket;

const Chat = () => {
  const location = useLocation();
  //states
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  //puerto
  const ENDPOINT = "localhost:5000";

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    //seteamos los valores de name y room de acuerdo con lo que el user ha puesto
    setName(name);
    setRoom(room);
    //creamos el socket
    socket = io(ENDPOINT);
    //eventos de socket
    socket.emit("join", { name, room }, () => {});
    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [ENDPOINT, location.search]);
  //funcion para administrar los mensajes
  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, [messages]);

  //funcion para enviar mensajes
  const sendMessage = (event) => {
    event.preventDefault(); //hacemos que la pagina no se refreshee con el click

    if (message) {
      //despues de enviar el mensaje, limpia el input
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };
  console.log(message, messages);

  return (
    <div className="main chat">
      <OnlineUsers users={users} username={name} location={location} />
      <motion.div
        className="container"
        variants={fadeIn}
        initial="hidden"
        animate="show"
      >
        <Information room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </motion.div>
      <Line />
    </div>
  );
};
export default Chat;
