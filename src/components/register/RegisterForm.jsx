import { faImage, faUnlockKeyhole } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Form, Link, useActionData } from "react-router-dom";
import { isValidEmail } from "../../helpers/helpers";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons/faCircleInfo";
import {
  faEnvelope,
  faEye,
  faEyeSlash,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import { register } from "../../services/apiAuth";

function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const fromErrors = useActionData();

  return (
    <Form method="POST" className="flex flex-col gap-5">
      <div className="flex justify-between">
        {/* Firstname */}
        <div className="relative flex flex-col gap-1">
          <label htmlFor="firstname" className="text-dark-gray">
            First Name
          </label>
          <input
            type="text"
            id="firstname"
            name="firstName"
            placeholder="John"
            className="input-register"
            required
          />
          <FontAwesomeIcon
            icon={faUser}
            className="absolute left-5 top-[2.7rem] text-lg text-gray"
          />
          {fromErrors?.firstname && (
            <p className="text-warning">
              <FontAwesomeIcon icon={faCircleInfo} className="text-lg" />
              {fromErrors.firstname}
            </p>
          )}
        </div>

        {/* Lastname */}
        <div className="relative flex flex-col gap-1">
          <label htmlFor="lastname" className="text-dark-gray">
            Last Name
          </label>
          <input
            type="text"
            id="lastname"
            name="lastName"
            placeholder="Doe"
            className="input-register"
            required
          />
          <FontAwesomeIcon
            icon={faUser}
            className="absolute left-5 top-[2.7rem] text-lg text-gray"
          />
          {fromErrors?.lastname && (
            <p className="text-warning">
              <FontAwesomeIcon icon={faCircleInfo} className="text-lg" />
              {fromErrors.lastname}
            </p>
          )}
        </div>
      </div>

      {/* Email */}
      <div className="relative flex flex-col gap-1">
        <label htmlFor="email" className="text-dark-gray">
          Email Address
        </label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Email@Example.com"
          className="input-register"
          required
        />
        <FontAwesomeIcon
          icon={faEnvelope}
          className="absolute left-5 top-[2.7rem] text-lg text-gray"
        />
        {fromErrors?.email && (
          <p className="text-warning">
            <FontAwesomeIcon icon={faCircleInfo} className="text-lg" />{" "}
            {fromErrors.email}
          </p>
        )}
      </div>

      {/* Password */}
      <div className="relative flex flex-col gap-1">
        <label htmlFor="password" className="text-dark-gray">
          Password
        </label>
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          name="password"
          placeholder="Password"
          className="input-register"
          required
        />
        <FontAwesomeIcon
          icon={faUnlockKeyhole}
          className="absolute left-5 top-[2.7rem] text-lg text-gray"
        />
        {showPassword ? (
          <FontAwesomeIcon
            icon={faEyeSlash}
            className="absolute right-5 top-[2.6rem] cursor-pointer text-xl text-gray"
            onClick={() => setShowPassword((s) => !s)}
          />
        ) : (
          <FontAwesomeIcon
            icon={faEye}
            className="absolute right-5 top-[2.6rem] cursor-pointer text-xl text-gray"
            onClick={() => setShowPassword((s) => !s)}
          />
        )}
        {fromErrors?.password && (
          <p className="text-warning">
            <FontAwesomeIcon icon={faCircleInfo} className="text-lg" />{" "}
            {fromErrors.password}
          </p>
        )}
      </div>

      {/* Confirm Password */}
      <div className="relative flex flex-col gap-1">
        <label htmlFor="confirm-password" className="text-dark-gray">
          Confirm Password
        </label>
        <input
          type={showConfirmPassword ? "text" : "password"}
          id="confirm-password"
          name="confirmPassword"
          placeholder="Confirm Password"
          className="input-register"
          required
        />
        <FontAwesomeIcon
          icon={faUnlockKeyhole}
          className="absolute left-5 top-[2.7rem] text-lg text-gray"
        />
        {showConfirmPassword ? (
          <FontAwesomeIcon
            icon={faEyeSlash}
            className="absolute right-5 top-[2.6rem] cursor-pointer text-xl text-gray"
            onClick={() => setShowConfirmPassword((s) => !s)}
          />
        ) : (
          <FontAwesomeIcon
            icon={faEye}
            className="absolute right-5 top-[2.6rem] cursor-pointer text-xl text-gray"
            onClick={() => setShowConfirmPassword((s) => !s)}
          />
        )}
        {fromErrors?.confirmPassword && (
          <p className="text-warning">
            <FontAwesomeIcon icon={faCircleInfo} className="text-lg" />{" "}
            {fromErrors.confirmPassword}
          </p>
        )}
      </div>

      {/* Photo */}
      <div className="relative flex flex-col gap-1">
        <label htmlFor="photo" className="text-dark-gray">
          Your Photo
        </label>
        <input
          type="file"
          id="photo"
          name="photo"
          required
          className="file-input"
        />
        {fromErrors?.photo && (
          <p className="text-warning">
            <FontAwesomeIcon icon={faCircleInfo} className="text-lg" />{" "}
            {fromErrors.photo}
          </p>
        )}
      </div>

      <button className="my-5 rounded-md bg-primary py-3 font-semibold text-white transition-colors duration-150 hover:bg-dark-primary">
        Sign Up
      </button>

      <p className="text-center text-dark-gray">
        Already a Member ?{" "}
        <Link to="/login" className="font-semibold text-primary">
          Login
        </Link>
      </p>
    </Form>
  );
}

export default RegisterForm;

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  // Form Validations
  const errors = {};
  if (!isValidEmail(data.email))
    errors.email = "Please provide a correct email";
  if (data.firstName.length < 3) errors.firstname = "At least 3 characters";
  if (data.lastName.length < 3) errors.lastname = "At least 3 characters";
  if (data.password.length < 8) errors.password = "At least 8 characters";
  if (data.password !== data.confirmPassword)
    errors.confirmPassword = "Password doesn't match";
  if (Object.keys(errors).length > 0) return errors;

  const res = await register(formData);
  return res;
}
