import {
  faChevronRight,
  faKey,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../../ui/DeleteModal";
import { useState } from "react";

function SettingsList() {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {openModal && <DeleteModal setOpenModal={setOpenModal} />}
      <ul className="flex flex-col p-5">
        <li
          className="flex cursor-pointer items-center justify-between rounded-lg p-3 hover:bg-[#eeeeee86]"
          onClick={() => navigate("/newPasswordVerifiction")}
        >
          <div className="flex items-center gap-5">
            <FontAwesomeIcon
              icon={faKey}
              className="rounded-full bg-[#dff6eb] p-2 text-xl text-primary"
            />
            <p className="font-semibold text-dark-gray">Change Password</p>
          </div>
          <FontAwesomeIcon icon={faChevronRight} className="text-gray" />
        </li>
        <li
          className="flex cursor-pointer items-center justify-between rounded-lg p-3 hover:bg-[#eeeeee86]"
          onClick={() => setOpenModal(true)}
        >
          <div className="flex items-center gap-5">
            <FontAwesomeIcon
              icon={faTriangleExclamation}
              className="rounded-full bg-[#ec64643d] p-2 text-xl text-warning"
            />
            <p className="font-semibold text-dark-gray">Delete Account</p>
          </div>
          <FontAwesomeIcon icon={faChevronRight} className="text-gray" />
        </li>
      </ul>
    </>
  );
}

export default SettingsList;
