import Chat from "./Chat";
import Loader from "../../../ui/Loader";
import { useChat } from "../../../context/ChatContext";

function ChatList() {
  const { chats, isLoading } = useChat();

  if (isLoading) return <Loader />;

  return (
    <div className="overflow-y-scroll">
      {chats.map((chat) => (
        <Chat key={chat._id} chat={chat} />
      ))}
    </div>
  );
}

export default ChatList;
