import { useAuth } from "../../../context/AuthContext";

function Message({ message }) {
  const { user } = useAuth();

  return (
    <div
      className={`${user._id === message.sender ? "bg-primary text-white" : "self-start bg-white text-dark-gray"} flex min-w-[5rem] max-w-[35rem] flex-col rounded-lg px-3 py-2 font-medium`}
    >
      {message.content}
      <span className="self-end text-xs">{message.sentAt}</span>
    </div>
  );
}

export default Message;
