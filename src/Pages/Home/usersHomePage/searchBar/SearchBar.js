import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import "./SearchBar.css";
import { useDispatch, useSelector } from "react-redux";
import { searchBlogs } from "../../../../redux/actions/blogActions";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const searchQuery = useSelector((state) => state?.blogs?.query)
  const blogs = useSelector((state) => state?.blogs?.blogs)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSearch = () => {
    dispatch(searchBlogs(query));
    const searchResults = blogs.filter((blog) =>
        blog.title?.toLowerCase().includes(query) 
      );
      const searchPeopleResults = blogs.filter((blog) =>
        blog.author?.toLowerCase().includes(query)
      );

      // console.log("searchResults", searchResults);
      // console.log("searchPeopleResults", searchPeopleResults);
      sessionStorage.setItem("searchBlogs", JSON.stringify(searchResults));
      sessionStorage.setItem("searchPeopleResults",JSON.stringify(searchPeopleResults))
      sessionStorage.setItem("query",JSON.stringify(query))
    navigate("/searchResults")
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <div>
      <div className="flex gap-2 items-center">
        <BsSearch />
        <input
          className="text-sm font-semibold focus:outline-none"
          type="text"
          placeholder="Search BlogWave"
          onChange={(e) => setQuery(e.target.value.toLowerCase())}
          onKeyPress={handleKeyPress}
        />
      </div>
    </div>
  );
};

export default SearchBar;
