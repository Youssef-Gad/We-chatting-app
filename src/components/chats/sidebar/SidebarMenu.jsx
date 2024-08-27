import { faGear, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { logout } from "../../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useHome } from "../../../context/HomeContext";

function SidebarMenu({ menuRef }) {
  const navigate = useNavigate();
  const { setCurrentSection } = useHome();

  async function handleLogout() {
    const res = await logout();
    if (res.success) {
      toast.success(res.message);
      navigate("/login");
    }
  }

  return (
    <ul
      ref={menuRef}
      className="absolute right-10 top-16 z-10 flex w-[180px] flex-col gap-3 rounded-md bg-white p-3 font-semibold text-dark-gray shadow-lg"
    >
      <li className="flex items-center gap-3">
        <FontAwesomeIcon icon={faGear} />
        <button onClick={() => setCurrentSection("settings")}>Settings</button>
      </li>
      <li className="flex items-center gap-3 text-warning">
        <FontAwesomeIcon icon={faRightFromBracket} />
        <button onClick={handleLogout}>Logout</button>
      </li>
    </ul>
  );
}

export default SidebarMenu;
