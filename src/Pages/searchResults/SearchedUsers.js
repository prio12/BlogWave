import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { visitProfile } from "../../redux/actions/userAuthActions";
import { fetchUserAllBlogs } from "../../redux/thunk/blogs";

const SearchedUsers = ({ user }) => {
  console.log(user?.uid);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleVisitProfile = () =>{
    dispatch(visitProfile(user))
    dispatch(fetchUserAllBlogs(user?.uid))
    sessionStorage.setItem('user',JSON.stringify(user))
      navigate(`/visitProfile/${user?.uid}`)
  }
  return (
    <div className="flex justify-between my-5 md:pr-12 items-center">
       <Link onClick={handleVisitProfile}>
       <div className="md:flex lg:flex items-center gap-5">
       <img src={user?.profilePic} className="h-16 w-16" alt="" />
       <div className="my-3 md:my-0">
      <p className="text-xs font-bold">{user?.name}</p>
        {
          user.about && <p className="text-xs">{user.about.slice(0,100)}...</p>
        }
      </div>
       </div>
       </Link>
      
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
