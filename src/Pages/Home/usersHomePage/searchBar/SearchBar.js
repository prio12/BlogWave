import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import "./SearchBar.css";

const SearchBar = () => {
  return (
    <div className="px-12 my-12">
      <div className="flex gap-2 items-center">
        <BsSearch />
        <input
          className="text-sm font-semibold focus:outline-none"
          type="text"
          placeholder="Search BlogWave"
        />
      </div>

      {/* Topics Slider */}

    </div>

    
  );
};

export default SearchBar;
