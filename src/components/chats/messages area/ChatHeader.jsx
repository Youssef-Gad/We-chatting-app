import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useChat } from "../../../context/ChatContext";
import { useEffect } from "react";
import { getChatById } from "../../../services/apiChat";

function ChatHeader() {
  const { activeChatId, dispatch, otherUser } = useChat();
  const { firstName, lastName, photo } = otherUser;

  useEffect(() => {
    async function getChat() {
      if (activeChatId) {
        const res = await getChatById(activeChatId);
        console.log(res);

        if (res.status === "success")
          dispatch({ type: "loadMessages", payload: res.chat.messages });
        // dispatch({ type: "setOtherUser", payload: chat.user });
      }
    }
    getChat();
  }, [activeChatId, dispatch]);

  return (
    <div className="flex items-center justify-between border-b border-light-gray px-5 py-4">
      <div className="flex items-center gap-3">
        <img src={photo} alt="user" className="h-12 w-12 rounded-full" />
        <p className="text-lg font-semibold text-dark-gray">
          {firstName} {lastName}
        </p>
      </div>
      <div>
        <FontAwesomeIcon
          icon={faEllipsisVertical}
          className="cursor-pointer rounded-full p-2 text-2xl text-dark-gray hover:bg-[#eeeeee86]"
        />
      </div>
    </div>
  );
}

export default ChatHeader;
