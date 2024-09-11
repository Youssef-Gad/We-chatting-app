import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { getUserByName } from "../../../services/apiUser";
import SearchedUsers from "./searchedUsers";
import { useSocket } from "../../../context/SocketContext";
import { useAuth } from "../../../context/AuthContext";
import { useChat } from "../../../context/ChatContext";
import { getAllChatsOfUser } from "../../../services/apiChat";

function SidebarSearch() {
  const [searchText, setSearchText] = useState("");
  const [searchedUsers, setSearchedUsers] = useState([]);
  const { user } = useAuth();
  const { dispatch } = useChat();
  const { socket } = useSocket();

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

  async function OnClickSerachedUser(otherSearchedUser) {
    const res = await getAllChatsOfUser();
    if (res.status === "Success") {
      dispatch({ type: "setChats", payload: res.chats });
      // dispatch({ type: "setOtherUsers", payload: res.user });

      console.log(otherSearchedUser);
      console.log(res.chats);

      const userFound = res.chats.includes(otherSearchedUser);
      console.log(userFound);

      socket.emit("join_create_room", {
        senderId: user._id,
        receiverId: otherSearchedUser._id,
        roomId: null,
      });

      setSearchedUsers([]);
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
        <div className="absolute top-[9rem] ml-5 max-h-[20rem] w-[28.5rem] overflow-y-scroll rounded-md bg-[#eee] shadow-lg">
          {searchedUsers.map((user, i) => (
            <SearchedUsers
              user={user}
              key={i}
              onClick={() => OnClickSerachedUser(user)}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default SidebarSearch;
