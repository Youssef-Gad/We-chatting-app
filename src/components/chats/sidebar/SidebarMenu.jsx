import { faGear, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function SidebarMenu({ menuRef }) {
  return (
    <ul
      ref={menuRef}
      className="absolute right-10 top-16 z-10 flex w-[180px] flex-col gap-3 rounded-md bg-white p-3 font-semibold text-dark-gray shadow-lg"
    >
      <li className="flex items-center gap-3">
        <FontAwesomeIcon icon={faGear} />
        <p>Settings</p>
      </li>
      <li className="flex items-center gap-3 text-warning">
        <FontAwesomeIcon icon={faRightFromBracket} />
        <Link to="/login">Logout</Link>
      </li>
    </ul>
  );
}

export default SidebarMenu;
