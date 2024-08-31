import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHome } from "../../../context/HomeContext";

function ChatList() {
  const { setActiveChat } = useHome();

  return (
    <div className="h-[70vh] overflow-y-scroll">
      <div
        className="flex cursor-pointer justify-between rounded-md p-5 hover:bg-[#eeeeee86]"
        onClick={() => setActiveChat(true)}
      >
        <div className="flex gap-6">
          <FontAwesomeIcon
            icon={faCircleUser}
            className="text-5xl text-dark-gray"
          />
          <div className="flex flex-col gap-1">
            <p className="text-xl font-semibold text-dark-gray">Youssef Gad</p>
            <p className="text-gray">Last Message</p>
          </div>
        </div>
        <p className="font-semibold text-primary">Just now</p>
      </div>

      <div className="flex cursor-pointer justify-between rounded-md p-5 hover:bg-[#eeeeee86]">
        <div className="flex gap-6">
          <FontAwesomeIcon
            icon={faCircleUser}
            className="text-5xl text-dark-gray"
          />
          <div className="flex flex-col gap-1">
            <p className="text-xl font-semibold text-dark-gray">Youssef Gad</p>
            <p className="text-gray">Last Message</p>
          </div>
        </div>
        <p className="font-semibold text-primary">Just now</p>
      </div>
      <div className="flex cursor-pointer justify-between rounded-md p-5 hover:bg-[#eeeeee86]">
        <div className="flex gap-6">
          <FontAwesomeIcon
            icon={faCircleUser}
            className="text-5xl text-dark-gray"
          />
          <div className="flex flex-col gap-1">
            <p className="text-xl font-semibold text-dark-gray">Youssef Gad</p>
            <p className="text-gray">Last Message</p>
          </div>
        </div>
        <p className="font-semibold text-primary">Just now</p>
      </div>
      <div className="flex cursor-pointer justify-between rounded-md p-5 hover:bg-[#eeeeee86]">
        <div className="flex gap-6">
          <FontAwesomeIcon
            icon={faCircleUser}
            className="text-5xl text-dark-gray"
          />
          <div className="flex flex-col gap-1">
            <p className="text-xl font-semibold text-dark-gray">Youssef Gad</p>
            <p className="text-gray">Last Message</p>
          </div>
        </div>
        <p className="font-semibold text-primary">Just now</p>
      </div>
      <div className="flex cursor-pointer justify-between rounded-md p-5 hover:bg-[#eeeeee86]">
        <div className="flex gap-6">
          <FontAwesomeIcon
            icon={faCircleUser}
            className="text-5xl text-dark-gray"
          />
          <div className="flex flex-col gap-1">
            <p className="text-xl font-semibold text-dark-gray">Youssef Gad</p>
            <p className="text-gray">Last Message</p>
          </div>
        </div>
        <p className="font-semibold text-primary">Just now</p>
      </div>
      <div className="flex cursor-pointer justify-between rounded-md p-5 hover:bg-[#eeeeee86]">
        <div className="flex gap-6">
          <FontAwesomeIcon
            icon={faCircleUser}
            className="text-5xl text-dark-gray"
          />
          <div className="flex flex-col gap-1">
            <p className="text-xl font-semibold text-dark-gray">Youssef Gad</p>
            <p className="text-gray">Last Message</p>
          </div>
        </div>
        <p className="font-semibold text-primary">Just now</p>
      </div>
      <div className="flex cursor-pointer justify-between rounded-md p-5 hover:bg-[#eeeeee86]">
        <div className="flex gap-6">
          <FontAwesomeIcon
            icon={faCircleUser}
            className="text-5xl text-dark-gray"
          />
          <div className="flex flex-col gap-1">
            <p className="text-xl font-semibold text-dark-gray">Youssef Gad</p>
            <p className="text-gray">Last Message</p>
          </div>
        </div>
        <p className="font-semibold text-primary">Just now</p>
      </div>
      <div className="flex cursor-pointer justify-between rounded-md p-5 hover:bg-[#eeeeee86]">
        <div className="flex gap-6">
          <FontAwesomeIcon
            icon={faCircleUser}
            className="text-5xl text-dark-gray"
          />
          <div className="flex flex-col gap-1">
            <p className="text-xl font-semibold text-dark-gray">Youssef Gad</p>
            <p className="text-gray">Last Message</p>
          </div>
        </div>
        <p className="font-semibold text-primary">Just now</p>
      </div>
    </div>
  );
}

export default ChatList;
