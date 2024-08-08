import { createContext, useContext, useState } from "react";

// CONTEXT to hold logged in user
export const AuthContext = createContext();

// CUSTOM HOOK that returns {authUser, setAuthUser} values
export const useAuthContext = () => {
  return useContext(AuthContext);
};

// PROVIDER to wrap the App and provide access to these values to all child components
export const AuthContextProvider = ({ children }) => {
  // state holding logged in user, default value = from local storage or null if not found
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("chat-user")) || null
  );

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
