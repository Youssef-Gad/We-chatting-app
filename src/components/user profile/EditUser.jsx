import SectionsHeader from "../../ui/SectionsHeader";
import EditUserForm from "./EditUserForm";

function EditUser() {
  return (
    <div className="h-[100vh] w-[500px] border-r border-light-gray">
      <SectionsHeader sectionName="Edit Profile" to="settings" />
      <EditUserForm />
    </div>
  );
}

export default EditUser;
