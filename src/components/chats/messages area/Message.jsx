import { faCheck, faCheckDouble } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../../context/AuthContext";
import { convertTime } from "../../../helpers/helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Message({ message }) {
  const { user } = useAuth();

  return (
    <div
      className={`${user._id === message.sender ? "bg-primary text-white" : "self-start bg-white text-dark-gray"} flex min-w-[5rem] max-w-[35rem] flex-col rounded-lg px-3 py-2 font-medium`}
    >
      {message.content}
      <span className="flex items-center gap-1 self-end text-xs">
        {convertTime(message.sentAt)}
        {user._id === message.sender && <IsDelivered message={message} />}
      </span>
    </div>
  );
}

export default Message;

function IsDelivered({ message }) {
  return (
    <>
      {message.isDelivered ? (
        <FontAwesomeIcon icon={faCheckDouble} className="text-base" />
      ) : (
        <FontAwesomeIcon icon={faCheck} className="text-base" />
      )}
    </>
  );
}
