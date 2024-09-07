import ChatHeader from "./ChatHeader";
import MessagesArea from "./MessagesArea";
import TypingInput from "./TypingInput";

function ChatArea() {
  return (
    <div className="hidden flex-grow flex-col justify-between sm:flex">
      <ChatHeader />
      <MessagesArea />
      <TypingInput />
    </div>
  );
}

export default ChatArea;
