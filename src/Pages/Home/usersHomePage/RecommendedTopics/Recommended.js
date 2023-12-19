import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Recommended = () => {
  const blogs = useSelector((state) => state?.blogs?.blogs);
  const location = useLocation();
  const {pathname} = location;
  const navigate = useNavigate();

  const uniqueCategory = new Set();

  if (blogs && blogs.length) {
    blogs.forEach((blog) => uniqueCategory.add(blog?.category));
  }

  const handleNavigate = (category) => {
    navigate(`/categoryBlogs/${category}`)
  }

  return (
    <div className={`${pathname === "/topics" ? "hidden" : "block"}`}>
      <h5 style={{ fontSize: "13px" }} className="font-bold mb-4">
        Recommended topics
      </h5>
      <div className="text-xs grid grid-cols-3 gap-4 ">
        {Array.from(uniqueCategory)
        .slice(0,6)
        .map((category) => (
          <p className="cursor-pointer" key={category} onClick={() => handleNavigate(category)}>{category}</p>
        ))}
      </div>
      <p style={{ color: "rgb(44, 148, 44)",fontSize:"12px" }} className=" font-bold">
        <Link to='/topics'>
          <small >See more Topics</small>
        </Link>
      </p>
    </div>
  );
};

export default Recommended;
