import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import SidebarMenu from "./SidebarMenu";
import useOutsideClick from "../../../hooks/useOutsideClick";
import { useAuth } from "../../../context/AuthContext";

function SidebarHeader() {
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const [isOpen, setIsOpen] = useOutsideClick(menuRef, buttonRef);
  const { user } = useAuth();

  return (
    <div className="relative flex items-center justify-between border-b border-light-gray px-5 py-4">
      <p className="text-3xl font-semibold uppercase text-primary">wechat</p>
      <div className="flex items-center gap-3">
        <img
          src={user.photo}
          alt="userPhoto"
          className="h-11 w-11 rounded-full"
        />
        <FontAwesomeIcon
          ref={buttonRef}
          onClick={() => setIsOpen((m) => !m)}
          icon={faBars}
          className="cursor-pointer rounded-full bg-stone-100 p-4 text-dark-gray"
        />
      </div>
      {isOpen && <SidebarMenu menuRef={menuRef} />}
    </div>
  );
}

export default SidebarHeader;
