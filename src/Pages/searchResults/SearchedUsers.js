import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchUserAllBlogs } from "../../redux/thunk/blogs";
import { follow } from "../../redux/thunk/userAuth";
import { CgProfile } from "react-icons/cg";

const SearchedUsers = ({ user }) => {
  const currentUser = useSelector((state) => state?.user?.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleVisitProfile = () => {
    // dispatch(fetchUserAllBlogs(user?.uid))
    sessionStorage.setItem("user", JSON.stringify(user));
    if (currentUser.uid === user.uid) {
     navigate('/profile')
    }

    else if (currentUser.uid !== user.uid) {
      navigate(`/visitProfile/${user?.uid}`);
    }
    
  };

  const handleFollowBtn = () => {
    const following = {
      profilePic: currentUser?.profilePic,
      name: currentUser?.name,
      uid: currentUser?.uid,
      about: currentUser?.about,
    };
    const follower = {
      profilePic: user?.profilePic,
      name: user?.name,
      uid: user?.uid,
      about: user?.about,
    };
    const relationshipInfo = {
      following,
      follower,
      action:"follow"
    };

    dispatch(follow(relationshipInfo));
  };

  const handleUnfollowBtn = () =>{
    const following = {
      profilePic: currentUser?.profilePic,
      name: currentUser?.name,
      uid: currentUser?.uid,
      about: currentUser?.about,
    };
    const follower = {
      profilePic: user?.profilePic,
      name: user?.name,
      uid: user?.uid,
      about: user?.about,
    };
    const relationshipInfo = {
      following,
      follower,
      action:"unFollow"
    };

    dispatch(follow(relationshipInfo))
  }
  return (
    <div className="flex justify-between my-5 md:pr-12 items-center">
      <Link onClick={handleVisitProfile}>
        <div className="md:flex lg:flex items-center gap-5">
          
          {
            user?.profilePic ?  <img src={user?.profilePic} className="h-16 w-16 rounded" alt="" />
            :
            <CgProfile className="w-16 h-16 cursor-pointer" />
          }
          <div className="my-3 md:my-0">
            <p className="text-xs font-bold">{user?.name}</p>
            {user.about && (
              <p className="text-xs">{user.about.slice(0, 100)}...</p>
            )}
          </div>
        </div>
      </Link>
      {
        currentUser.uid === user.uid ? (
          null

        ) :
        currentUser?.following?.find(
          (followingId) => followingId.uid === user?.uid
        ) ? (
          <button
          onClick={handleUnfollowBtn}
          className="btn btn-xs mb-12 md:mb-0 lg:mb-0"
            style={{
              backgroundColor: "transparent", // Set background to transparent
              color: "#1A8917", // Set text color to red
              border: "1px solid #1A8917", // Add a red border
              textTransform: "none",
            }}
          >
            Unfollow
          </button>
        ) : (
          <button
            onClick={handleFollowBtn}
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
        )
      }
    </div>
  );
};

export default SearchedUsers;
