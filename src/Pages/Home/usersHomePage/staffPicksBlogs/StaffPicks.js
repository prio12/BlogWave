import React from "react";
import { Link } from "react-router-dom";
import Recommended from "../RecommendedTopics/Recommended";
import {BsBookmarkPlus} from 'react-icons/bs'
import { useSelector } from "react-redux";

const StaffPicks = () => {
  const blogs = useSelector((state) => state?.blogs?.blogs);
 
  return (
    <div>
      <h4 style={{fontSize:"12px"}} className="font-bold mb-5">Staff Picks</h4>
      {/* <div className="mb-8">
      <div className="flex  items-center gap-2">
        <img
          alt=""
          className="w-6 h-6 border rounded-full dark:bg-gray-500 dark:border-gray-700"
          src="https://img.freepik.com/premium-vector/cute-bear-cartoon-vector-icon-illustration-animal-icon-concept-isolated-vector-flat-cartoon-style_627305-346.jpg?w=2000"
        />
        <h5 style={{fontSize:"12px"}}>Kim Witten, PhD</h5>
      </div>
      <h4 style={{fontSize:"13px"}} className="font-extrabold mt-2">
        Why I’m breaking up with Burning Man
      </h4>
      <p style={{ color: "rgb(44, 148, 44)" }} className=" font-semibold">
        <Link>
          <small>See more Topics</small>
        </Link>
      </p>
      </div> */}
      {
        blogs?.filter((blog) => blog?.claps > 3)
        .slice(0,3)
        .map((blog) => <div className="mb-8">
        <div className="flex  items-center gap-2">
          <img
            alt=""
            className="w-6 h-6 border rounded-full dark:bg-gray-500 dark:border-gray-700"
            src={blog?.authorImage}
          />
          <h5 style={{fontSize:"12px"}}>{blog?.author}</h5>
        </div>
        <Link to={`/blogDetails/${blog?._id}`}>
        <h4 style={{fontSize:"13px"}} className="font-extrabold mt-2">
         {blog?.title}
        </h4>
        </Link>
        {/* <p style={{ color: "rgb(44, 148, 44)" }} className=" font-semibold">
          <Link>
            <small>See more Topics</small>
          </Link>
        </p> */}
        </div>)
      }
      <Recommended/>
      <div>
        <h5 style={{fontSize:"13px"}} className="font-bold mt-8 mb-3">Reading list</h5>
        <p style={{fontSize:"12px"}}>
        Click the <BsBookmarkPlus className="inline"/> on any story to easily add it to your reading list or a custom list that you can share.
        </p>
      </div>
    </div>
  );
};

export default StaffPicks;
