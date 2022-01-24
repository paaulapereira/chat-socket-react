import React, { useState } from "react";
import { Link } from "react-router-dom";
//animaciones
import { motion } from "framer-motion";
import { fadeIn } from "../animations";
import Line from "./Line";

const Login = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  console.log("Para hablar con tus amigos, tienen que estar en la misma sala!");
  console.log("Sin nombre de usuario y sala no te puedes conectar!");
  return (
    <div className="main">
      <motion.div
        className="login"
        variants={fadeIn}
        initial="hidden"
        animate="show"
      >
        <h1 className="title">¡Bienvenido al Chat!</h1>
        <h2 className="subtitle">
          ¡Conéctate para hablar con tus amigos! <br />
          <span>en la misma sala</span>
        </h2>

        <div>
          <input
            type="text"
            placeholder="Username"
            className="loginInput"
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Sala para chatear"
            className="loginInput"
            onChange={(event) => setRoom(event.target.value)}
          />
        </div>
        <Link
          onClick={(event) =>
            !name || !room
              ? (event.preventDefault(),
                alert(
                  "Por favor, ponga un nombre de usuario o sala válidos! Si no sabemos quién eres, no te puedes conectar :("
                ))
              : null
          }
          to={`/chat?name=${name}&room=${room}`}
        >
          <button className="btn" type="submit">
            Entrar
          </button>
        </Link>
      </motion.div>
      <Line />
    </div>
  );
};
export default Login;
