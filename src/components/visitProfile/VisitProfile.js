import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserUpdatedData, getAllUsers } from "../../redux/thunk/userAuth";
import { FaRegFaceSadTear } from "react-icons/fa6";
import { fetchAllBlogs, fetchUserAllBlogs } from "../../redux/thunk/blogs";
import { Link, useParams } from "react-router-dom";
import Loader from "../../loading/Loader";
import Blogs from "../blog/Blogs";

const VisitProfile = () => {
  const userUid = useSelector((state) => state?.user?.user?.uid);
  const selectedProfile = useSelector((state) => state?.user?.selectedProfile);
  const userBLogs = useSelector((state) => state?.blogs?.userBlogs);
  const isLoading = useSelector((state) => state?.blogs?.isLoading);
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log(id);

  const [user, setUser] = useState(null);
  const [activeContent, setActiveContent] = useState("home");

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    // console.log(storedUser);
    setUser(storedUser);
  }, [selectedProfile]);

  //   console.log("user",user);
  useEffect(() => {
    dispatch(fetchUserUpdatedData(userUid));
  }, [dispatch, userUid]);

  useEffect(() => {
    dispatch(fetchAllBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const toggleContent = (content) => {
    setActiveContent(content);
  };

  let content;

  useEffect(() => {
    dispatch(fetchUserAllBlogs(id));
  }, [dispatch, id]);

  if (!userBLogs.length) {
    content = (
      <div className="text-center">
        <p>You have not written any blog!</p>
        <Link
          to="/writeBlog"
          style={{ fontSize: "12px" }}
          className="text-[#1A8917] "
        >
          Write now?
        </Link>
      </div>
    );
  }

  if (isLoading) {
    content = <Loader />;
  }

  if (userBLogs.length) {
    content = userBLogs.map((blog) => (
      <Blogs key={blog?._id} blog={blog}></Blogs>
    ));
  }

  return (
    <div className=" flex md:flex-row flex-col-reverse  gap-3 p-5 md:px-12 ">
      <div className="md:w-3/4 w-full">
        <div>
          <h3 className="text-4xl hidden md:block font-bold">{user?.name}</h3>
        </div>
        <div style={{ fontSize: "12px" }} className="flex my-7 gap-7">
          <p
            style={{ cursor: "pointer" }}
            className={` ${activeContent === "home" && "underline"}`}
            onClick={() => toggleContent("home")}
          >
            Home
          </p>
          <p
            className={`${activeContent === "about" && "underline"}`}
            style={{ cursor: "pointer" }}
            onClick={() => toggleContent("about")}
          >
            About
          </p>
        </div>
        <div>
          {activeContent === "home" && <div>{content}</div>}
          {activeContent === "about" && (
            <div className="border-b-2 border-black">
              <div className=" md:border-r-2 text-justify pr-2 text-xs border-r-0 w-full">
                {user?.about ? <p className="font-semibold">{user?.about}</p> : 
                    <div>
                    <FaRegFaceSadTear className="text-5xl my-2" />
                     <p className="text-xs font-semibold">Sorry! {user?.name} has not shared anything about him!</p>
                    </div>}
              </div>
              <div className="text-xs text-[#1A8917] cursor-pointer flex gap-5 my-5">
                <p>204K Followers</p>
                <p className="text-black">.</p>
                <p>204K Followers</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex md:block gap-3 items-center">
        <div className="mb-3 ">
          <img src={user?.profilePic} className="w-16 h-16" alt="" />
        </div>
        <div className="flex gap-2 items-center">
          <p className="font-bold">{user?.name}</p>
        </div>
      </div>
    </div>
  );
};

export default VisitProfile;
