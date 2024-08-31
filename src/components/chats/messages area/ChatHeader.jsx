import {
  faCircleUser,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ChatHeader() {
  return (
    <div className="flex items-center justify-between border-b border-light-gray px-5 py-4">
      <div className="flex items-center gap-3">
        <FontAwesomeIcon
          icon={faCircleUser}
          className="text-5xl text-dark-gray"
        />
        <p className="text-lg font-semibold text-dark-gray">Youssef Gad</p>
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
