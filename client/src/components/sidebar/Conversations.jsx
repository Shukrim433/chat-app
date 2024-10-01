import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emojis";
import Conversation from "./Conversation";

const Conversations = () => {
  const { loading, conversations } = useGetConversations();
  /* console.log("getUsersForSideBar:", conversations); */
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversation, idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation} // pass individual convo obj as a prop
          emoji={getRandomEmoji()}
          lastIndx={idx === conversations.length - 1}
        />
      ))}

      {loading ? <span className="loading loading-spinner mx-auto" /> : null}
    </div>
  );
};

export default Conversations;

/* overflow-auto: gives scroll bar for overflow */
