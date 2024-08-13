import { useRef, useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../../hooks/useSendMessage";
const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // if input field is empty, do not allow to send
    if (!message) {
      return;
    }
    await sendMessage(message);
    setMessage(""); // clear the input field after sending the message
  };
  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          type="text"
          placeholder="Type a message"
          className="border text-sm rounded-lg block w-full p-2.5"
          value={message}
          onChange={(event) => {
            setMessage(event.target.value);
          }}
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3"
        >
          {loading ? <div className="loading loading-spinner" /> : <BsSend />}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
