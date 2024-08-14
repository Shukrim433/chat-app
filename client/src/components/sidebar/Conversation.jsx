import { useAppContext } from "../../context/AppContext";
import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";

const Conversation = ({ conversation, emoji, lastIndx }) => {
  // this is a custom hook created using zustand, to create these global state values, alternative to useContext+provider etc...
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === conversation._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id); // conversation._id is the id of the reciever user in the selected convo
  const { chatVisible, setChatVisible } = useAppContext();
  return (
    <>
      <div /* if conversation div is clicked/selected, div bg = blue */
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
        ${isSelected ? "bg-sky-500" : ""} 
        `}
        onClick={() => {
          setSelectedConversation(conversation);
          setChatVisible(true); // when you click on a convo it hides the sidebar screen and shows the chat - mobile
        }}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={conversation.profilePic} alt="user avatar"></img>
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{conversation.fullName}</p>
            {/* <span className="text-xl">{emoji}</span> */}
          </div>
        </div>
      </div>

      {!lastIndx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};

export default Conversation;
