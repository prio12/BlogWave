import React from "react";
import { AiFillFire } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Trending = () => {
  const blogs = useSelector((state) => state?.blogs?.blogs);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/signUp");
  };

  return (
    <div className="pt-10 mb-12 md:px-12 w-full px-5">
      <h5
        style={{ fontSize: "13px" }}
        className="flex gap-1  font-bold items-center"
      >
        <AiFillFire /> Hottest Articles Now
      </h5>
      <div className="py-5  px-8 grid grid-cols-1 gap-8 md:grid-cols-3">
        {blogs
          ?.sort((a, b) => b.claps - a.claps)
          .slice(0, 6)
          .map((blog) => (
            <div
              onClick={handleNavigate}
              className="cursor-pointer"
              key={blog._id}
            >
              <div className="flex  items-center gap-2">
                {blog?.authorImage ? (
                  <img
                    alt=""
                    className="w-6 h-6 border rounded-full dark:bg-gray-500 dark:border-gray-700"
                    src={blog?.authorImage}
                  />
                ) : (
                  <CgProfile className="w-6 h-6 border rounded-full cursor-pointer" />
                )}
                <h5 style={{ fontSize: "12px" }} className="font-semibold">
                  {blog?.author}
                </h5>
              </div>
              <h4 style={{ fontSize: "14px" }} className="font-extrabold mt-2">
                {blog?.title}
              </h4>
              <p style={{fontSize:"10px"}} className=" mt-2">
                {blog?.description?.length && (
                  <>
                    {blog.description.length < 1000 && (
                      <span>· 2 min read .</span>
                    )}
                    {blog.description.length > 1000 &&
                      blog.description.length < 1500 && (
                        <span>· 3 min read .</span>
                      )}
                    {blog.description.length > 1500 &&
                      blog.description.length < 2000 && (
                        <span>· 5 min read .</span>
                      )}
                    {blog.description.length > 2000 &&
                      blog.description.length < 3000 && (
                        <span>· 7 min read .</span>
                      )}
                    {blog.description.length > 3000 &&
                      blog.description.length < 5000 && (
                        <span>· 10 min read .</span>
                      )}
                  </>
                )}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Trending;
