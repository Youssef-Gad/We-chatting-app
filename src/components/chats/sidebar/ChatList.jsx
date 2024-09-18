import Chat from "./Chat";
import Loader from "../../../ui/Loader";
import { useChat } from "../../../context/ChatContext";
import { useAuth } from "../../../context/AuthContext";

function ChatList() {
  const { chats, isLoading } = useChat();
  const { user } = useAuth();

  if (isLoading) return <Loader />;

  if (!chats.length)
    return (
      <div className="flex h-full items-center justify-center text-base font-semibold text-dark-gray sm:text-xl">
        Hi, {user.firstName} Search For People To Start A Chat.
      </div>
    );

  return (
    <div className="overflow-y-scroll">
      {chats.map((chat, i) => (
        <Chat key={i} chat={chat} />
      ))}
    </div>
  );
}

export default ChatList;
