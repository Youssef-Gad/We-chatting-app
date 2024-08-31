import { useAuth } from "../../../context/AuthContext";

function EmptyChat() {
  const { user } = useAuth();
  return (
    <div className="flex flex-grow flex-col items-center justify-center bg-light-gray text-center">
      <img src="/home.svg" alt="icon" className="w-[25rem]" />
      <p className="text-3xl font-semibold text-dark-gray">
        Hi {user.firstName}, Welcome back
      </p>
      <p className="text-gray">
        Ready to chat with everyone and join your favourite event? <br /> Let's
        chat with everyone
      </p>
    </div>
  );
}

export default EmptyChat;
