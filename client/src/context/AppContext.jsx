import { createContext, useContext, useState } from "react";

// CONTEXT
export const AppContext = createContext();

// CUSTOM HOOK
export const useAppContext = () => {
  return useContext(AppContext);
};

// PROVIDER
export const AppContextProvider = ({ children }) => {
  const [chatVisible, setChatVisible] = useState(false);

  return (
    <AppContext.Provider value={{ chatVisible, setChatVisible }}>
      {children}
    </AppContext.Provider>
  );
};
