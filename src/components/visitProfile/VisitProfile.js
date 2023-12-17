import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserUpdatedData, getAllUsers } from "../../redux/thunk/userAuth";
import { FaRegFaceSadTear } from "react-icons/fa6";
import { fetchAllBlogs, fetchUserAllBlogs } from "../../redux/thunk/blogs";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Loader from "../../loading/Loader";
import Blogs from "../blog/Blogs";

const VisitProfile = () => {
  const userUid = useSelector((state) => state?.user?.user?.uid);
  const selectedProfile = useSelector((state) => state?.user?.selectedProfile);
  const userBLogs = useSelector((state) => state?.blogs?.userBlogs);
  const isLoading = useSelector((state) => state?.blogs?.isLoading);
  const allUser = useSelector((state) => state?.user?.allUsers);
  const dispatch = useDispatch();
  const location = useLocation();
  console.log(location?.state?.from);
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [activeContent, setActiveContent] = useState("home");

  useEffect(() => {
    setUser(allUser?.find((userDetails) => userDetails?.uid === id));
  }, [selectedProfile, location, allUser, id]);

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

  const handleVisitProfileFromFollowers = () => {
    navigate(`/followers/${user?.uid}`);
  };

  const handleVisitProfileFromFollowing = () => {
    navigate(`/following/${user?.uid}`);
  };

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
                {user?.about ? (
                  <p className="font-semibold">{user?.about}</p>
                ) : (
                  <div>
                    <FaRegFaceSadTear className="text-5xl my-2" />
                    <p className="text-xs font-semibold">
                      Sorry! {user?.name} has not shared anything about him!
                    </p>
                  </div>
                )}
              </div>
              <div className="text-xs text-[#1A8917] cursor-pointer flex gap-5 my-5">
                {user?.followers?.length ? (
                  <div>
                    {user?.followers?.length > 1 ? (
                      <p
                        onClick={handleVisitProfileFromFollowers}
                        className=" cursor-pointer"
                      >
                        {" "}
                        {user?.followers?.length} Followers
                      </p>
                    ) : (
                      <p
                        onClick={handleVisitProfileFromFollowers}
                        className="cursor-pointer"
                      >
                        {user?.followers?.length} Follower
                      </p>
                    )}
                  </div>
                ) : (
                  <div>
                    <p
                      style={{ fontSize: "10px" }}
                      className="cursor-not-allowed"
                    >
                      0 Followers
                    </p>
                  </div>
                )}
                <p className="text-black">|</p>
                {user?.following?.length ? (
                  <p
                    onClick={handleVisitProfileFromFollowing}
                    className="cursor-pointer"
                  >
                    {user?.following?.length} Following
                  </p>
                ) : (
                  <p
                    className=" cursor-not-allowed"
                  >
                    0 Following
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex md:block gap-3 items-center">
        <div className="mb-3 ">
          <img src={user?.profilePic} className="w-16 h-16" alt="" />
        </div>
        {/* {user?.followers?.length > 0 && (
          <Link to={`/followers/${user?.uid}`}>
            <p className="text-xs text-[#6b6b6b] font-semibold cursor-pointer">
              {user?.followers?.length} Followers
            </p>
          </Link>
        )} */}
        <div className="flex items-center gap-2">
          {user?.followers?.length ? (
            <div>
              {user?.followers?.length > 1 ? (
                <p
                  onClick={handleVisitProfileFromFollowers}
                  style={{ fontSize: "10px" }}
                  className="text-[#6b6b6b] font-semibold cursor-pointer"
                >
                  {" "}
                  {user?.followers?.length} Followers
                </p>
              ) : (
                <p
                  onClick={handleVisitProfileFromFollowers}
                  style={{ fontSize: "10px" }}
                  className="text-[#6b6b6b] font-semibold cursor-pointer"
                >
                  {user?.followers?.length} Follower
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
          {user?.following?.length ? (
            <p
              onClick={handleVisitProfileFromFollowing}
              className="text-[#6b6b6b] font-semibold cursor-pointer"
              style={{ fontSize: "10px" }}
            >
              {user?.following?.length} Following
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
        <div className="flex gap-2 items-center">
          <p className="font-bold">{user?.name}</p>
        </div>
      </div>
    </div>
  );
};

export default VisitProfile;
