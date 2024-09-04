import { useHome } from "../../../context/HomeContext";
import { useAuth } from "../../../context/AuthContext";
import { useChat } from "../../../context/ChatContext";
import { useEffect } from "react";

function Chat({ chat }) {
  const { setOpenChat } = useHome();
  const { user } = useAuth();
  const { dispatch, otherUser } = useChat();

  useEffect(() => {
    dispatch({
      type: "setOtherUser",
      payload: chat.user1._id !== user._id ? chat.user1 : chat.user2,
    });
  }, [chat.user1, chat.user2, dispatch, user._id]);

  const { firstName, lastName, photo } = otherUser;

  async function handleOnChatClick() {
    setOpenChat(true);
    dispatch({ type: "setActiveChatId", payload: chat._id });
  }

  return (
    <div
      className="flex cursor-pointer justify-between rounded-md p-5 hover:bg-[#eeeeee86]"
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
