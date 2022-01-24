import ReactEmoji from "react-emoji";

const Message = ({ message: { user, text }, name }) => {
  let isSentByCurrentUser = false;
  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }
  return isSentByCurrentUser ? (
    <div className="message message_sent">
      <p className="username ">{trimmedName}</p>
      <div className="message_box sent ">
        <p className="message_text ">{ReactEmoji.emojify(text)}</p>
      </div>
    </div>
  ) : (
    <div className="message message_recieved">
      <div className="message_box recieved">
        <p className="message_text ">{ReactEmoji.emojify(text)}</p>
      </div>
      <p className="username ">{user}</p>
    </div>
  );
};
export default Message;
