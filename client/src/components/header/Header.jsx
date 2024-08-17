import { AiFillMessage } from "react-icons/ai";
const Header = () => {
  return (
    <header>
      <h1>
        ChatApp{" "}
        <span className="icon">
          <AiFillMessage />
        </span>
      </h1>
    </header>
  );
};

export default Header;
