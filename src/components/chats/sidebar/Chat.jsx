import { useHome } from "../../../context/HomeContext";
import { useAuth } from "../../../context/AuthContext";
import { useChat } from "../../../context/ChatContext";
import { useEffect } from "react";
import { useSocket } from "../../../context/SocketContext";

function Chat({ chat }) {
  const { setOpenChat, openChat, setOpenChatMobile } = useHome();
  const { user } = useAuth();
  const { dispatch, otherUser, inputRef, setRoomId } = useChat();
  const { socket } = useSocket();
  const { roomId } = useChat();

  useEffect(() => {
    dispatch({
      type: "setOtherUser",
      payload: chat.user1._id !== user._id ? chat.user1 : chat.user2,
    });
  }, [chat.user1, chat.user2, dispatch, user._id]);

  const { firstName, lastName, photo } = otherUser;

  async function handleOnChatClick() {
    // socket.emit("join_create_room", {
    //   senderId: user._id,
    //   receiverId: otherUser._id,
    //   roomId,
    // });
    // socket.on("room_created", (roomInfo) => {
    //   setRoomId(roomInfo._id);
    // });

    setOpenChat(chat._id);
    setOpenChatMobile(true);
    dispatch({ type: "setActiveChatId", payload: chat._id });
    inputRef?.current?.focus();
  }

  return (
    <div
      className={`${openChat === chat._id ? "border-r-2 border-primary bg-[#eefff7]" : "hover:bg-[#eeeeee86]"} flex cursor-pointer justify-between p-5`}
      onClick={handleOnChatClick}
    >
      <div className="flex gap-6">
        <img
          src={photo}
          alt="user"
          className="h-12 w-12 rounded-full sm:h-14 sm:w-14"
        />
        <div className="flex flex-col gap-1">
          <p className="ext-lg font-semibold text-dark-gray sm:text-xl">
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
