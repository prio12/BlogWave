import React from "react";
import { Link } from "react-router-dom";

const SearchedUsers = ({ user }) => {
  console.log(user);
  return (
    <div className="flex justify-between my-5 md:pr-12 items-center">
       <div className="md:flex lg:flex items-center gap-5">
       <img src={user?.profilePic} className="h-16 w-16" alt="" />
       <div className="my-3 md:my-0">
      <p className="text-xs font-bold">{user?.name}</p>
        <p className="text-xs">{user?.about.slice(0,100)}...</p>
      </div>
       </div>
      
      <Link>
      <button
        className="btn btn-xs mb-12 md:mb-0 lg:mb-0"
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
