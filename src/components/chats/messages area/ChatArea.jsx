import { useState } from "react";
import { useChat } from "../../../context/ChatContext";
import ChatHeader from "./ChatHeader";
import MessagesArea from "./MessagesArea";
import TypingInput from "./TypingInput";

function ChatArea() {
  const { activeChatId } = useChat();

  return (
    <div
      className={`${activeChatId === null ? "hidden md:flex" : "flex"} flex-grow flex-col justify-between`}
    >
      <ChatHeader />
      <MessagesArea />
      <TypingInput />
    </div>
  );
}

export default ChatArea;
