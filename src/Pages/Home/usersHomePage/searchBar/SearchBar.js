import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import "./SearchBar.css";

const allTopics = [
  "Technology",
  "Science",
  "Art",
  "Health",
  "Travel",
  "Food",
  "Fashion",
  "Sports",
  "Music",
  "Books",
]; // Your array of topics
const topicsPerPage = 6; // Number of topics to show at a time

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
