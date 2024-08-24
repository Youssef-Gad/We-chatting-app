import RegisterForm from "./RegisterForm";

function Register() {
  return (
    <div className="flex h-[190vh] items-center justify-center bg-light-gray">
      <div className="w-[600px] rounded-2xl bg-white p-10 shadow-md">
        <div className="text-center text-dark-gray">
          <p className="mb-2 text-4xl font-semibold">Let's get started</p>
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
