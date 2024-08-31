import { ChatProvider } from "../../../context/ChatContext";
import ChatHeader from "./ChatHeader";
import MessagesArea from "./MessagesArea";
import TypingInput from "./TypingInput";

function Chat() {
  return (
    <div className="flex flex-grow flex-col justify-between">
      <ChatProvider>
        <ChatHeader />
        <MessagesArea />
        <TypingInput />
      </ChatProvider>
    </div>
  );
}

export default Chat;
