import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addPostToClap,
  deleteABLog,
  fetchSelectedBLogData,
  saveAsBookmarks,
  updateClapsCount,
} from "../redux/thunk/blogs";
import Loader from "../loading/Loader";
import { PiHandsClappingLight } from "react-icons/pi";
import { FaRegComment } from "react-icons/fa";
import { FaHandsClapping } from "react-icons/fa6";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { GrLinkPrevious } from "react-icons/gr";
import { FiMoreHorizontal } from "react-icons/fi";
import { fetchUserUpdatedData } from "../redux/thunk/userAuth";
import { RxCross1 } from "react-icons/rx";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import EditBlogStory from "./blog/editBlog/EditBlogStory";
import {
  DELETE_BLOG_FLAG,
  SET_UPDATE_SUCCESS_FLAG,
} from "../redux/actionTypes/actionTypes";
import ResponseField from "./blog/responses/ResponseField";

const BlogDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  useEffect(() => {
    dispatch(fetchSelectedBLogData(id));
  }, [dispatch, id]);

  const selectedBlogData = useSelector((state) => state?.blogs?.selectedBlog);
  const responses = selectedBlogData?.responses;
  const userData = useSelector((state) => state?.user?.userData);
  const isUpdateLoading = useSelector((state) => state?.user?.isUpdateLoading);
  const user = useSelector((state) => state?.user?.user?.uid);
  const isLoading = useSelector((state) => state?.blogs?.isLoading);
  const updateSuccess = useSelector((state) => state?.blogs?.updateSuccess);
  // const claps = useSelector((state) => state?.blogs?.claps);
  const isDeleted = useSelector((state) => state?.blogs?.isDeleted);
  const [responseBarStatus,setResponseBarStatus] = useState(false);
  console.log(responseBarStatus);
  useEffect(() => {
    dispatch(fetchUserUpdatedData(user));
  }, [dispatch, user]);
  useEffect(() => {
    if (updateSuccess) {
      navigate("/profile");
      dispatch({ type: SET_UPDATE_SUCCESS_FLAG, payload: false });
    }
  }, [dispatch, navigate, updateSuccess]);

  useEffect(() => {
    if (isDeleted) {
      navigate("/profile");
      dispatch({ type: DELETE_BLOG_FLAG, payload: false });
    }
  }, [dispatch, isDeleted, navigate]);
  const [isOpen, setIsOpen] = useState(false);
  const handleMoreOptionModal = (data) => {
    setIsOpen(!isOpen);
  };
  const handleBookmarks = () => {
    dispatch(
      saveAsBookmarks({ selectedBlogData: selectedBlogData }, { userUid: user })
    );
    alert("Added to Bookmarks!");
  };

  const handleClap = () => {
    // onClick={() => dispatch(updateClapsCount(_id, userUid))}
    dispatch(updateClapsCount(_id, user));
    dispatch(addPostToClap({ blog: selectedBlogData }, { userUid: user }));
  };

  if (!userData || isUpdateLoading) {
    return <Loader />;
  }
  const bookmarks = userData?.bookmarks;

  if (!selectedBlogData || isLoading) {
    return <Loader />;
  }

  if (isLoading) {
    return <Loader />;
  }

  const {
    _id,
    author,
    authorImage,
    title,
    description,
    category,
    date,
    image,
    userUid,
    claps,
    likedBy,
  } = selectedBlogData;
  const handleNavigate = () => {
    navigate(-1);
  };
  // console.log(user, userUid);
  return (
    <div className="p-5 ">
      {/* sidebar */}
      <div className="drawer ">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content"></div>
        <div className="drawer-side">
          <div className="menu p-4 w-3/4 md:w-1/3 min-h-full bg-base-100 ">
            <EditBlogStory selectedBlogData={selectedBlogData}></EditBlogStory>
          </div>
        </div>
      </div>
      {/* sideBar */}

      {/* responseSideBar */}
      <div className="drawer drawer-end  ">
        <input id="response-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">{/* Page content here */}</div>
        <div className="drawer-side ">
          <div className="menu p-6 w-3/4  md:w-1/3 min-h-full bg-base-100 ">
            <div className="flex items-center justify-between">
              {/* <h4 className="font-bold ">Responses ({responses?.length})</h4> */}
              {responses && (
                <h4 className="font-bold ">Responses ({responses?.length})</h4>
              )}
              {!responses && <h4 className="font-bold ">Responses (0)</h4>}
              <label
                htmlFor="response-drawer"
                aria-label="close sidebar"
                className="drawer-overlay cursor-pointer"
                onClick={() =>setResponseBarStatus(false)}
              >
                <RxCross1 />
              </label>
            </div>
            <div>
              <ResponseField />
            </div>
          </div>
        </div>
      </div>
      {/* responseSideBar */}
      <div className="w-full md:w-1/2 mx-auto">
        <h2 className="text-4xl font-extrabold my-3">{title}</h2>
        <div className="flex gap-2 items-center my-3">
          <img src={authorImage} className="h-12 w-12" alt="" />
          <div>
            <h5 style={{ fontSize: "12px" }} className="font-semibold">
              {author}
            </h5>
            <small style={{ fontSize: "10px" }} className="mr-3">
              7 min read
            </small>
            <small style={{ fontSize: "10px" }}>12th August</small>
          </div>
        </div>
        <div className="flex my-3 justify-between items-center">
          <div className="flex text-xs items-center gap-5">
            {/* <PiHandsClappingLight className="cursor:pointer "/><span>143</span> */}
            <div className="flex  items-center gap-1">
              {/* {user === userUid ? (
                <FaHandsClapping className="cursor-pointer text-xl" />
              ) : likedBy?.find((us) => us === userUid) ? (
                <FaHandsClapping
                  className="cursor-pointer text-xl"
                  title="Already Clapped!"
                />
              ) : (
                <PiHandsClappingLight
                  className="cursor-pointer text-xl"
                  title="Clap!"
                  onClick={handleClap}
                />
              )} */}
              {/* new Logic */}
              {user === userUid ? (
                <FaHandsClapping
                  className="cursor-pointer text-xl"
                  title="You can't clap your own post!"
                />
              ) : likedBy?.find((us) => us === user) ? (
                <FaHandsClapping
                  className="cursor-pointer text-xl"
                  title="Already Clapped!"
                />
              ) : (
                <PiHandsClappingLight
                  className="cursor-pointer text-xl"
                  title="Clap!"
                  onClick={handleClap}
                />
              )}

              <span>{claps}</span>
            </div>
            {/* <FaRegComment/><span>5</span> */}
            <div className="flex items-center gap-1 ">
              <label htmlFor="response-drawer" onClick={() => setResponseBarStatus(true)} className="drawer-button">
                <FaRegComment
                  className="cursor-pointer text-xl"
                  title="Response.."
                />
              </label>
              <span>
                {responses && (
                  <h4 className="font-bold ">{responses?.length}</h4>
                )}
                {!responses && <h4 className="font-bold ">0</h4>}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              {user === userUid && (
                <FiMoreHorizontal
                  onClick={handleMoreOptionModal}
                  title="More"
                  className={`cursor-pointer text-xl ${responseBarStatus && "hidden"}`}
                />
              )}
              {isOpen && (
                <div
                  style={{ fontSize: "10px" }}
                  className={`absolute z-10 right-5 bg-white border shadow-lg  p-5 w-32}`}
                >
                  <label
                    style={{ fontSize: "10px" }}
                    htmlFor="my-drawer-4"
                    className="drawer-button cursor-pointer"
                  >
                    Edit Story
                  </label>
                  {/* <button
                    onClick={() => dispatch(deleteABLog(_id))}
                    style={{ fontSize: "10px" }}
                    className="btn btn-sm my-2"
                  >
                    Delete
                  </button> */}
                  <div
                    onClick={() => dispatch(deleteABLog(_id))}
                    style={{ fontSize: "10px" }}
                    className="my-2 cursor-pointer"
                  >
                    <p>Delete</p>
                  </div>
                </div>
              )}
            </div>
            <div>
              {bookmarks?.find((blog) => blog._id === _id) ? (
                <div>
                  <BsFillBookmarkCheckFill
                    title="Already Bookmarked!"
                    className="cursor-not-allowed"
                  />
                </div>
              ) : (
                <MdOutlineBookmarkAdd
                  title="Add to bookmark"
                  className={`cursor-pointer  ${responseBarStatus && "hidden"}`}
                  onClick={handleBookmarks}
                />
              )}
            </div>
          </div>
        </div>
        <img src={image} style={{ height: "50%" }} alt="" />
        <p className="my-5 border border-dark p-2">{description}</p>
        <GrLinkPrevious
          className="cursor-pointer"
          onClick={handleNavigate}
          title="See more blogs"
        />
      </div>
    </div>
  );
};

export default BlogDetails;
