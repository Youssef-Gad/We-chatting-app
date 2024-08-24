import { faUnlockKeyhole } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons/faCircleInfo";
import {
  faEnvelope,
  faEye,
  faEyeSlash,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import { register } from "../../services/apiAuth";
import toast from "react-hot-toast";

function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [photo, setPhoto] = useState("");
  const photoRef = useRef(null);

  const formRef = useRef(null);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("photo", photo);
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("confirmPassword", confirmPassword);

      // Form Validations
      const res = await register(formData);

      if (!res.success) {
        const errors = {};
        if (res.errors?.length > 0) {
          res.errors?.map((error) => (errors[error.path] = error.msg));
          setFormErrors(errors);
        }
      }

      if (res.success) {
        toast.success("Check your email for activation code");
        localStorage.setItem("activationToken", res.activationToken);
        navigate("/activateAccount");
      } else {
        toast.error("Failed to register. Please try again.");
        formRef.current.reset();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} ref={formRef} className="flex flex-col gap-5">
      <div className="flex justify-between gap-3">
        {/* Firstname */}
        <div className="relative flex flex-col gap-1">
          <label htmlFor="firstname" className="text-dark-gray">
            First Name
          </label>
          <input
            type="text"
            id="firstname"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="John"
            className="input-register"
            style={{
              outline: `${formErrors.firstName ? "1px solid #E75F5F" : ""}`,
            }}
            required
            disabled={isSubmitting}
          />
          <FontAwesomeIcon
            icon={faUser}
            className="absolute left-5 top-[2.7rem] text-lg text-gray"
          />
          {formErrors.firstName && (
            <p className="text-warning">
              <FontAwesomeIcon icon={faCircleInfo} className="text-lg" />
              {formErrors.firstName}
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
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Doe"
            className="input-register"
            style={{
              outline: `${formErrors?.lastName ? "1px solid #E75F5F" : ""}`,
            }}
            required
            disabled={isSubmitting}
          />
          <FontAwesomeIcon
            icon={faUser}
            className="absolute left-5 top-[2.7rem] text-lg text-gray"
          />
          {formErrors?.lastName && (
            <p className="text-warning">
              <FontAwesomeIcon icon={faCircleInfo} className="text-lg" />
              {formErrors.lastName}
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email@Example.com"
          className="input-register"
          style={{
            outline: `${formErrors?.email ? "1px solid #E75F5F" : ""}`,
          }}
          required
          disabled={isSubmitting}
        />
        <FontAwesomeIcon
          icon={faEnvelope}
          className="absolute left-5 top-[2.7rem] text-lg text-gray"
        />
        {formErrors?.email && (
          <p className="text-warning">
            <FontAwesomeIcon icon={faCircleInfo} className="text-lg" />{" "}
            {formErrors.email}
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="input-register"
          style={{
            outline: `${formErrors?.password ? "1px solid #E75F5F" : ""}`,
          }}
          required
          disabled={isSubmitting}
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
        {formErrors?.password && (
          <p className="text-warning">
            <FontAwesomeIcon icon={faCircleInfo} className="text-lg" />{" "}
            {formErrors.password}
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
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          className="input-register"
          style={{
            outline: `${formErrors?.confirmPassword ? "1px solid #E75F5F" : ""}`,
          }}
          required
          disabled={isSubmitting}
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
        {formErrors?.confirmPassword && (
          <p className="text-warning">
            <FontAwesomeIcon icon={faCircleInfo} className="text-lg" />{" "}
            {formErrors.confirmPassword}
          </p>
        )}
      </div>

      {/* Photo */}
      <div className="relative flex flex-col gap-1">
        <label htmlFor="photo" className="text-dark-gray">
          Your Photo
        </label>
        <input
          onChange={(e) => setPhoto(e.target.files[0])}
          ref={photoRef}
          type="file"
          id="photo"
          name="photo"
          required
          className="file-input"
        />
      </div>

      <button className="my-5 rounded-md bg-primary py-3 font-semibold text-white transition-colors duration-150 hover:bg-dark-primary">
        {isSubmitting ? "Signning Up..." : "Sign Up"}
      </button>

      <p className="text-center text-dark-gray">
        Already a Member ?{" "}
        <Link to="/login" className="font-semibold text-primary">
          Login
        </Link>
      </p>
    </form>
  );
}

export default RegisterForm;
