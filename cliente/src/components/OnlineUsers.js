import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { fadeIn } from "../animations";
//para poder hablar con usuarios online
import { useState, useEffect } from "react";
import queryString from "query-string";

const OnlineUsers = ({ users, location }) => {
  //obtenemos el username para que se puedan hablar con personas distintas
  const [username, setUsername] = useState("");
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    setUsername(name);
  }, [location.search]);

  return (
    <motion.div
      className="onlineList"
      variants={fadeIn}
      initial="hidden"
      animate="show"
    >
      {users ? (
        <div>
          <div className="heading">
            <h2>Online Users</h2>
          </div>

          <div className="users">
            {users.map(({ name }) => (
              <div
                key={name}
                className="user"
                onClick={() =>
                  (window.location = `chat?name=${username}&room=${name}`)
                }
              >
                <FontAwesomeIcon
                  icon={faCircle}
                  className="online"
                  size="xs"
                  color="lightgreen"
                />
                <p>
                  <a href={`chat?name=${username}&room=${name}`}>{name}</a>
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </motion.div>
  );
};
export default OnlineUsers;
