import { useHome } from "../../../context/HomeContext";
import { useAuth } from "../../../context/AuthContext";
import { useChat } from "../../../context/ChatContext";
import { useSocket } from "../../../context/SocketContext";
import { convertTime } from "../../../helpers/helpers";
import { useEffect } from "react";

function Chat({ chat }) {
  const { setOpenChat, openChat } = useHome();
  const { user } = useAuth();
  const { dispatch, inputRef, otherUser } = useChat();
  const { socket } = useSocket();

  let firstName, lastName, photo;
  if (chat.user) {
    firstName = chat.user.firstName;
    lastName = chat.user.lastName;
    photo = chat.user.photo;
  }

  let content, sentAt;
  if (chat.lastSentMessage === null) {
    content = "Start Conversation";
    sentAt = convertTime(chat.createdAt);
  } else {
    content = chat.lastSentMessage.content;
    sentAt = convertTime(chat.lastSentMessage.sentAt);
  }

  async function handleOnChatClick() {
    dispatch({ type: "setActiveChatId", payload: chat._id });
    dispatch({ type: "setOtherUser", payload: chat.user });

    socket.emit("join_create_room", {
      senderId: user._id,
      receiverId: chat.user,
      roomId: chat._id,
    });

    setOpenChat(chat._id);
    inputRef?.current?.focus();
  }

  return (
    <div
      className={`${openChat === chat._id ? "border-r-2 border-primary bg-[#eefff7]" : "hover:bg-[#eeeeee86]"} flex cursor-pointer justify-between p-5`}
      onClick={handleOnChatClick}
    >
      <div className="flex gap-6">
        <img src={photo} alt="user" className="h-14 w-14 rounded-full" />
        <div className="flex flex-col gap-1">
          {/* {user._id === otherUser._id ? (
            <p className="text-xl font-semibold text-dark-gray">You</p>
          ) : (
            <p className="text-xl font-semibold text-dark-gray">
              {firstName} {lastName}
            </p>
          )} */}

          <p className="text-xl font-semibold text-dark-gray">
            {firstName} {lastName}
          </p>

          <p className="text-gray">{content}</p>
        </div>
      </div>
      <p className="font-semibold text-primary">{sentAt}</p>
    </div>
  );
}

export default Chat;
