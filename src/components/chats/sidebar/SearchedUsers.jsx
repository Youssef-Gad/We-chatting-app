function SearchedUsers({ user, onClick }) {
  return (
    <div
      className="flex cursor-pointer items-center gap-5 px-3 py-5 hover:bg-white"
      onClick={onClick}
    >
      <img src={user.photo} alt="user" className="h-12 w-12 rounded-full" />
      <div className="flex flex-col gap-1">
        <p className="font-semibold text-dark-gray">
          {user.firstName} {user.lastName}
        </p>
        <p className="text-dark-gray">{user.email}</p>
      </div>
    </div>
  );
}

export default SearchedUsers;
