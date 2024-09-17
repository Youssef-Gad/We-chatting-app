import {
  faEnvelope,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-regular-svg-icons";
import { faUnlockKeyhole } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import { Link, redirect, useFetcher } from "react-router-dom";
import { login } from "../../services/apiAuth";
import toast from "react-hot-toast";

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";
  const formRef = useRef(null);

  return (
    <fetcher.Form
      ref={formRef}
      action="/login"
      method="POST"
      className="login-form"
    >
      <p className="mb-2 text-3xl font-semibold sm:text-4xl">Hi ,welcome</p>
      <p className="mb-10">Enter your E-mail and Passward</p>

      <div className="flex flex-col gap-5">
        {/* Email */}
        <div className="relative flex flex-col items-start gap-1">
          <label htmlFor="email" className="text-dark-gray">
            Email
          </label>
          <input
            disabled={isSubmitting}
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
        </div>

        {/* Password */}
        <div className="relative flex flex-col items-start gap-1">
          <label htmlFor="password" className="text-dark-gray">
            Password
          </label>
          <input
            disabled={isSubmitting}
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
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-5">
        <Link
          to="/newPasswordVerifiction"
          className="font-semibold text-primary"
        >
          Forget Your Passward
        </Link>

        <button
          disabled={isSubmitting}
          className="rounded-md bg-primary py-3 font-semibold text-white transition-colors duration-150 hover:bg-dark-primary"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-dark-gray">
          Not registerd yet?{" "}
          <Link to="/register" className="font-semibold text-primary">
            Create An Account
          </Link>
        </p>
      </div>
    </fetcher.Form>
  );
}

export default LoginForm;

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const res = await login(data);

  if (res.success === "fail") {
    toast.error(res.message);
  } else if (res.errors?.length > 0) {
    toast.error("Wrong Email");
  } else if (res.success === true) {
    if (res.activationToken !== undefined) {
      localStorage.setItem("activationToken", res.activationToken);
      toast.error("Please Activate Your Email");
      return redirect("/activateAccount");
    } else {
      toast.success("Successfully Logged In");
      localStorage.setItem("token", res.token);
      return redirect("/");
    }
  }
  return null;
}
