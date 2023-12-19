import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserUpdatedData,
  getAllUsers,
} from "../../../redux/thunk/userAuth";
import { fetchAllBlogs } from "../../../redux/thunk/blogs";
import Loader from "../../../loading/Loader";
import { useParams } from "react-router-dom";
import StaffPicks from "../usersHomePage/staffPicksBlogs/StaffPicks";
import Blogs from "../../../components/blog/Blogs";

const CategoryBlogs = () => {
  const userUid = useSelector((state) => state?.user?.user?.uid);
  const loading = useSelector((state) => state?.user?.isLoading);
  const blogs = useSelector((state) => state?.blogs?.blogs)
  const dispatch = useDispatch();
  const { category } = useParams();
  console.log(category);
  let content;
  useEffect(() => {
    dispatch(fetchUserUpdatedData(userUid));
  }, [dispatch, userUid]);

  useEffect(() => {
    dispatch(fetchAllBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  if (loading) {
    content = <Loader />;
  }

  if (blogs && blogs.length) {
    content = blogs.filter((blog) => blog?.category === category)
    .map((blog) => <Blogs blog={blog} key={blog?._id}></Blogs>)
  }
 
  return (
    <div className="px-8  md:px-12 grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="md:col-span-2">
        <h3 className="text-3xl font-bold">{category} <span className="text-[#6B6B6B]">Category Blogs</span></h3>
        <div className="my-8">
            {content}
        </div>
        </div>
        <div className="md:block hidden col-span-1 ">
            <StaffPicks/>
        </div>
    </div>
  );
};

export default CategoryBlogs;
