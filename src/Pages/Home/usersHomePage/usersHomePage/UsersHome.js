import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Blogs from "../../../../components/blog/Blogs";
import Loader from "../../../../loading/Loader";
import { fetchAllBlogs } from "../../../../redux/thunk/blogs";

const UsersHome = ({ category }) => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state?.blogs?.blogs);
  const isLoading = useSelector((state) => state?.blogs?.isLoading);

  useEffect(() => {
    dispatch(fetchAllBlogs());
  }, [dispatch]);

  let content;

  if (isLoading) {
    content = <Loader />;
  } else {
    if (blogs.length) {
      if (category && category !=="For you") {
        // Filter and map if category is provided
        content = blogs
          .filter((filteredBlog) => filteredBlog.category === category)
          .map((blog) => <Blogs key={blog._id} blog={blog}></Blogs>);
      }
      else {
        // Map all blogs if no category is provided
        content = blogs.map((blog) => (
          <Blogs key={blog._id} blog={blog}></Blogs>
        ));
      }
    }
  }

  return <div>{content}</div>;
};

export default UsersHome;
