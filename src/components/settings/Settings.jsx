import SettingsList from "./SettingsList";
import UserInfo from "../user profile/UserInfo";
import SectionsHeader from "../../ui/SectionsHeader";

function Settings() {
  return (
    <div className="h-[100vh] w-[500px] border-r border-light-gray">
      <SectionsHeader to="home" sectionName="settings" />
      <UserInfo />
      <SettingsList />
    </div>
  );
}

export default Settings;
