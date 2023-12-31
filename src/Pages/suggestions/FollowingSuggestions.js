import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserUpdatedData, getAllUsers } from "../../redux/thunk/userAuth";
import { fetchAllBlogs } from "../../redux/thunk/blogs";
import StaffPicks from "../Home/usersHomePage/staffPicksBlogs/StaffPicks";
import SearchedUsers from "../searchResults/SearchedUsers";

const FollowingSuggestions = () => {
  const userUid = useSelector((state) => state?.user?.user?.uid);
  const userDetails = useSelector((state) => state?.user?.userData);
  const allUsers = useSelector((state) => state?.user?.allUsers);
  const dispatch = useDispatch();
  const [toFollow,setToFollow] = useState([]);
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
    const users = allUsers.filter(
      (user) =>
        user?.uid !== null &&
        user?.uid !== userUid &&
        !userDetails?.following?.some((following) => following?.uid === user.uid)
    );
    setToFollow(users)
  }, [allUsers, userUid, userDetails?.following]);

  return (
    <div className="md:px-12 px-5 grid grid-cols-1 md:grid-cols-3 gap-5">
      <div className="md:col-span-2 ">
        <h4 className="font-bold text-xs">Who to follow</h4>
        <div>
          {
            toFollow?.map((user) => <SearchedUsers user={user} key={user.uid}></SearchedUsers>)
          }
        </div>
      </div>
      <div className="md:block hidden col-span-1">
        <StaffPicks />
      </div>
    </div>
  );
};

export default FollowingSuggestions;
