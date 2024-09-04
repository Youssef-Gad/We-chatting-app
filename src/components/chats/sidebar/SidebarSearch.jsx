import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { getUserByName } from "../../../services/apiUser";

function SidebarSearch() {
  const [searchText, setSearchText] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (searchText && searchText.length >= 3) {
      const res = await getUserByName(searchText);
      console.log(res);
      setSearchText("");
    }
  }

  return (
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
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        className="absolute right-10 top-[1.8rem] text-xl text-gray"
      />
    </form>
  );
}

export default SidebarSearch;
