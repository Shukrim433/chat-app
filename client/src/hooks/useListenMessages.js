import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      newMessage.shouldShake = true;
      console.log(newMessage, "should shake?");
      const sound = new Audio(notificationSound);
      sound.play();
      setMessages([...messages, newMessage]);
    });

    return () => socket?.off("newMessage");
  }, [socket, setMessages, messages]);
};

export default useListenMessages;

// setMessages([...messages, newMessage])
// to update messages array in selected conversation w/ new message(s),
// w/o needing to refresh the page

// return () => socket?.off("newMessage")
// when the component unmounts we no longer want to listen for the "newMessage" event

// newMessage.shouldShake = true;
// this adds a shoulShake key to the newMessage object that is being created in the "sendMessage" controller in the backend
