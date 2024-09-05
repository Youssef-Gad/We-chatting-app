import { useAuth } from "../../../context/AuthContext";
import { convertTime } from "../../../helpers/helpers";

function Message({ message }) {
  const { user } = useAuth();

  return (
    <div
      className={`${user._id === message.sender ? "bg-primary text-white" : "self-start bg-white text-dark-gray"} flex min-w-[5rem] max-w-[35rem] flex-col rounded-lg px-3 py-2 font-medium`}
    >
      {message.content}
      <span className="self-end text-xs">{convertTime(message.sentAt)}</span>
    </div>
  );
}

export default Message;
