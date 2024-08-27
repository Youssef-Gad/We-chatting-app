import { useAuth } from "../../context/AuthContext";
import Loader from "../../ui/Loader";
import Sidebar from "./sidebar/Sidebar";
import { useHome } from "../../context/HomeContext";
import Settings from "../settings/Settings";
import EmptyChat from "./chat area/EmptyChat";

function Home() {
  const { isLoading } = useAuth();
  const { currentSection } = useHome();

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
        <EmptyChat />
      </div>
    );
}

export default Home;
