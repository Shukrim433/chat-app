import { useAppContext } from "../../context/AppContext";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";
import "../../pages/home/Home.css";

const Sidebar = () => {
  const { chatVisible, setChatVisible } = useAppContext();
  return (
    <div
      className={`side-bar ${
        chatVisible ? "hide" : ""
      } border border-slate-400 rounded-tl-md rounded-bl-md p-4 flex flex-col`}
    >
      <SearchInput />
      <div className="divider px-3"></div>
      <Conversations />
      <LogoutButton />
    </div>
  );
};

export default Sidebar;

// before border: min-w-[10vw]
