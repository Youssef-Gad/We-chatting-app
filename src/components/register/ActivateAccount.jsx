import { redirect, useFetcher } from "react-router-dom";
import { activateEmail, resendActivationCode } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import ActivationInputs from "../../ui/ActivationInputs";

function ActivateAccount() {
  const fethcer = useFetcher();
  const activationToken = localStorage.getItem("activationToken");
  const [seconds, setSeconds] = useState(59);

  async function handleResendActivationCode() {
    const res = await resendActivationCode(activationToken);

    if (res.success === true) {
      toast.success(res.message);
      setSeconds(59);
    } else if (res.success === "fail") toast.error(res.message);
  }

  useEffect(() => {
    if (seconds > 0) {
      const timerId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      return () => clearInterval(timerId);
    }
  }, [seconds]);

  return (
    <div className="h-[110vh] bg-light-gray sm:h-[100vh]">
      <div className="flex flex-col items-center justify-center py-10">
        <div className="mx-auto max-w-[22rem] bg-white sm:max-w-2xl">
          <div className="flex h-[200px] w-full flex-col items-center justify-center gap-5 bg-primary text-white">
            <div className="flex items-center gap-3">
              <div className="h-[1px] w-10 bg-white"></div>

              <div className="h-[1px] w-10 bg-white"></div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-center text-sm font-normal tracking-widest sm:text-xl">
                THANKS FOR SIGNING UP!
              </div>
              <div className="text-lg font-bold capitalize tracking-wider sm:text-3xl">
                Check your E-mail Address
              </div>
            </div>
          </div>
          <div className="my-8 px-6 sm:px-10">
            <p className="text-gray-600 mt-4 leading-loose">
              This passcode will only be valid for the next
              <span className="font-bold"> 5 minutes</span> Please introduce the{" "}
              <span className="font-bold">6 digit</span> code we sent via email.
            </p>

            <fethcer.Form
              action="/activateAccount"
              method="POST"
              className="mt-4 flex flex-col items-center justify-center gap-x-4"
            >
              <div className="mb-2 flex space-x-2">
                <ActivationInputs />
              </div>
              <div className="mt-6 flex items-center justify-center gap-3">
                <button className="rounded-lg bg-primary px-2 py-3 text-xs font-bold capitalize text-white transition-colors duration-150 hover:bg-dark-primary focus:outline-none sm:px-6 sm:py-2 sm:text-sm">
                  Verify Code
                </button>
                <button
                  disabled={seconds > 0}
                  onClick={handleResendActivationCode}
                  className="rounded-lg border-2 border-primary px-2 py-3 text-xs font-bold capitalize transition-colors duration-150 hover:bg-dark-primary hover:text-white focus:outline-none disabled:border-none disabled:bg-warning disabled:text-white sm:px-6 sm:py-2 sm:text-sm"
                >
                  Resend Activation Code
                </button>
                <div className="w-[2rem] font-semibold">
                  {seconds < 10 ? `0${seconds}` : seconds}:00
                </div>
              </div>
            </fethcer.Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActivateAccount;

export async function action({ request }) {
  const formData = await request.formData();
  const nums = Object.fromEntries(formData);
  const activationCode = `${nums.num1}${nums.num2}${nums.num3}${nums.num4}${nums.num5}${nums.num6}`;
  const token = localStorage.getItem("activationToken");

  if (activationCode.length) {
    const res = await activateEmail({ activationCode }, token);

    if (res.success === "fail") {
      toast.error(res.message);
    } else if (res.success === true) {
      toast.success(res.message);
      return redirect("/login");
    }
  }
  return null;
}
