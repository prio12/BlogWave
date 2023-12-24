import React, { useEffect } from "react";
import StaffPicks from "../Home/usersHomePage/staffPicksBlogs/StaffPicks";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserUpdatedData, getAllUsers } from "../../redux/thunk/userAuth";
import { fetchAllBlogs } from "../../redux/thunk/blogs";
import { Link } from "react-router-dom";

const Notifications = () => {
  const userDetails = useSelector((state) => state?.user?.userData);
  const userUid = useSelector((state) => state?.user?.user?.uid);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserUpdatedData(userUid));
  }, [dispatch, userUid]);

  useEffect(() => {
    dispatch(fetchAllBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  let content;

  if (
    userDetails &&
    userDetails?.notifications &&
    userDetails?.notifications?.length > 0
  ) {
    content = userDetails?.notifications?.map((notification) => (
      <Link to={`/visitProfile/${notification?.uid}`}>
        <div className="flex gap-5 items-center mb-5">
          <img src={notification?.profilePic} className="w-12 h-12" alt="" />
          <div>
            <p className="text-xs"><span className="font-bold">{notification?.name}</span> started following you!</p>
            <p className="text-xs">
              <small>
                {notification
                  ? new Date(notification.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : ""}{" "}
                ·
              </small>
            </p>
          </div>
        </div>
      </Link>
    ));
  }
  else {
    content = <p className="text-xs text-center py-5">No one has started following you yet!</p>
  }
  return (
    <div className="px-8  md:px-12 grid grid-cols-1 md:grid-cols-3 gap-5">
      <div className="md:col-span-2">
        {content}
      </div>
      <div className="md:block hidden col-span-1 ">
        <div className="mb-5">
          <StaffPicks />
        </div>
      </div>
    </div>
  );
};

export default Notifications;
