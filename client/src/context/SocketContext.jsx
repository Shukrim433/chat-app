import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./authContext";
import io from "socket.io-client";

// CONTEXT
const SocketContext = createContext();

// CUSTOM HOOK that returns {socket, onlineUsers}
export const useSocketContext = () => {
  return useContext(SocketContext);
};

// PROVIDER
export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    // 1
    if (authUser) {
      const socket = io("https://chat-app-1jfo.onrender.com", {
        query: {
          userId: authUser._id, // sending logged in user's id to the backend
        },
      });

      setSocket(socket);

      // socket.on() is used to listen to the events. can be used both on client and server side
      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users); // array of online user's user ids
      });

      return () => socket.close(); // 2
    } else {
      // 3
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]); //whenever the loggedIn user changes, run this useEffect

  // GLOBAL STATE VALUES PROVIDED BY THIS PROVIDER: socket, onlineUsers
  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

// 1
// If the user is logged in (authenticated user) is present, the code establishes a
// socket connection to the server at http://localhost:5000.

// 2
// While the user is logged in, if the child components that use this SocketContextProvider (<App/>...) are unmounted,
// (ie. close/change tab) the socket connection is closed to prevent memory leaks and unnecessary network activity.

// 3
// If user is not logged in (authUser is null or undefined), any existing socket connection is closed and the
// socket state is set to null.
