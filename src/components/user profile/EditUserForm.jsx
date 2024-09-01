import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";
import { updateUser } from "../../services/apiUser";
import toast from "react-hot-toast";

function EditUserForm() {
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhoto, setNewPhoto] = useState("");
  const { user, setUser } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const userData = {
        firstName: newFirstName,
        lastName: newLastName,
        email: newEmail,
        photo: newPhoto,
      };

      const filterdUserData = Object.fromEntries(
        Object.entries(userData).filter(([key, value]) => {
          if (typeof value === "object") return true;
          else if (value.length === 0) return false;
          else return true;
        }),
      );

      if (Object.entries(filterdUserData).length) {
        const res = await updateUser(filterdUserData);
        console.log(res);
        console.log(filterdUserData);

        if (res.success === true) {
          toast.success("Data Updated Successfully");
          setUser(res.getUserObj);
        } else if (res.success === "error") toast.error(res.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <div className="max-h-[86vh] overflow-y-scroll">
      <img
        src={user.photo}
        alt="user"
        className="m-auto mt-5 w-28 rounded-full"
      />

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-5">
        <div className="flex gap-5">
          {/* Firstname */}
          <div className="relative flex flex-col gap-1">
            <label htmlFor="firstname" className="text-dark-gray">
              First Name
            </label>
            <input
              type="text"
              id="firstname"
              value={newFirstName}
              minLength="3"
              onChange={(e) => setNewFirstName(e.target.value)}
              placeholder="John"
              className="input-register"
              disabled={isSubmitting}
            />
            <FontAwesomeIcon
              icon={faUser}
              className="absolute left-5 top-[2.7rem] text-lg text-gray"
            />
          </div>
          {/* lastname */}
          <div className="relative flex flex-col gap-1">
            <label htmlFor="lastname" className="text-dark-gray">
              Last Name
            </label>
            <input
              type="text"
              id="lastname"
              value={newLastName}
              minLength="3"
              onChange={(e) => setNewLastName(e.target.value)}
              placeholder="Doe"
              className="input-register"
              disabled={isSubmitting}
            />
            <FontAwesomeIcon
              icon={faUser}
              className="absolute left-5 top-[2.7rem] text-lg text-gray"
            />
          </div>
        </div>

        {/* Email */}
        <div className="relative flex flex-col gap-1">
          <label htmlFor="email" className="text-dark-gray">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="Email@Example.com"
            className="input-register"
            disabled={isSubmitting}
          />
          <FontAwesomeIcon
            icon={faEnvelope}
            className="absolute left-5 top-[2.7rem] text-lg text-gray"
          />
        </div>

        {/* Photo */}
        <div className="relative flex flex-col gap-1">
          <label htmlFor="photo" className="text-dark-gray">
            Upload New Photo
          </label>
          <input
            onChange={(e) => setNewPhoto(e.target.files[0])}
            type="file"
            id="photo"
            name="photo"
            className="file-input"
            style={{ width: "100%" }}
            disabled={isSubmitting}
          />
        </div>
        <button className="my-5 rounded-md bg-primary py-3 font-semibold text-white transition-colors duration-150 hover:bg-dark-primary">
          {isSubmitting ? "Saving Changes..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}

export default EditUserForm;
