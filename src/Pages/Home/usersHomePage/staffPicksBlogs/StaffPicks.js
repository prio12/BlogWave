import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Recommended from "../RecommendedTopics/Recommended";
import { BsBookmarkPlus } from "react-icons/bs";
import { useSelector } from "react-redux";

const StaffPicks = () => {
  const blogs = useSelector((state) => state?.blogs?.blogs);
  const currentUser = useSelector((state) => state?.user?.userData);
  const navigate = useNavigate();
  const location = useLocation();
  const {pathname} = location;
  console.log(pathname);
  const handleVisitProfile = (authorUid) => {
    if (currentUser?.uid === authorUid) {
      navigate("/profile");
    } else if (currentUser?.uid !== authorUid) {
      navigate(`/visitProfile/${authorUid}`, {
        // state: { from: "/followers" },
      });
    }
  };
  return (
    <div>
      <h4 style={{ fontSize: "12px" }} className={`font-bold mb-3 ${pathname === "/staffPicksBlogs" ? "hidden" : "block"}`}>
        Staff Picks
      </h4>
      {blogs
        ?.filter((blog) => blog?.claps > 3)
        .slice(0, 3)
        .map((blog) => (
          <div className={`mb-5 ${pathname === "/staffPicksBlogs" ? "hidden" : "block"}`} key={blog?._id}>
            <div onClick={() => handleVisitProfile(blog?.userUid)} className="flex cursor-pointer  items-center gap-2">
              <img
                alt=""
                className="w-6 h-6 border rounded-full dark:bg-gray-500 dark:border-gray-700"
                src={blog?.authorImage}
              />
              <h5 style={{ fontSize: "12px" }}>{blog?.author}</h5>
            </div>
            <Link to={`/blogDetails/${blog?._id}`}>
              <h4 style={{ fontSize: "13px" }} className="font-extrabold mt-2">
                {blog?.title}
              </h4>
            </Link>
          </div>
        ))}
      <p style={{ color: "rgb(44, 148, 44)" }} className={`mb-5 font-bold text-xs ${pathname === "/staffPicksBlogs" ? "hidden" : "block"}`}>
        <Link to="/staffPicksBlogs">
          <small>See the full list</small>
        </Link>
      </p>
      <Recommended />
      <div>
        <h5 style={{ fontSize: "13px" }} className="font-bold mt-8 mb-3">
          Reading list
        </h5>
        <p style={{ fontSize: "12px" }}>
          Click the <BsBookmarkPlus className="inline" /> on any story to easily
          add it to your reading list or a custom list that you can share.
        </p>
      </div>
    </div>
  );
};

export default StaffPicks;
