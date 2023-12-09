import React from "react";
import { Link } from "react-router-dom";

const SearchedUsers = ({ user }) => {
  console.log(user);
  return (
    <div className="flex justify-between my-5 md:pr-12 items-center">
      <div className="flex gap-5 items-center">
        <img src={user?.authorImage} className="h-16 w-16" alt="" />
        <p className="text-xs">{user?.author}</p>
      </div>
      <Link>
      <button
        className="btn btn-xs"
        style={{
          backgroundColor: "#1A8917",
          color: "white",
          textTransform: "none",
          "&:hover": {
            backgroundColor: "#1A8917",
            textTransform: "none",
          },
        }}
      >
        Follow
      </button>
      </Link>
    </div>
  );
};

export default SearchedUsers;
