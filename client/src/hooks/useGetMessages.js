import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/messages/${selectedConversation._id}`); // selectedConversation is the obj of the reciever user
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setMessages(data); // set the messages array in the zustand store to the messages we got from the server (GET)
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    // only call function if selectedConversation is not null  (ie if we have a selected conversation)
    if (selectedConversation?._id) {
      getMessages();
    }
  }, [selectedConversation._id, setMessages]); // useEffect will run whenever selectedConversation._id changes (ie when we select a new conversation)

  return { loading, messages };
};

export default useGetMessages;
