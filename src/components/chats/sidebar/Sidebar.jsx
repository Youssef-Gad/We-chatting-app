import ChatList from "./ChatList";
import SidebarHeader from "./SidebarHeader";
import SidebarSearch from "./SidebarSearch";

function Sidebar() {
  return (
    <div className="w-[500px] border-r border-light-gray">
      <SidebarHeader />
      <SidebarSearch />
      <ChatList />
    </div>
  );
}

export default Sidebar;
