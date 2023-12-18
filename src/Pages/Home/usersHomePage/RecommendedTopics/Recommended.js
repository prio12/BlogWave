import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../../../../loading/Loader";

const Recommended = () => {
  const blogs = useSelector((state) => state?.blogs?.blogs);

  const uniqueCategory = new Set();

  if (blogs && blogs.length) {
    blogs.forEach((blog) => uniqueCategory.add(blog?.category));
  }

  return (
    <div>
      <h5 style={{ fontSize: "13px" }} className="font-bold mb-4">
        Recommended topics
      </h5>
      <div className="text-xs grid grid-cols-3 gap-4 ">
        {Array.from(uniqueCategory)
        .slice(0,6)
        .map((category) => (
          <p key={category}>{category}</p>
        ))}
      </div>
      <p style={{ color: "rgb(44, 148, 44)" }} className=" font-semibold">
        <Link>
          <small>See more Topics</small>
        </Link>
      </p>
    </div>
  );
};

export default Recommended;
