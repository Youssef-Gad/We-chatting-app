import { useHome } from "../../../context/HomeContext";
import { useAuth } from "../../../context/AuthContext";
import { useChat } from "../../../context/ChatContext";
import { useSocket } from "../../../context/SocketContext";
import { convertTime } from "../../../helpers/helpers";
import { useEffect, useState } from "react";

function Chat({ chat }) {
  const { setOpenChat, openChat } = useHome();
  const { user } = useAuth();
  const { dispatch, inputRef, activeChatId, unreadMessages } = useChat();
  const { socket } = useSocket();
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [isOnline, setIsOnline] = useState(false);
  const [flag, setFlag] = useState(0);
  const [content, setContent] = useState("");
  const [sentAt, setSentAt] = useState("");
  const [unreadNum, setUnreadNum] = useState(0);

  useEffect(() => {
    if (activeChatId === null) {
      const unreadCount = unreadMessages?.filter(
        (roomId) => roomId === chat._id,
      ).length;
      setUnreadNum(unreadCount);
    } else {
      setUnreadNum(0);
      localStorage.setItem("unreadMessages", JSON.stringify([]));
    }
  }, [activeChatId, unreadMessages, chat._id]);

  useEffect(() => {
    const handleOnlineUsers = (data) => {
      if (data)
        for (let i = 0; i < data.length; i++) {
          if (data[i] === chat.user._id) {
            setIsOnline(true);
            setFlag(1);
            return;
          }
        }

      setOnlineUsers(data);
      if (flag) setIsOnline(false);
    };

    socket.on("update_online_users", handleOnlineUsers);

    return () => {
      socket.off("update_online_users", handleOnlineUsers);
    };
  }, [socket, chat.user._id, flag, onlineUsers]);

  useEffect(() => {
    if (onlineUsers.includes(chat.user._id)) setIsOnline(true);
    else setIsOnline(false);
  }, [onlineUsers, chat.user._id]);

  useEffect(() => {
    if (chat.lastSentMessage === null) {
      setContent("Start Conversation");
      setSentAt(convertTime(chat.createdAt));
    } else {
      setContent(chat.lastSentMessage.content);
      setSentAt(convertTime(chat.lastSentMessage.sentAt));
    }
  }, [chat.createdAt, chat.lastSentMessage]);

  let firstName, lastName, photo;
  if (chat.user) {
    firstName = chat.user.firstName;
    lastName = chat.user.lastName;
    photo = chat.user.photo;
  }

  async function handleOnChatClick() {
    dispatch({ type: "setActiveChatId", payload: chat._id });
    dispatch({ type: "setOtherUser", payload: chat.user });

    socket.emit("join_create_room", {
      senderId: user._id,
      receiverId: chat.user._id,
      roomId: chat._id,
    });

    setOpenChat(chat._id);
    inputRef?.current?.focus();
  }

  return (
    <div
      className={`${openChat === chat._id ? "border-r-2 border-primary bg-[#EAF2F0]" : "border-r-2 border-[#eeeeee86] hover:bg-[#eeeeee86]"} relative flex cursor-pointer justify-between p-5`}
      onClick={handleOnChatClick}
    >
      <div className="flex gap-6">
        <img src={photo} alt="user" className="h-14 w-14 rounded-full" />
        <div className="flex flex-col gap-1">
          {user._id === chat.user._id ? (
            <p className="text-xl font-semibold text-dark-gray">
              ({firstName} {lastName}) You
            </p>
          ) : (
            <p className="text-xl font-semibold text-dark-gray">
              {firstName} {lastName}
            </p>
          )}
          {isOnline && (
            <div className="absolute right-[28.4rem] top-5 h-4 w-4 rounded-full bg-green-500"></div>
          )}

          <p className="text-gray">
            {content.slice(0, 18)}
            {content.length > 18 ? "..." : ""}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-end gap-1">
        <p className="font-semibold text-primary">{sentAt}</p>

        {unreadNum > 0 && (
          <p className="flex h-3 w-3 items-center justify-center rounded-full bg-warning p-3 text-white">
            {unreadNum}
          </p>
        )}
      </div>
    </div>
  );
}

export default Chat;
