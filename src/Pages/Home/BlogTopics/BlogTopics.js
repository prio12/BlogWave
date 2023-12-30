import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BlogTopics = () => {
  const blogs = useSelector((state) => state?.blogs?.blogs);
  const uniqueCategory = new Set();

  if (blogs && blogs.length) {
    blogs.map((blog) => uniqueCategory.add(blog.category));
  }

  return (
    <div>
      <h5 style={{ fontSize: "13px" }} className="font-bold mb-4">
        Discover more of what matters to you
      </h5>
      <Link to="/signUp">
        <div style={{ fontSize: "12px" }} className="grid  grid-cols-3 ">
          {uniqueCategory &&
            Array.from(uniqueCategory)
              .slice(0, 9)
              .map((category) => <p className="bg-base-200  p-2 rounded-full text-center" key={category}>{category}</p>)}
        </div>
      </Link>
      <p
        style={{ color: "rgb(44, 148, 44)", fontSize: "12px" }}
        className=" font-semibold my-5"
      >
        <Link to="/signUp ">
          <small>See more Topics</small>
        </Link>
      </p>
    </div>
  );
};

export default BlogTopics;
