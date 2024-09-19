import { useChat } from "../../../context/ChatContext";
import ChatList from "./ChatList";
import SidebarHeader from "./SidebarHeader";
import SidebarSearch from "./SidebarSearch";

function Sidebar() {
  const { activeChatId } = useChat();
  return (
    <div
      className={`${activeChatId === null ? "flex" : "hidden md:flex"} min-w-full flex-col border-r border-light-gray md:min-w-[500px]`}
    >
      <SidebarHeader />
      <SidebarSearch />
      <ChatList />
    </div>
  );
}

export default Sidebar;
