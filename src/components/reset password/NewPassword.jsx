import {
  faCircleInfo,
  faEye,
  faEyeSlash,
  faUnlockKeyhole,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { redirect, useFetcher } from "react-router-dom";
import { resetPassword } from "../../services/apiAuth";
import toast from "react-hot-toast";

function NewPassword() {
  const fetcher = useFetcher();
  const formErrors = fetcher.data;
  const isSubmitting = fetcher.state === "submitting";
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <fetcher.Form
      method="POST"
      action="/newPassword"
      className="flex h-[100vh] items-center justify-center bg-light-gray"
    >
      <div className="login-form space-y-10">
        <p className="mb-10 text-xl font-semibold text-primary">
          Enter New Password
        </p>
        <div className="relative flex flex-col items-start">
          <label className="text-dark-gray">Enter New Password</label>
          <input
            disabled={isSubmitting}
            type={showPassword ? "text" : "password"}
            id="password"
            name="newPassword"
            placeholder="Password"
            className="input-register"
            required
          />
          <FontAwesomeIcon
            icon={faUnlockKeyhole}
            className="absolute left-5 top-[2.4rem] text-lg text-gray"
          />
          {showPassword ? (
            <FontAwesomeIcon
              icon={faEyeSlash}
              className="absolute right-5 top-[2.4rem] cursor-pointer text-xl text-gray"
              onClick={() => setShowPassword((s) => !s)}
            />
          ) : (
            <FontAwesomeIcon
              icon={faEye}
              className="absolute right-5 top-[2.4rem] cursor-pointer text-xl text-gray"
              onClick={() => setShowPassword((s) => !s)}
            />
          )}
          {formErrors?.newPassword && (
            <p className="text-warning">
              <FontAwesomeIcon icon={faCircleInfo} className="text-lg" />{" "}
              {formErrors.newPassword}
            </p>
          )}
        </div>
        <div className="relative flex flex-col items-start">
          <label className="text-dark-gray">Confirm New Password</label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirm-password"
            name="confirmNewPassword"
            placeholder="Confirm Password"
            className="input-register"
            required
            disabled={isSubmitting}
          />
          <FontAwesomeIcon
            icon={faUnlockKeyhole}
            className="absolute left-5 top-[2.4rem] text-lg text-gray"
          />
          {showConfirmPassword ? (
            <FontAwesomeIcon
              icon={faEyeSlash}
              className="absolute right-5 top-[2.4rem] cursor-pointer text-xl text-gray"
              onClick={() => setShowConfirmPassword((s) => !s)}
            />
          ) : (
            <FontAwesomeIcon
              icon={faEye}
              className="absolute right-5 top-[2.4rem] cursor-pointer text-xl text-gray"
              onClick={() => setShowConfirmPassword((s) => !s)}
            />
          )}
          {formErrors?.confirmNewPassword && (
            <p className="text-warning">
              <FontAwesomeIcon icon={faCircleInfo} className="text-lg" />{" "}
              {formErrors.confirmNewPassword}
            </p>
          )}
        </div>
        <button className="mt-10 transform rounded-lg bg-primary px-6 py-2 text-sm font-bold capitalize text-white transition-colors duration-150 hover:bg-dark-primary focus:outline-none">
          Verify New Password
        </button>
      </div>
    </fetcher.Form>
  );
}

export default NewPassword;

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const passwordResetToken = localStorage.getItem("passwordResetToken");
  const res = await resetPassword(data, passwordResetToken);
  const errors = {};

  if (res.errors?.length) {
    res.errors.map((error) => (errors[error.path] = error.msg));
  }
  if (Object.keys(errors).length > 0) return errors;
  if (res.success === true) {
    toast.success(res.message);
    return redirect("/login");
  }
  return null;
}
