import {
  faArrowLeft,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHome } from "../context/HomeContext";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/apiAuth";
import toast from "react-hot-toast";

function SectionsHeader({ to, sectionName }) {
  const { setCurrentSection } = useHome();
  const navigate = useNavigate();

  async function handleLogout() {
    const res = await logout();
    if (res.success) {
      toast.success(res.message);
      navigate("/login");
    }
  }
  return (
    <div className="flex items-center justify-between border-b border-b-light-gray px-5 py-4">
      <div
        className="flex cursor-pointer items-center gap-3"
        onClick={() => setCurrentSection(to)}
      >
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="rounded-full bg-[#F5F5F4] p-2 text-2xl text-dark-gray"
        />
        <p className="text-xl font-semibold text-dark-gray">{sectionName}</p>
      </div>

      {sectionName === "settings" && (
        <div className="flex cursor-pointer items-center gap-3 rounded-full bg-[#ffeeee] p-3 text-warning">
          <button className="font-semibold" onClick={handleLogout}>
            Logout
          </button>
          <FontAwesomeIcon icon={faRightFromBracket} />
        </div>
      )}
    </div>
  );
}

export default SectionsHeader;
