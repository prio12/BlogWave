import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { fetchUserUpdatedData, follow, getAllUsers } from '../../../redux/thunk/userAuth';
import { fetchAllBlogs } from '../../../redux/thunk/blogs';
import StaffPicks from '../../Home/usersHomePage/staffPicksBlogs/StaffPicks';
import { LiaGreaterThanSolid } from 'react-icons/lia';
import { CgProfile } from 'react-icons/cg';

const Followings = () => {
    const userUid = useSelector((state) => state?.user?.user?.uid);
  const currentUser = useSelector((state) => state?.user?.userData);
  const allUser = useSelector((state) => state?.user?.allUsers);
  const [visitProfile, setVisitProfile] = useState(null);
  const [previousPage, setPreviousPage] = useState("");
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    const storedPreviousPage = location.state?.from;
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
    setVisitProfile(allUser?.find((userDetails) => userDetails?.uid === id))
  }, [allUser,id]);

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
  };

  const handleVisitProfile = (follower) => {
    if (currentUser?.uid === follower?.uid) {
      navigate('/profile')
    }

    else if (currentUser?.uid !== follower?.uid) {
    navigate(`/visitProfile/${follower?.uid}`,{ state: { from: "/followers" } })
    }
  }

  let content;

  if (previousPage === "/profile" && currentUser) {
    content = currentUser?.following?.map((myFollowing) => (
      <div key={myFollowing.uid} className="flex justify-between my-5 md:pr-12 items-center ">
        <div onClick={() => handleVisitProfile(myFollowing)} className="md:flex cursor-pointer lg:flex items-center gap-5">
          {/* <img src={myFollowing?.profilePic} className="h-16 w-16" alt="" /> */}
          {
            myFollowing?.profilePic ? <img src={myFollowing?.profilePic} className="h-16 w-16 rounded-full" alt="" />
             :
             <CgProfile
             className="w-16 h-16 cursor-pointer"
           />
            
          }
          <div className="my-3 md:my-0">
            <p className="mb-1 font-bold">{myFollowing?.name}</p>
            {myFollowing.about && (
              <p className="text-xs">{myFollowing.about.slice(0, 100)}...</p>
            )}
          </div>
        </div>
        <button
           onClick={() =>handleUnfollowBtn(myFollowing)}
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
      </div>
    ));
  } else {
    content = visitProfile?.following?.map((visitUserFollowing) => (
      <div key={visitUserFollowing.uid} className="flex justify-between my-5 md:pr-12 items-center ">
        <div onClick={() => handleVisitProfile(visitUserFollowing)} className="md:flex lg:flex cursor-pointer items-center gap-5">
          {/* <img src={visitUserFollowing?.profilePic} className="h-16 w-16" alt="" /> */}
          {
            visitUserFollowing?.profilePic ? <img src={visitUserFollowing?.profilePic} className="h-16 w-16 rounded-full" alt="" /> :
            <CgProfile
              className="w-16 h-16 cursor-pointer"
            />
          }
          <div className="my-3 md:my-0">
            <p className="mb-1 font-bold ">{visitUserFollowing?.name}</p>
            {visitUserFollowing.about && (
              <p className="text-xs">{visitUserFollowing.about.slice(0, 100)}...</p>
            )}
          </div>
        </div>
        {currentUser?.uid ===
        visitUserFollowing.uid ? null : currentUser?.following?.find(
            (following) => following?.uid === visitUserFollowing?.uid
          ) ? (
          <button
          onClick={() =>handleUnfollowBtn(visitUserFollowing)}
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
          onClick={() =>handleFollowBtn(visitUserFollowing)}
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
      <div className="md:col-span-2">
      <div
          className="flex items-center gap-2 my-5"
          style={{ fontSize: "12px" }}
        >
          {previousPage === "/profile" ? (
            <p>{currentUser?.name}</p>
          ) : (
            <p>{visitProfile?.name}</p>
          )}
          <LiaGreaterThanSolid />
          <p>Following</p>
        </div>
        {previousPage === "/profile" ? (
          <div>
            <h3 className="text-3xl font-bold ">
                {currentUser?.following?.length} Following
              </h3>
          </div>
        ) : (
          <div>
             <h3 className="text-3xl font-bold">
                {visitProfile?.following?.length} Following
              </h3>
          </div>
        )}
        <div>{content}</div>
      </div>
      <div className="md:block hidden col-span-1 ">
        <StaffPicks />
      </div>
    </div>
  );
};

export default Followings;