import { useAuth } from "../../context/AuthContext";
import Loader from "../../ui/Loader";
import Sidebar from "./sidebar/Sidebar";
import { useHome } from "../../context/HomeContext";
import Settings from "../settings/Settings";
import EmptyChat from "./messages area/EmptyChat";
import Chat from "./messages area/Chat";

function Home() {
  const { isLoading } = useAuth();
  const { currentSection, activeChat } = useHome();

  if (isLoading) return <Loader />;
  else
    return (
      <div className="flex h-[100vh]">
        {currentSection === "home" ? (
          <Sidebar />
        ) : currentSection === "settings" ? (
          <Settings />
        ) : (
          <div></div>
        )}
        {!activeChat ? <EmptyChat /> : <Chat />}
      </div>
    );
}

export default Home;
