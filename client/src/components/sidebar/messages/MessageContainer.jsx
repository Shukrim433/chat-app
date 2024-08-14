import { TiMessages } from "react-icons/ti";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import useConversation from "../../../zustand/useConversation";
import { useEffect } from "react";
import { useAuthContext } from "../../../context/authContext";
import { useAppContext } from "../../../context/AppContext";
import { IoMdArrowBack } from "react-icons/io";
import "../../../pages/home/Home.css";

const MessageContainer = () => {
  // selectedConversation has already been set in the Conversation component:
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { chatVisible, setChatVisible } = useAppContext();
  useEffect(() => {
    // cleanup function to reset selectedConversation to null (initial value) when component unmounts
    // unmounting is when a component is removed from the DOM (e.g. when you navigate to a different page/reload/logout etc)
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div
      className={`msg-container ${
        !chatVisible ? "hide" : ""
      } border border-slate-400 rounded-tr-md rounded-br-md flex flex-col`}
    >
      {/* if selectedConversation is null show "select chat" message, else show selected convo mesages*/}
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* HEADER: */}
          <div className={`msg-header bg-slate-500 px-4 py-2 mb-2`}>
            <div>
              <span className="label-text">To:</span>{" "}
              <span className="text-gray-900 font-bold">
                {selectedConversation.fullName}
              </span>
            </div>
            <div>
              <button className="arrow-btn"
                onClick={() => {
                  setChatVisible(false);
                }}
              >
                <IoMdArrowBack />
              </button>
            </div>
          </div>

          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome {authUser.fullName}</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};

// before md:min[]: min-w-[50vw]
