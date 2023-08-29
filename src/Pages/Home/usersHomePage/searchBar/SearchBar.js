import React, { useState } from "react";
import {BsSearch} from 'react-icons/bs'

const SearchBar = () => {
//   const [searchTerm, setSearchTerm] = useState("");

//   const handleChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     console.log("Search term: " + searchTerm);
//   };
  return (
    <div className="px-12 my-12">
      {/* <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleChange}
      />
      <button type="submit" onClick={handleSubmit}>
        Search
      </button> */}
       <div className="flex gap-2 items-center">
       <BsSearch/>
       <input
       className="text-sm font-semibold focus:outline-none"
        type="text" 
        placeholder="Search BlogWave"
        />
       </div>
    </div>
  );
};

export default SearchBar;
