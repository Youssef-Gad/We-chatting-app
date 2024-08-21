import RegisterForm from "./RegisterForm";

function Register() {
  return (
    <div className="h-[140vh] bg-light-gray flex items-center justify-center">
      <div className="w-[600px] bg-white p-10 rounded-2xl shadow-md">
        <div className="text-center text-dark-gray ">
          <p className=" text-4xl font-semibold mb-2">Let's get started</p>
          <p className="mb-5">
            Join us here,a better place for every conversation
          </p>
        </div>

        <RegisterForm />
      </div>
    </div>
  );
}

export default Register;
