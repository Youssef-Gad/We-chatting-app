import { useChat } from "../../../context/ChatContext";
import { useEffect, useState } from "react";
import { getChatById } from "../../../services/apiChat";
import { useAuth } from "../../../context/AuthContext";
import { useSocket } from "../../../context/SocketContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function ChatHeader({ setIsLoading }) {
  const { activeChatId, dispatch, otherUser } = useChat();
  const { user } = useAuth();
  const { socket } = useSocket();
  const [isTyping, setIsTyping] = useState(false);
  const [roomId, setRoomId] = useState("");
  const { firstName, lastName, photo } = otherUser;

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
      setIsLoading(true);
      try {
        if (activeChatId) {
          const res = await getChatById(activeChatId);

          if (res.status === "success")
            dispatch({ type: "loadMessages", payload: res.chat.messages });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    getChat();
  }, [activeChatId, dispatch, setIsLoading]);

  return (
    <div className="flex items-center justify-between border-b border-light-gray px-5 py-4">
      <div className="flex items-center gap-3">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="block rounded-full bg-[#F5F5F4] p-2 text-2xl text-dark-gray sm:hidden"
          onClick={() => {
            dispatch({ type: "deleteActiveChatId" });
            dispatch({ type: "deleteUnreadMessages" });
            socket.emit("disconnect_from_room", user._id);
          }}
        />
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
            <span className="h-1 pb-4 text-[0.9rem] font-normal italic tracking-wider">
              {isTyping && activeChatId === roomId ? "typing..." : ""}
            </span>
          </p>
        )}
      </div>
    </div>
  );
}

export default ChatHeader;
