import { useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const res = await fetch(
        ` /api/messages/send/${selectedConversation._id}`, // selectedConversation is the user obj of the reciever (person ur having the convo w/)
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message }),
        }
      );

      // data = message we created:
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      // spread the old messages and add the new message (data) to the end of the array
      setMessages([...messages, data]); // messages if from the zustand store, initial value is an empty array
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, sendMessage };
};

export default useSendMessage;
