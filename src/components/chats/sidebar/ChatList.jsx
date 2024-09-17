import Chat from "./Chat";
import Loader from "../../../ui/Loader";
import { useChat } from "../../../context/ChatContext";

function ChatList() {
  const { chats, isLoading } = useChat();

  if (isLoading) return <Loader />;

  return (
    <div className="overflow-y-scroll">
      {chats.map((chat, i) => (
        <Chat key={i} chat={chat} />
      ))}
    </div>
  );
}

export default ChatList;
