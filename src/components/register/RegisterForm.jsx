import { faUnlockKeyhole } from "@fortawesome/free-solid-svg-icons";
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

function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const fromErrors = useActionData();

  return (
    <Form method="POST" className="flex flex-col gap-5">
      <div className="flex justify-between">
        {/* Firstname */}
        <div className="flex flex-col gap-1 relative">
          <label htmlFor="firstname" className="text-dark-gray">
            First Name
          </label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            placeholder="John"
            className="input-register"
            required
          />
          <FontAwesomeIcon
            icon={faUser}
            className="text-gray absolute top-[2.7rem] left-5 text-lg"
          />
          {fromErrors?.firstname && (
            <p className="text-warning">
              <FontAwesomeIcon icon={faCircleInfo} className="text-lg" />
              {fromErrors.firstname}
            </p>
          )}
        </div>

        {/* Lastname */}
        <div className="flex flex-col gap-1 relative">
          <label htmlFor="lastname" className="text-dark-gray">
            Last Name
          </label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            placeholder="Doe"
            className="input-register"
            required
          />
          <FontAwesomeIcon
            icon={faUser}
            className="text-gray absolute top-[2.7rem] left-5 text-lg"
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
      <div className="flex flex-col gap-1 relative">
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
          className="text-gray absolute top-[2.7rem] left-5 text-lg"
        />
        {fromErrors?.email && (
          <p className="text-warning">
            <FontAwesomeIcon icon={faCircleInfo} className="text-lg" />{" "}
            {fromErrors.email}
          </p>
        )}
      </div>

      {/* Password */}
      <div className="flex flex-col gap-1 relative">
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
          className="text-gray absolute top-[2.7rem] left-5 text-lg"
        />
        {showPassword ? (
          <FontAwesomeIcon
            icon={faEyeSlash}
            className="absolute right-5 top-[2.6rem] text-xl text-gray cursor-pointer"
            onClick={() => setShowPassword((s) => !s)}
          />
        ) : (
          <FontAwesomeIcon
            icon={faEye}
            className="absolute right-5 top-[2.6rem] text-xl text-gray cursor-pointer"
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
      <div className="flex flex-col gap-1 relative">
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
          className="text-gray absolute top-[2.7rem] left-5 text-lg"
        />
        {showConfirmPassword ? (
          <FontAwesomeIcon
            icon={faEyeSlash}
            className="absolute right-5 top-[2.6rem] text-xl text-gray cursor-pointer"
            onClick={() => setShowConfirmPassword((s) => !s)}
          />
        ) : (
          <FontAwesomeIcon
            icon={faEye}
            className="absolute right-5 top-[2.6rem] text-xl text-gray cursor-pointer"
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

      <button className="font-semibold bg-primary text-white py-3 rounded-md my-5 hover:bg-dark-primary transition-colors duration-150">
        Sign Up
      </button>

      <p className="text-center text-dark-gray">
        Already a Member ?{" "}
        <Link to="/login" className="text-primary font-semibold">
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
  if (data.firstname.length < 3) errors.firstname = "At least 3 characters";
  if (data.lastname.length < 3) errors.lastname = "At least 3 characters";
  if (data.password.length < 8) errors.password = "At least 8 characters";
  if (data.password !== data.confirmPassword)
    errors.confirmPassword = "Password doesn't match";
  if (Object.keys(errors).length > 0) return errors;

  console.log(data);

  return null;
}
