import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addClapping, deleteABLog, fetchSelectedBLogData } from "../redux/thunk/blogs";
import Loader from "../loading/Loader";
import { PiHandsClappingLight } from "react-icons/pi";
import { FaRegComment } from "react-icons/fa";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { GrLinkPrevious } from "react-icons/gr";
import { FiMoreHorizontal } from "react-icons/fi";
import { fetchUserUpdatedData } from "../redux/thunk/userAuth";
import EditBlogStory from "./blog/editBlog/EditBlogStory";
import { DELETE_A_BLOG, DELETE_BLOG_FLAG, SET_UPDATE_SUCCESS_FLAG } from "../redux/actionTypes/actionTypes";

const BlogDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  useEffect(() => {
    dispatch(fetchSelectedBLogData(id));
  }, [dispatch, id]);

  const selectedBlogData = useSelector((state) => state?.blogs?.selectedBlog);
  const user = useSelector((state) => state?.user?.user?.uid);
  const isLoading = useSelector((state) => state?.blogs?.isLoading);
  const updateSuccess = useSelector((state) => state?.blogs?.updateSuccess);
  const claps = useSelector((state) => state?.blogs?.claps);
  const isDeleted = useSelector((state) => state?.blogs?.isDeleted)
  console.log(isDeleted);
  useEffect(() => {
    dispatch(fetchUserUpdatedData(user));
  }, [dispatch, user]);
  useEffect(() =>{
    if (updateSuccess) {
      navigate('/profile')
      dispatch({type:SET_UPDATE_SUCCESS_FLAG, payload:false})
    }
  },[dispatch,navigate,updateSuccess])

  useEffect(() =>{
     if (isDeleted) {
    navigate('/profile')
    dispatch({type:DELETE_BLOG_FLAG, payload:false})
  }
  },[dispatch,isDeleted,navigate])
  const [isOpen, setIsOpen] = useState(false);
  const handleMoreOptionModal = (data) => {
    setIsOpen(!isOpen);
  };
  if (!selectedBlogData || isLoading) {
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
  } = selectedBlogData;
  const handleNavigate = () => {
    navigate(-1);
  };

 
 

const handleClap = () =>{
  dispatch(addClapping())
}

  return (
    <div className="p-5">
      {/* sidebar */}
      <div className="drawer drawer-end">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          {/* <label
            htmlFor="my-drawer-4"
            className="drawer-button btn btn-primary"
          >
            Open drawer
          </label> */}
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          {/* <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            <li>
              <a>Sidebar Item 1</a>
            </li>
            <li>
              <a>Sidebar Item 2</a>
            </li>
          </ul> */}
          <div className="menu p-4 w-3/4 md:w-2/4 min-h-full bg-base-100 ">
            <EditBlogStory selectedBlogData={selectedBlogData}></EditBlogStory>
          </div>
        </div>
      </div>
      {/* sideBar */}
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
              <PiHandsClappingLight className="cursor-pointer text-xl" title="Clap!" onClick={handleClap} />
              <span>{claps}</span>
            </div>
            {/* <FaRegComment/><span>5</span> */}
            <div className="flex items-center gap-1">
              <FaRegComment className="cursor-pointer text-xl" title="Response.."/>
              <span>5</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              {user === userUid && (
                <FiMoreHorizontal
                  onClick={handleMoreOptionModal}
                  title="More"
                  className="cursor-pointer text-xl"
                />
              )}
              {isOpen && (
                <div
                  style={{ fontSize: "10px" }}
                  className="absolute z-10 right-5 bg-white border shadow-lg  p-5 w-32"
                >
                  <label
                    style={{ fontSize: "10px" }}
                    htmlFor="my-drawer-4"
                    className="drawer-button btn btn-sm"
                  >
                    Edit Story
                  </label>
                  <button
                    onClick={() => dispatch(deleteABLog(_id))}
                    style={{ fontSize: "10px" }}
                    className="btn btn-sm my-2"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
            <MdOutlineBookmarkAdd
              title="Add to bookmark"
              className="cursor-pointer"
            />
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
