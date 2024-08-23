import ChatList from "./ChatList";
import SidebarHeader from "./SidebarHeader";
import SidebarSearch from "./SidebarSearch";

function Sidbar() {
  return (
    <div className="w-[500px] border-r border-light-gray">
      <SidebarHeader />
      <SidebarSearch />
      <ChatList />
    </div>
  );
}

export default Sidbar;
