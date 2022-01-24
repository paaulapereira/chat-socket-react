import ScrollToBottom from "react-scroll-to-bottom";
import Message from "./Message";
import { motion } from "framer-motion";
import { popUP } from "../animations";

const Messages = ({ messages, name }) => (
  <ScrollToBottom className="list">
    {messages.map((message, i) => (
      <motion.div key={i} variants={popUP} initial="hidden" animate="show">
        <Message message={message} name={name} />
      </motion.div>
    ))}
  </ScrollToBottom>
);

export default Messages;
