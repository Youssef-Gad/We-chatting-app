import { useChat } from "../../../context/ChatContext";
import { useEffect, useState } from "react";
import { getChatById } from "../../../services/apiChat";
import { useAuth } from "../../../context/AuthContext";
import { useSocket } from "../../../context/SocketContext";

function ChatHeader() {
  const { activeChatId, dispatch, otherUser } = useChat();
  const { firstName, lastName, photo } = otherUser;
  const { user } = useAuth();
  const { socket } = useSocket();
  const [isTyping, setIsTyping] = useState(false);
  const [roomId, setRoomId] = useState("");

  useEffect(() => {
    socket.on("is_typing", (roomId) => {
      if (roomId === activeChatId) {
        setRoomId(roomId);
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
        }, 3000);
      }
    });

    return () => {
      socket.off("is_typing", (roomId) => {
        if (roomId === activeChatId) setIsTyping(true);
      });
    };
  }, [activeChatId, socket]);

  useEffect(() => {
    async function getChat() {
      if (activeChatId) {
        const res = await getChatById(activeChatId);

        if (res.status === "success")
          dispatch({ type: "loadMessages", payload: res.chat.messages });
      }
    }
    getChat();
  }, [activeChatId, dispatch]);

  return (
    <div className="flex items-center justify-between border-b border-light-gray px-5 py-4">
      <div className="flex items-center gap-3">
        <img src={photo} alt="user" className="h-12 w-12 rounded-full" />
        {user._id === otherUser._id ? (
          <p className="flex flex-col text-lg font-semibold text-dark-gray">
            You
            <span className="text-[0.9rem] font-normal italic tracking-wider">
              {isTyping ? "typing..." : ""}
            </span>
          </p>
        ) : (
          <p className="flex flex-col text-lg font-semibold text-dark-gray">
            {firstName} {lastName}
            <span className="text-[0.9rem] font-normal italic tracking-wider">
              {isTyping && activeChatId === roomId ? "typing..." : ""}
            </span>
          </p>
        )}
      </div>
    </div>
  );
}

export default ChatHeader;
