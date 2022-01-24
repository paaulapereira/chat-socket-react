import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const Input = ({ message, setMessage, sendMessage }) => (
  <form className="form">
    <input
      type="text"
      className="input"
      placeholder="Escribe un mensaje..."
      value={message}
      onChange={(event) => setMessage(event.target.value)}
      onKeyPress={(event) =>
        event.key === "Enter" ? sendMessage(event) : null
      }
    />
    <button className="btn-secondary" onClick={(event) => sendMessage(event)}>
      <FontAwesomeIcon icon={faPaperPlane} />
    </button>
  </form>
);

export default Input;
