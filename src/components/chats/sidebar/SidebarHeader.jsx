import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import SidebarMenu from "./SidebarMenu";
import useOutsideClick from "../../../hooks/useOutsideClick";
import { getRandomColor } from "../../../helpers/helpers";

function SidebarHeader() {
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const [isOpen, setIsOpen] = useOutsideClick(menuRef, buttonRef);
  const [color] = useState(getRandomColor());

  return (
    <div className="relative flex items-center justify-between border-b border-light-gray px-5 py-4">
      <p className="text-3xl font-semibold uppercase text-primary">wechat</p>
      <div className="flex items-center gap-3">
        <FontAwesomeIcon
          icon={faCircleUser}
          className="text-5xl text-dark-gray"
        />
        <p
          style={{ backgroundColor: color }}
          className="flex h-12 w-12 items-center justify-center rounded-full text-2xl font-semibold text-white"
        >
          YG
        </p>
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
