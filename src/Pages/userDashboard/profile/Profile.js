import React, { useEffect, useRef, useState } from "react";
import { MdEdit } from "react-icons/md";
import ProfilePicModal from "../modal/ProfilePicModal";
import { useDispatch, useSelector } from "react-redux";
import UserNameModal from "../modal/UserNameModal";
import UserAbout from "./UserAbout";
import Loader from "../../../loading/Loader";
import {
  fetchUserUpdatedData,
  getAllUsers,
} from "../../../redux/thunk/userAuth";
import { CgProfile } from "react-icons/cg";
import { fetchUserAllBlogs } from "../../../redux/thunk/blogs";
import { Link, useNavigate } from "react-router-dom";
import Blogs from "../../../components/blog/Blogs";

const Profile = () => {
  const userDetails = useSelector((state) => state?.user?.userData);
  const isUpdateLoading = useSelector((state) => state?.user?.isUpdateLoading);
  const userUid = useSelector((state) => state?.user?.user?.uid);
  const userBLogs = useSelector((state) => state?.blogs?.userBlogs);
  const isLoading = useSelector((state) => state?.blogs?.isLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUserUpdatedData(userUid));
  }, [dispatch, userUid]);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchUserAllBlogs(userUid));
  }, [dispatch, userUid]);

  const handleNavigateToFollowers = (event) => {
    // event.stopPropagation();
    console.log("Navigating with state");
    navigate(`/followers/${userDetails?.uid}`, { state: { from: "/profile" } });
  };

  const handleNavigateToFollowing = () => {
    navigate(`/following/${userDetails?.uid}`, { state: { from: "/profile" } });
  };
  const [activeContent, setActiveContent] = useState("home");
  // const textareaRef = useRef();

  const toggleContent = (content) => {
    setActiveContent(content);
  };
  // console.log(image);
  const openImageModal = () => {
    document.getElementById("profile_pic_modal").showModal();
  };

  const openNameModal = () => {
    document.getElementById("user_name").showModal();
  };

  let content;

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

  if (!userDetails || isUpdateLoading) {
    return <Loader />;
  }

  const { profilePic, name, followers, following } = userDetails;

  return (
    <div className=" flex md:flex-row flex-col-reverse  gap-3 p-5 md:px-12 ">
      <div className="w-3/4">
        <div>
          <h3 className="text-4xl hidden md:block font-bold">{name}</h3>
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
            <div>
              <UserAbout />
            </div>
          )}
        </div>
      </div>
      <div className="flex md:block gap-3  items-center">
        <div className="mb-3 flex items-center">
          {profilePic ? (
            <img
              onClick={openImageModal}
              title="Tap on to change your profile pic!"
              alt=""
              className="w-16 h-16 border cursor-pointer rounded-full dark:bg-gray-500 dark:border-gray-700"
              src={profilePic}
            />
          ) : (
            <CgProfile
              onClick={openImageModal}
              title="Tap on to change your profile pic!"
              className="w-16 h-16 cursor-pointer"
            />
          )}
        </div>
        
        <div className="flex gap-2 items-center">
          <p className="font-bold">{name}</p>
          <MdEdit className="cursor-pointer" onClick={openNameModal} />
        </div>
        <div className="flex items-center gap-2">
          {followers?.length ? (
            <div>
              {followers?.length > 1 ? (
                <p
                  onClick={handleNavigateToFollowers}
                  style={{ fontSize: "10px" }}
                  className="text-[#6b6b6b] font-semibold cursor-pointer"
                >
                  {" "}
                  {followers?.length} Followers
                </p>
              ) : (
                <p
                  onClick={handleNavigateToFollowers}
                  style={{ fontSize: "10px" }}
                  className="text-[#6b6b6b] font-semibold cursor-pointer"
                >
                  {followers?.length} Follower
                </p>
              )}
            </div>
          ) : (
            <div>
              <p
                style={{ fontSize: "10px" }}
                className="text-[#6b6b6b] font-semibold cursor-not-allowed"
              >
                0 Followers
              </p>
            </div>
          )}
          <p>|</p>
          {following?.length ? (
            <p
              onClick={handleNavigateToFollowing}
              className="text-[#6b6b6b] font-semibold cursor-pointer"
              style={{ fontSize: "10px" }}
            >
              {following?.length} Following
            </p>
          ) : (
            <p
              style={{ fontSize: "10px" }}
              className="text-[#6b6b6b] font-semibold cursor-not-allowed"
            >
              0 Following
            </p>
          )}
        </div>
        <ProfilePicModal />
        <UserNameModal />
      </div>
    </div>
  );
};

export default Profile;
