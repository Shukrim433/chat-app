import { create } from "zustand";

const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),

  messages: [],
  setMessages: (messages) => set({ messages }),
}));

export default useConversation;

// essentally useState
// u call a "set" function and pass a value as an arg to "update/set" the new "state"
