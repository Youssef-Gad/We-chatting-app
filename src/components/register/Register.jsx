import RegisterForm from "./RegisterForm";

function Register() {
  return (
    <div className="flex h-[150vh] items-center justify-center bg-light-gray sm:h-[190vh]">
      <div className="w-[340px] rounded-2xl bg-white p-10 shadow-md sm:w-[600px]">
        <div className="text-center text-dark-gray">
          <p className="mb-2 text-3xl font-semibold sm:text-4xl">
            Let's get started
          </p>
          <p className="mb-10">
            Join us here,a better place for every conversation
          </p>
        </div>

        <RegisterForm />
      </div>
    </div>
  );
}

export default Register;
