import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Recommended from "../RecommendedTopics/Recommended";
import { BsBookmarkPlus } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBlogs } from "../../../../redux/thunk/blogs";
import { getAllUsers } from "../../../../redux/thunk/userAuth";
import { CgProfile } from "react-icons/cg";

const StaffPicks = () => {
  const blogs = useSelector((state) => state?.blogs?.blogs);
  const currentUser = useSelector((state) => state?.user?.userData);
  const navigate = useNavigate();
  const location = useLocation();
  const {pathname} = location;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

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
        ?.filter((blog) => blog?.claps > 2)
        .slice(0, 3)
        .map((blog) => (
          <div className={`mb-5 ${pathname === "/staffPicksBlogs" ? "hidden" : "block"}`} key={blog?._id}>
            <div onClick={() => handleVisitProfile(blog?.userUid)} className="flex cursor-pointer  items-center gap-2">
              
              {
                blog?.authorImage ? <img
                alt=""
                className="w-5 h-5 border rounded-full dark:bg-gray-500 dark:border-gray-700"
                src={blog?.authorImage}
              /> : 
              <CgProfile
              title="Tap on to change your profile pic!"
              className="w-5 h-5 cursor-pointer"
            />
                
              }
              <h5 style={{ fontSize: "10px" }} className="font-semibold">{blog?.author}</h5>
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
     <div className="my-8">
     <Recommended />
     </div>
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
