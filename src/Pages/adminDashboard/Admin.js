import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserUpdatedData, getAllUsers } from "../../redux/thunk/userAuth";
import { fetchAllBlogs } from "../../redux/thunk/blogs";
import Blogs from "../../components/blog/Blogs";

const Admin = () => {
  const userUid = useSelector((state) => state?.user?.user?.uid);
  const allUsers = useSelector((state) => state?.user?.allUsers);
  console.log(allUsers);
  const allBlogs = useSelector((state) => state?.blogs?.blogs);
  console.log(allBlogs);
  const [activeContent, setActiveContent] = useState("users");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserUpdatedData(userUid));
  }, [dispatch, userUid]);

  useEffect(() => {
    dispatch(fetchAllBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  return (
    <div className="p-5 md:px-12">
      <div className="flex gap-5 items-center cursor-pointer text-xs">
        <p
          onClick={() => setActiveContent("users")}
          className={` ${activeContent === "users" && "underline"}`}
        >
          All Users
        </p>
        <p
          onClick={() => setActiveContent("blogs")}
          className={` ${activeContent === "blogs" && "underline"}`}
        >
          All Blogs
        </p>
      </div>
      <div>
        {activeContent === "users" && (
          <div className="my-5">
            {allUsers?.map((user) => (
              <div className="flex items-center mb-5 justify-between">
                <div className="flex items-center gap-5">
                  <img src={user?.profilePic} className="w-12 h-12" alt="" />
                  <p className="text-xs">{user?.name}</p>
                </div>
                <button
                  className="btn  btn-sm md:mb-0 lg:mb-0"
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
              </div>
            ))}
          </div>
        )}
        {activeContent === "blogs" && (
          <div className="my-5">
            {allBlogs?.map((blog) => <Blogs blog={blog}></Blogs>)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;