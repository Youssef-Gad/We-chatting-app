import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { forgetpassword } from "../../services/apiAuth";
import toast from "react-hot-toast";

function EmailVerification({ setShowActivationCode }) {
  const [email, setEmail] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (email) {
      const res = await forgetpassword({ email });
      if (res.success === true) {
        localStorage.setItem(
          "passwordResetVerificationToken",
          res.passwordResetVerificationToken,
        );
        toast.success(res.message);
        setShowActivationCode(true);
      } else if (res.success === "fail") {
        toast.error(res.message);
      }
    }
  }

  return (
    <div className="flex h-[100vh] items-center justify-center">
      <form onSubmit={handleSubmit} className="login-form">
        <p className="mb-10 text-xl font-semibold text-primary">
          Reset Password
        </p>
        <div className="relative flex flex-col items-start">
          <label className="text-dark-gray">Enter Your Email</label>
          <input
            type="text"
            className="input-register"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email@Example.com"
          />
          <FontAwesomeIcon
            icon={faEnvelope}
            className="absolute left-5 top-[2.5rem] text-lg text-gray"
          />
        </div>
        <button className="mt-10 transform rounded-lg bg-primary px-6 py-2 text-sm font-bold capitalize text-white transition-colors duration-150 hover:bg-dark-primary focus:outline-none">
          Verify email
        </button>
      </form>
    </div>
  );
}

export default EmailVerification;
