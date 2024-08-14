import MessageContainer from "../../components/sidebar/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";
import "./Home.css"

const Home = () => {
  return (
  <div className="home-page flex h-screen w-screen">
    <Sidebar/>
    <MessageContainer/>
  </div> 
)
};

export default Home;

// after flex min-w-[100vw]