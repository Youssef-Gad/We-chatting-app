import { useChat } from "../../../context/ChatContext";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useSocket } from "../../../context/SocketContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function ChatHeader() {
  const { activeChatId, dispatch, otherUser } = useChat();
  const { user } = useAuth();
  const { socket } = useSocket();
  const [isTyping, setIsTyping] = useState(false);
  const [roomId, setRoomId] = useState("");
  const { firstName, lastName, photo } = otherUser;

  // It handle is typing state it appear for 3sec and then disappear
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
