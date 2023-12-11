import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchUserUpdatedData, getAllUsers } from "../../redux/thunk/userAuth";
import { fetchAllBlogs } from "../../redux/thunk/blogs";
import StaffPicks from "../Home/usersHomePage/staffPicksBlogs/StaffPicks";

const Followers = () => {
  const userUid = useSelector((state) => state?.user?.user?.uid);
  const currentUser = useSelector((state) => state?.user?.userData);
//   console.log(currentUser?.followers);
//   const [visitProfile,setVisitProfile] = useState(null)
const [user,setUser] = useState(null)
 
  const [previousPage, setPreviousPage] = useState("");
  const location = useLocation();
  const dispatch = useDispatch()
  useEffect(() => {
    const previousPage = location.state?.from;
    setPreviousPage(previousPage);
  }, [location.state?.from]);

  useEffect(() => {
    dispatch(fetchUserUpdatedData(userUid));
  }, [dispatch, userUid]);

  useEffect(() => {
    dispatch(fetchAllBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() =>{
    if (previousPage === '/profile') {
        setUser(currentUser)
    }
    else {
        const storedUser = JSON.parse(sessionStorage.getItem('user'));
        setUser(storedUser)
    }
  },[previousPage,currentUser])
  return (
    <div className="p-5 md:px-12 grid grid-cols-1 gap-5 md:grid-cols-3">
        <div className="md:col-span-2">
           {
            user?.followers.map((follower) =>(
                <div className="flex justify-between my-5 md:pr-12 items-center ">
                <div className="md:flex lg:flex items-center gap-5">
                <img src={follower?.profilePic} className="h-16 w-16" alt="" />
                <div className="my-3 md:my-0">
                  <p className="text-xs font-bold">{follower?.name}</p>
                  {follower.about && (
                    <p className="text-xs">{follower.about.slice(0, 100)}...</p>
                  )}
                </div>
                </div>
                {
                    currentUser?.following?.find((following) => following?.uid === follower?.uid) ? (
                        <button
                //   onClick={handleUnfollowBtn}
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
                    // onClick={handleFollowBtn}
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
            ))
           }
        </div>
        <div className="md:block hidden col-span-1 ">
            <StaffPicks/>
        </div>
    </div>
  );
};

export default Followers;
