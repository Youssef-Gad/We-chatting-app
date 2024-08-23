import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

function SidebarSearch() {
  const [searchText, setSearchText] = useState("");

  return (
    <div className="relative border-b border-light-gray py-5 text-center">
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
    </div>
  );
}

export default SidebarSearch;
