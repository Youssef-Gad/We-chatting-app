import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { getUserByName } from "../../../services/apiUser";

function SidebarSearch() {
  const [searchText, setSearchText] = useState("");
  const [searchedUsers, setSearchedUsers] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (searchText && searchText.length >= 3) {
      const res = await getUserByName(searchText);
      if (res.status === "success") {
        setSearchedUsers((users) => [...users, ...res.users]);
        setSearchText("");
      }
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="relative border-b border-light-gray py-5 text-center"
      >
        <input
          type="text"
          className="input-search"
          placeholder="Search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        {searchedUsers.length === 0 && (
          <button>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="absolute right-10 top-[1.8rem] text-xl text-gray hover:text-primary"
            />
          </button>
        )}
        {searchedUsers.length > 0 && (
          <button onClick={() => setSearchedUsers([])}>
            <FontAwesomeIcon
              icon={faXmark}
              className="absolute right-10 top-[1.8rem] text-2xl text-gray hover:text-primary"
            />
          </button>
        )}
      </form>
      {searchedUsers.length > 0 && (
        <div className="absolute top-[9rem] ml-5 max-h-[20rem] w-[21rem] space-y-5 overflow-y-scroll rounded-md bg-light-gray p-5 sm:w-[28.5rem]">
          {searchedUsers.map((user, i) => (
            <div key={i} className="flex items-center gap-5">
              <img
                src={user.photo}
                alt="user"
                className="h-12 w-12 rounded-full"
              />
              <div className="flex flex-col gap-1">
                <p className="font-semibold text-dark-gray">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-dark-gray">{user.email}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default SidebarSearch;
