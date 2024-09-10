import { useHome } from "../../../context/HomeContext";
import { useAuth } from "../../../context/AuthContext";
import { useChat } from "../../../context/ChatContext";
import { useEffect } from "react";
import { useSocket } from "../../../context/SocketContext";

function Chat({ chat }) {
  const { setOpenChat, openChat } = useHome();
  const { user } = useAuth();
  const { dispatch, otherUser, inputRef } = useChat();
  const { socket } = useSocket();

  useEffect(() => {
    dispatch({
      type: "setOtherUser",
      payload: chat.user,
    });
  }, [chat.user, dispatch]);
  // console.log(otherUser);

  const { firstName, lastName, photo } = otherUser;

  async function handleOnChatClick() {
    dispatch({ type: "setActiveChatId", payload: chat._id });
    // console.log({
    //   senderId: user._id,
    //   receiverId: otherUser._id,
    //   roomId: chat._id,
    // });

    socket.emit("join_create_room", {
      senderId: user._id,
      receiverId: otherUser._id,
      roomId: chat._id,
    });
    socket.on("room_created", (roomInfo) => {
      // console.log(roomInfo);
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
          <p className="text-xl font-semibold text-dark-gray">
            {firstName} {lastName}
          </p>
          <p className="text-gray">Last Message</p>
        </div>
      </div>
      <p className="font-semibold text-primary">Just now</p>
    </div>
  );
}

export default Chat;
