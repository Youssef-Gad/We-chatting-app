import { useAuth } from "../../context/AuthContext";
import Loader from "../../ui/Loader";
import Sidebar from "./sidebar/Sidebar";
import { useHome } from "../../context/HomeContext";
import Settings from "../settings/Settings";
import EmptyChat from "./messages area/EmptyChat";
import EditUser from "../user profile/EditUser";
import ChatArea from "./messages area/ChatArea";

function Home() {
  const { isLoading } = useAuth();
  const { currentSection, openChat } = useHome();

  if (isLoading) return <Loader />;
  else
    return (
      <div className="flex h-[100vh] overflow-hidden">
        {currentSection === "home" ? (
          <Sidebar />
        ) : currentSection === "settings" ? (
          <Settings />
        ) : currentSection === "editUser" ? (
          <EditUser />
        ) : (
          <div></div>
        )}
        {openChat.length === 0 ? <EmptyChat /> : <ChatArea />}
      </div>
    );
}

export default Home;
