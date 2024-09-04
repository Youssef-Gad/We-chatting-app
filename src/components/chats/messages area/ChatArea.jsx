import ChatHeader from "./ChatHeader";
import MessagesArea from "./MessagesArea";
import TypingInput from "./TypingInput";

function ChatArea() {
  return (
    <div className="flex flex-grow flex-col justify-between">
      <ChatHeader />
      <MessagesArea />
      <TypingInput />
    </div>
  );
}

export default ChatArea;
