import { useEffect, useRef } from "react";
import useGetMessages from "../../../hooks/useGetMessages";
import MessageSkeleton from "../../skeletons/MessageSkeleton";
import Message from "./Message";
import useListenMessages from "../../../hooks/useListenMessages";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  useListenMessages(); // function called to listen for new messages
  const lastMessageRef = useRef();

  //**explanation
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))}
      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && messages.length === 0 && (
        <p className="text-center">Send a message to start the conversation</p>
      )}
    </div>
  );
};

export default Messages;

//**
// USEEFFECT: dependency array is the "messages" array fetched from the db, for the "selectedConversation"
// SETTIMEOUT: to wait 100 miliseconds, for the messages to be fetched from the db, before scrolling
// (else will try to scroll immediately + wont work bcuz there's no "lastMessage" to scroll to yet)
// USEREF: creates a persistent reference to the last message div in the DOM.
// The reference (lastMessageRef) is attached to the last message in the list, allowing the useEffect to scroll
// the view smoothly to this message whenever the "messages" array changes (e.g., when a new message is added).
// This ensures the user always sees the most recent message without manually scrolling.

// The value of lastMessageRef.current is the actual DOM node (the div element) corresponding to the last message
// in the list after the component has rendered. Before rendering its value is "null"
