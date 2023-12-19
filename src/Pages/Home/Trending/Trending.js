import React from "react";
import { AiFillFire } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Trending = () => {
  const blogs = useSelector((state) => state?.blogs?.blogs);
  const navigate = useNavigate();

  const handleNavigate = () =>{
    navigate('/signUp')
  }

  return (
    <div className="pt-10 mb-12 px-12">
      <h5 style={{fontSize:"13px"}} className="flex gap-1  font-bold items-center">
        <AiFillFire /> Hottest Articles Now
      </h5>
      <div className="py-5 px-8 grid grid-cols-1 gap-8 md:grid-cols-3">
      {
        blogs?.sort((a,b) => b.claps - a.claps)
        .slice(0,6)
        .map((blog) => <div onClick={handleNavigate} className="cursor-pointer" key={blog._id}>
        <div className="flex  items-center gap-2">
          <img
            alt=""
            className="w-6 h-6 border rounded-full dark:bg-gray-500 dark:border-gray-700"
            src={blog?.authorImage}
          />
          <h5 style={{fontSize:"12px"}} className="font-semibold">{blog?.author}</h5>
        </div>
        <h4 style={{fontSize:"14px"}} className="font-extrabold mt-2">
          {blog?.title}
        </h4>
        <p className="text-sm mt-2">
          <small>Aug 23 · 7 min read</small>
        </p>
      </div>)
      }
      </div>
    </div>
  );
};

export default Trending;
