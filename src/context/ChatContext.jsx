import { createContext, useContext, useState } from "react";

const ChatContext = createContext();

export function ChatProvider({ children }) {
  const [message, setMessage] = useState({});
  const [messages, setMessages] = useState([]);

  return (
    <ChatContext.Provider
      value={{ message, setMessage, messages, setMessages }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined)
    throw new Error("ChatContext was used outside of ChatProvider");
  return context;
}
