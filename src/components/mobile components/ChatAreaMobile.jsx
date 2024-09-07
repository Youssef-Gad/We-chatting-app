import ChatHeader from "../chats/messages area/ChatHeader";
import MessagesArea from "../chats/messages area/MessagesArea";
import TypingInput from "../chats/messages area/TypingInput";

function ChatAreaMobile() {
  return (
    <div className="flex flex-grow flex-col justify-between sm:hidden">
      <ChatHeader />
      <MessagesArea />
      <TypingInput />
    </div>
  );
}

export default ChatAreaMobile;
