import { useAuth } from "../../context/AuthContext";

function UserInfo() {
  const { user } = useAuth();

  return (
    <div className="flex items-center gap-5 border-b border-light-gray p-5">
      <img src={user.photo} alt="user" className="w-24 rounded-full" />
      <div className="flex flex-col">
        <p className="text-2xl font-semibold text-dark-gray">
          {user.firstName} {user.lastName}
        </p>
        <p className="text-gray">{user.email}</p>
      </div>
    </div>
  );
}

export default UserInfo;
