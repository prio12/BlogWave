import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { GET_BLOG_ID } from "../../redux/actionTypes/actionTypes";

const Blogs = ({ blog }) => {
 
  const dispatch = useDispatch();
  return (
    <div className="flex flex-row justify-between items-center">
      {/* blog details div */}
      <div className="mb-4 md:mb-0 md:w-2/3 pr-6">
        <div className="flex items-center gap-2">
          {/* avatar */}
          <img
            alt=""
            className="w-6 h-6 border rounded-full dark:bg-gray-500 dark:border-gray-700"
            src={blog?.authorImage}
          />
          <h5 style={{ fontSize: "12px" }}>{blog?.author}</h5>
        </div>
        <Link onClick={() => dispatch({type:GET_BLOG_ID, payload:blog?._id})} to={`/blogDetails/${blog?._id}`}>
        <h4 className="font-bold mt-2">{blog?.title}</h4>
        <p style={{ fontSize: "12px" }}>{blog?.description?.slice(0,200)+"..."}</p>
        <p className="text-sm mt-2">
          <small>
            {blog
              ? new Date(blog.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : ""}{" "}
            · 7 min read . <span className="ms-5">{blog?.category}</span>
          </small>
        </p>
        </Link>
      </div>
      {/* blog image div */}
      <div className="w-full md:w-1/3">
        <img
          style={{ width: "100%" }}
          src="https://cdn.pixabay.com/photo/2015/11/06/13/25/blog-1027861_640.jpg"
          alt=""
        />
      </div>
    </div>
  );
};

export default Blogs;
