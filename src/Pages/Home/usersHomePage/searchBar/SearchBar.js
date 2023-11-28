import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import "./SearchBar.css";

const SearchBar = () => {
  const [query, setQuery] = useState('');
  console.log(query);
  const handleSearch = () =>{
    console.log(query)
  }

  const handleKeyPress = (e) =>{
    if (e.key === "Enter") {
      handleSearch()
    }
  }
  return (
    <div>
      <div className="flex gap-2 items-center">
        <BsSearch />
        <input
          className="text-sm font-semibold focus:outline-none"
          type="text"
          placeholder="Search BlogWave"
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </div>
    </div>

    
  );
};

export default SearchBar;
