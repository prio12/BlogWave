import React, { useEffect } from "react";
import StaffPicks from "../Home/usersHomePage/staffPicksBlogs/StaffPicks";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserUpdatedData, getAllUsers } from "../../redux/thunk/userAuth";
import { fetchAllBlogs } from "../../redux/thunk/blogs";
import Loader from "../../loading/Loader";
import Blogs from "../../components/blog/Blogs";
import { useLocation } from "react-router-dom";

const StaffPicksBlogs = () => {
  const blogs = useSelector((state) => state?.blogs?.blogs);
  const userUid = useSelector((state) => state?.user?.user?.uid);
  const isLoading = useSelector((state) => state?.blogs?.isLoading);
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

  if (isLoading) {
    content = <Loader/>
  }

  if (blogs && blogs.length) {
    content = blogs?.sort((a,b) => b.claps - a.claps)
    .map((blog) => <Blogs blog={blog} key={blog?._id}></Blogs>)
  }
  return (
    <div className="px-8  md:px-12 grid grid-cols-1 md:grid-cols-3 gap-5">
      <div className="md:col-span-2">
        <div>
        <h2 className="text-3xl font-bold">Staff Picks</h2>
        <p className="text-[#6B6B6B]">
          Stories from across Medium, hand-selected by our team.
        </p>
        <div className="mt-2">
            {content}
        </div>
        </div>
      </div>
      <div className="md:block hidden col-span-1 ">
        <StaffPicks />
      </div>
    </div>
  );
};

export default StaffPicksBlogs;
