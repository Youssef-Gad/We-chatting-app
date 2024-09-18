import { useState } from "react";
import { useChat } from "../../../context/ChatContext";
import ChatHeader from "./ChatHeader";
import MessagesArea from "./MessagesArea";
import TypingInput from "./TypingInput";

function ChatArea() {
  const { activeChatId } = useChat();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div
      className={`${activeChatId === null ? "hidden sm:flex" : "flex"} flex-grow flex-col justify-between`}
    >
      <ChatHeader setIsLoading={setIsLoading} />
      <MessagesArea isLoading={isLoading} />
      <TypingInput />
    </div>
  );
}

export default ChatArea;
