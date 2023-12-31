import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { deleteUserAndBlogs } from "../../redux/thunk/userAuth";
import DOMPurify from "dompurify";
import { CgProfile } from "react-icons/cg";

const Blogs = ({ blog }) => {
  const user = useSelector((state) => state?.user?.user?.uid);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const sanitizedDescription = DOMPurify.sanitize(blog?.description);
  const characterCount = sanitizedDescription.length;
  const handleGuestUser = () => {
    if (!user) {
      navigate("/signUpMethods");
    }
  };

  let readingTime;

  if ( characterCount < 1000) {
    readingTime = <span>· 2 min read .</span>
  }
  else if ( characterCount > 1000 && characterCount <1500) {
    readingTime = <span>· 3 min read .</span>
  }
  else if ( characterCount > 1500 && characterCount <2000) {
    readingTime = <span>· 5 min read .</span>
  }
  else if ( characterCount > 2000  && characterCount <3000) {
    readingTime = <span>· 7 min read .</span>
  }
  else if ( characterCount > 2000 && characterCount <5000) {
    readingTime = <span>· 10 min read .</span>
  }


  return (
    <div onClick={handleGuestUser} className="cursor-pointer">
      <div className="flex items-center gap-5 md:gap-12 mb-8">
        {/* blog details div */}
        <div className="w-3/4">
          {pathname !== "/profile" && (
            <div className="flex items-center mb-3  gap-2">
              {/* avatar */}
             
              {
                blog?.authorImage ?  <img
                alt=""
                className="w-6 h-6 border rounded-full dark:bg-gray-500 dark:border-gray-700"
                src={blog?.authorImage}
              />
                :
                <CgProfile
              className="w-6 h-6 cursor-pointer"
            />
              }
              <h5 style={{ fontSize: "12px" }} className="font-bold">{blog?.author}</h5>
            </div>
          )}
          <Link to={`/blogDetails/${blog?._id}`}>
            {pathname === "/admin" && (
              <div className="flex items-center gap-2">
                
                {
                  blog?.authorImage ? <img src={blog?.authorImage} className="w-8 h-8" alt="" />
                  :
                  <CgProfile
              className="w-8 h-8 cursor-pointer"
            />
                }
                <p className="text-xs font-semibold">{blog?.author}</p>
              </div>
            )}
            <h4 className="font-extrabold  mb-3">{blog?.title}</h4>
            {/* <p style={{ fontSize: "12px" }}>{blog?.description?.slice(0,200)+"..."}</p> */}
            <div className="text-sm hidden md:block lg:block"
              dangerouslySetInnerHTML={{
                __html: sanitizedDescription.slice(0, 200) + "...",
              }}
            />

            <p className="text-sm mt-2">
              <small>
                {blog
                  ? new Date(blog.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : ""}{" "}
                {readingTime} <span className="ms-5">{blog?.category}</span>
              </small>
            </p>
          </Link>
          {pathname === "/admin" && (
            <button
              onClick={() =>
                dispatch(deleteUserAndBlogs({ blog, type: "blog" }))
              }
              className="btn my-2 btn-sm md:mb-0 lg:mb-0"
              style={{
                backgroundColor: "red",
                color: "white",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#1A8917",
                  textTransform: "none",
                },
              }}
            >
              Delete
            </button>
          )}
        </div>
        {/* blog image div */}
        <div className="w-1/4">
          <img src={blog?.image} className="h-[85px] w-[85px]" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Blogs;
