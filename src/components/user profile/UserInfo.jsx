import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHome } from "../../context/HomeContext";

function UserInfo() {
  const { user } = useAuth();
  const { setCurrentSection } = useHome();

  return (
    <div className="flex items-center justify-between border-b border-light-gray p-5">
      <div className="flex items-center gap-5">
        <img src={user.photo} alt="user" className="m:w-24 w-16 rounded-full" />
        <div className="flex flex-col">
          <p className="text-lg font-semibold text-dark-gray sm:text-2xl">
            {user.firstName} {user.lastName}
          </p>
          <p className="text-xs text-gray sm:text-base">{user.email}</p>
        </div>
      </div>
      <FontAwesomeIcon
        onClick={() => setCurrentSection("editUser")}
        icon={faPenToSquare}
        className="cursor-pointer rounded-full bg-[#F5F5F4] p-3 text-xl text-dark-gray"
      />
    </div>
  );
}

export default UserInfo;
