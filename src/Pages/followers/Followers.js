import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchUserUpdatedData, follow, getAllUsers } from "../../redux/thunk/userAuth";
import { fetchAllBlogs } from "../../redux/thunk/blogs";
import StaffPicks from "../Home/usersHomePage/staffPicksBlogs/StaffPicks";

const Followers = () => {
  const userUid = useSelector((state) => state?.user?.user?.uid);
  const currentUser = useSelector((state) => state?.user?.userData);
  const [visitProfile, setVisitProfile] = useState(null);
  const [previousPage, setPreviousPage] = useState("");
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(location);
    const storedPreviousPage = location.state?.from;
    console.log(storedPreviousPage,"inside useEffect block");
    setPreviousPage(storedPreviousPage);
  }, [location]);
  useEffect(() => {
    dispatch(fetchUserUpdatedData(userUid));
  }, [dispatch, userUid]);

  useEffect(() => {
    dispatch(fetchAllBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    setVisitProfile(storedUser);
  }, []);

  const handleFollowBtn = (followerInfo) => {
    const following = {
      profilePic: currentUser?.profilePic,
      name: currentUser?.name,
      uid: currentUser?.uid,
      about: currentUser?.about,
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
    console.log("clicked");
  };

  const handleUnfollowBtn = (followerInfo) => {
    const following = {
      profilePic: currentUser?.profilePic,
      name: currentUser?.name,
      uid: currentUser?.uid,
      about: currentUser?.about,
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
      action:"unFollow"
    };

    dispatch(follow(relationshipInfo));
    console.log("clicked");
  };

  let content;

  if (previousPage === "/profile" && currentUser) {
    content = currentUser?.followers?.map((follower) => (
      <div key={follower._id} className="flex justify-between my-5 md:pr-12 items-center ">
        <div className="md:flex lg:flex items-center gap-5">
          <img src={follower?.profilePic} className="h-16 w-16" alt="" />
          <div className="my-3 md:my-0">
            <p className="text-xs font-bold">{follower?.name}</p>
            {follower.about && (
              <p className="text-xs">{follower.about.slice(0, 100)}...</p>
            )}
          </div>
        </div>
        {currentUser?.uid === follower.uid ? (
          <p>I can't follow myself</p>
        ) : currentUser?.following?.find(
            (following) => following?.uid === follower.uid
          ) ? (
          <button
           onClick={() =>handleUnfollowBtn(follower)}
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
          onClick={() =>handleFollowBtn(follower)}
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
        )}
      </div>
    ));
  } else {
    content = visitProfile?.followers?.map((follower) => (
      <div key={follower._id} className="flex justify-between my-5 md:pr-12 items-center ">
        <div className="md:flex lg:flex items-center gap-5">
          <img src={follower?.profilePic} className="h-16 w-16" alt="" />
          <div className="my-3 md:my-0">
            <p className="text-xs font-bold">{follower?.name}</p>
            {follower.about && (
              <p className="text-xs">{follower.about.slice(0, 100)}...</p>
            )}
          </div>
        </div>
        {currentUser?.uid ===
        follower.uid ? null : currentUser?.following?.find(
            (following) => following?.uid === follower?.uid
          ) ? (
          <button
          onClick={() =>handleUnfollowBtn(follower)}
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
          onClick={() =>handleFollowBtn(follower)}
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
        )}
      </div>
    ));
  }

  return (
    <div className="p-5 md:px-12 grid grid-cols-1 gap-5 md:grid-cols-3">
      <div className="md:col-span-2">{content}</div>
      <div className="md:block hidden col-span-1 ">
        <StaffPicks />
      </div>
    </div>
  );
};

export default Followers;
