import { useAuth } from "../../../context/AuthContext";
import { convertTime } from "../../../helpers/helpers";
import MessageStatus from "./MessageStatus";

function Message({ message }) {
  const { user } = useAuth();

  return (
    <div
      className={`${user._id === message.sender ? "bg-[#005C4B] text-white" : "self-start bg-white text-dark-gray"} flex min-w-[5rem] max-w-[35rem] flex-col rounded-lg px-3 py-2 font-medium`}
    >
      {message.content}
      <span className="flex items-center gap-1 self-end text-xs">
        {convertTime(message.sentAt)}
        {user._id === message.sender && (
          <MessageStatus
            isDelivered={message.isDelivered}
            isSeen={message.isSeen}
          />
        )}
      </span>
    </div>
  );
}

export default Message;
