import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import { deleteUser } from "../services/apiUser";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function DeleteModal({ setOpenModal }) {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  function handleClickOutSide(e) {
    if (!containerRef.current.contains(e.target)) setOpenModal(false);
  }

  async function handleDeleteAccount() {
    const res = await deleteUser();
    if (res.success === true) {
      toast.success("Your Account Deleted Successfully");
      navigate("/login");
    }
  }

  return (
    <div
      className="fixed top-0 z-20 flex h-full w-full items-center justify-center bg-[#00000089]"
      onClick={handleClickOutSide}
    >
      <div
        className="flex flex-col gap-5 rounded-lg bg-white p-10 text-dark-gray"
        ref={containerRef}
      >
        <FontAwesomeIcon
          icon={faCircleExclamation}
          className="text-4xl text-warning"
        />
        <h3 className="mb-5 text-lg font-semibold text-dark-gray">
          Are You Sure You Want To Delete Your Account?
        </h3>
        <div className="flex justify-center gap-4">
          <button
            className="rounded-lg bg-warning p-3 text-lg font-semibold text-white"
            onClick={handleDeleteAccount}
          >
            Yes, I'm sure
          </button>
          <button
            className="rounded-lg bg-primary p-3 text-lg font-semibold text-white"
            onClick={() => setOpenModal(false)}
          >
            No, cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
