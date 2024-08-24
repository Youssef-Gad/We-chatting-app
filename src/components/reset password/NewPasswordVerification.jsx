import { redirect, useFetcher } from "react-router-dom";
import ActivationNum from "../register/ActivationNum";
import { useState } from "react";
import EmailVerification from "./EmailVerification";
import { passwordResetVerification } from "../../services/apiAuth";
import toast from "react-hot-toast";

function NewPasswordVerification() {
  const fetcher = useFetcher();
  const [showActivationCode, setShowActivationCode] = useState(false);

  return (
    <div className="h-[100vh] bg-light-gray">
      {!showActivationCode ? (
        <EmailVerification setShowActivationCode={setShowActivationCode} />
      ) : (
        <div className="flex flex-col items-center justify-center py-10">
          <div className="mx-auto max-w-2xl bg-white">
            <div className="flex h-[200px] w-full flex-col items-center justify-center gap-5 bg-primary text-white">
              <div className="flex items-center gap-3">
                <div className="h-[1px] w-10 bg-white"></div>

                <div className="h-[1px] w-10 bg-white"></div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="text-xl font-bold capitalize tracking-wider sm:text-3xl">
                  Check your E-mail Address
                </div>
              </div>
            </div>
            <div className="my-8 px-10">
              <p className="text-gray-600 mt-4 leading-loose">
                This passcode will only be valid for the next
                <span className="font-bold"> 5 minutes</span> Please introduce
                the <span className="font-bold">6 digit</span> code we sent via
                email.
              </p>

              <fetcher.Form
                action="/newPasswordVerifiction"
                method="POST"
                className="mt-4 flex flex-col items-center justify-center gap-x-4"
              >
                <div className="mb-2 flex space-x-2">
                  <ActivationNum name={"num1"} />
                  <ActivationNum name={"num2"} />
                  <ActivationNum name={"num3"} />
                  <ActivationNum name={"num4"} />
                  <ActivationNum name={"num5"} />
                  <ActivationNum name={"num6"} />
                </div>
                <div className="mt-6 flex items-center justify-center gap-3">
                  <button className="transform rounded-lg bg-primary px-6 py-2 text-sm font-bold capitalize text-white transition-colors duration-150 hover:bg-dark-primary focus:outline-none">
                    Verify Code
                  </button>
                </div>
              </fetcher.Form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NewPasswordVerification;

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const passwordResetVerificationToken = localStorage.getItem(
    "passwordResetVerificationToken",
  );
  const verificationCode = `${data.num1}${data.num2}${data.num3}${data.num4}${data.num5}${data.num6}`;
  const res = await passwordResetVerification(
    { verificationCode },
    passwordResetVerificationToken,
  );
  if (res.success === true) {
    localStorage.setItem("passwordResetToken", res.passwordResetToken);
    toast.success(res.message);
    return redirect("/newPassword");
  } else if (res.success === "fail") {
    toast.error(res.message);
  }

  return null;
}
