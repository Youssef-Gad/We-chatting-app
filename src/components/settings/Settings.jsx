import SettingsHeader from "./SettingsHeader";
import SettingsList from "./SettingsList";
import UserInfo from "./UserInfo";

function Settings() {
  return (
    <div className="h-[100vh] w-[500px] border-r border-light-gray">
      <SettingsHeader />
      <UserInfo />
      <SettingsList />
    </div>
  );
}

export default Settings;
