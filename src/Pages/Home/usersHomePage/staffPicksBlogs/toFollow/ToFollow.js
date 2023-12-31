import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserUpdatedData, follow } from "../../../../../redux/thunk/userAuth";
import { CgProfile } from "react-icons/cg";
import { Link, useLocation } from "react-router-dom";

const ToFollow = () => {
  const userUid = useSelector((state) => state?.user?.user?.uid);
  const userDetails = useSelector((state) => state?.user?.userData);
  const allUsers = useSelector((state) => state?.user?.allUsers);
  const dispatch = useDispatch();
  const location = useLocation();
  const {pathname} = location;
  const [toFollow, setToFollow] = useState([]);
  

  useEffect(() => {
    const users = allUsers.filter(
      (user) =>
        user?.uid !== null &&
        user?.uid !== userUid &&
        !userDetails?.following.some((following) => following?.uid === user.uid)
    );
    setToFollow(users);
  }, [allUsers, userUid, userDetails?.following]);

  //handling follow btn 
  const handleFollowBtn = (followerInfo) => {
    const following = {
      profilePic: userDetails?.profilePic,
      name: userDetails?.name,
      uid: userDetails?.uid,
      about: userDetails?.about,
    };
    const follower = {
      profilePic: followerInfo?.profilePic,
      name: followerInfo?.name,
      uid: followerInfo?.uid,
      about: followerInfo?.about,
    };
    const relationshipInfo = {
      following,
      follower,
      action:"follow"
    };

    dispatch(follow(relationshipInfo));
  };
  
  return (
    <div className={`my-5  ${pathname === "/following/suggestions" ? "hidden" : "block"}`}>
      <div>
        {toFollow?.slice(0, 3).map((user) => (
          <div className="my-5 flex items-center gap-3" key={user._id}>
            <div>
             <Link to={`/visitProfile/${user?.uid}`}>
             {user?.profilePic ? (
                <img
                  src={user.profilePic}
                  className="w-6 h-6 rounded-full"
                  alt=""
                />
              ) : (
                <CgProfile className="w-16 h-16 cursor-pointer" />
              )}
             </Link>
            </div>
            <div className="w-3/4">
             <Link to={`/visitProfile/${user?.uid}`}>
             <h5 className="text-xs font-bold">{user?.name}</h5>
             </Link>
              {user?.about && (
                <p style={{ fontSize: "10px" }}>
                  {user?.about.slice(0, 60) + "..."}
                </p>
              )}
            </div>
            <button
              onClick={() => handleFollowBtn(user)}
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
          </div>
        ))}
      </div>
      <p style={{ color: "rgb(44, 148, 44)" }} className={`mb-5 font-bold text-xs `}>
        <Link to="/following/suggestions">
          <small>See more suggestions</small>
        </Link>
      </p>
    </div>
  );
};

export default ToFollow;
