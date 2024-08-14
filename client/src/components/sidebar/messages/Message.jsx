import { useAuthContext } from "../../../context/authContext";
import { extractTime } from "../../../utils/extractTime";
import useConversation from "../../../zustand/useConversation";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const formattedTime = extractTime(message.createdAt);
  const fromMe = message.senderId === authUser._id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";

  const shakeClass = message.shouldShake ? "shake" : "";

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="pfp-2 w-10 rounded-full">
          <img src={profilePic} alt="chat bubble user icon"></img>
        </div>
      </div>

      <div
        className={`msg-bubble chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}
      >
        {message.message}
      </div>

      <div
        className={`chat-footer opacity-50 text-xs flex gap-1 items-center `}
      >
        {formattedTime}
      </div>
    </div>
  );
};

export default Message;

/* chat-end : message bubble sent from you */
/* chat-start : message bubble sent from other user */
