import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addPostToClap,
  deleteABLog,
  fetchAllBlogs,
  fetchSelectedBLogData,
  saveAsBookmarks,
  updateClapsCount,
} from '../redux/thunk/blogs';
import Loader from '../loading/Loader';
import { PiHandsClappingLight } from 'react-icons/pi';
import { FaRegComment } from 'react-icons/fa';
import { FaHandsClapping } from 'react-icons/fa6';
import { MdOutlineBookmarkAdd } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import { GrLinkPrevious } from 'react-icons/gr';
import { FiMoreHorizontal } from 'react-icons/fi';
import { fetchUserUpdatedData, getAllUsers } from '../redux/thunk/userAuth';
import { RxCross1 } from 'react-icons/rx';
import { BsFillBookmarkCheckFill } from 'react-icons/bs';
import EditBlogStory from './blog/editBlog/EditBlogStory';
import {
  DELETE_BLOG_FLAG,
  SET_UPDATE_SUCCESS_FLAG,
} from '../redux/actionTypes/actionTypes';
import ResponseField from './blog/responses/ResponseField';
import DOMPurify from 'dompurify';
import { CgProfile } from 'react-icons/cg';
import SkeletonLoader from '../loading/SkeletonLoader';

const BlogDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAllBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

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
  const [responseBarStatus, setResponseBarStatus] = useState(false);
  // console.log(responseBarStatus);
  useEffect(() => {
    dispatch(fetchUserUpdatedData(user));
  }, [dispatch, user]);
  useEffect(() => {
    if (updateSuccess) {
      navigate('/profile');
      dispatch({ type: SET_UPDATE_SUCCESS_FLAG, payload: false });
    }
  }, [dispatch, navigate, updateSuccess]);

  useEffect(() => {
    if (isDeleted) {
      navigate('/profile');
      dispatch({ type: DELETE_BLOG_FLAG, payload: false });
    }
  }, [dispatch, isDeleted, navigate]);
  const [isOpen, setIsOpen] = useState(false);
  const handleMoreOptionModal = (data) => {
    setIsOpen(!isOpen);
  };
  const handleBookmarks = () => {
    dispatch(
      saveAsBookmarks(
        { selectedBlogData: selectedBlogData },
        { userUid: user },
        { action: 'Bookmark' }
      )
    );
  };

  const handleRemoveBookmark = () => {
    dispatch(
      saveAsBookmarks(
        { selectedBlogData: selectedBlogData },
        { userUid: user },
        { action: 'RemoveBookmark' }
      )
    );
  };

  const handleClap = () => {
    dispatch(updateClapsCount(_id, user));
    dispatch(addPostToClap({ blog: selectedBlogData }, { userUid: user }));
  };

  const handleDeleteABLog = (_id) => {
    dispatch(deleteABLog(_id));
  };

  const handleVisitProfile = () => {
    // comparing currently loggedIn user.uid to selecedBlog author Uid
    if (user === userUid) {
      navigate('/profile');
    } else if (user !== userUid) {
      navigate(`/visitProfile/${userUid}`);
    }
  };

  if (!userData || isUpdateLoading) {
    return <SkeletonLoader count={3} />;
  }
  const bookmarks = userData?.bookmarks;

  if (!selectedBlogData || isLoading) {
    return <SkeletonLoader count={3} />;
  }

  if (isLoading) {
    return <SkeletonLoader count={3} />;
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
  const sanitizedDescription = DOMPurify.sanitize(description);
  const characterCount = sanitizedDescription.length;
  let readingTime;

  if (characterCount < 1000) {
    readingTime = <span>· 2 min read .</span>;
  } else if (characterCount > 1000 && characterCount < 1500) {
    readingTime = <span>· 3 min read .</span>;
  } else if (characterCount > 1500 && characterCount < 2000) {
    readingTime = <span>· 5 min read .</span>;
  } else if (characterCount > 2000 && characterCount < 3000) {
    readingTime = <span>· 7 min read .</span>;
  } else if (characterCount > 2000 && characterCount < 5000) {
    readingTime = <span>· 10 min read .</span>;
  }

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
                onClick={() => setResponseBarStatus(false)}
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
      <div className="w-full md:w-3/4 mx-auto">
        <h2 className="text-4xl font-extrabold my-3">{title}</h2>
        <div className="flex gap-2 items-center my-5">
          {authorImage ? (
            <img
              onClick={handleVisitProfile}
              src={authorImage}
              className="h-12 cursor-pointer w-12 rounded-full"
              alt=""
            />
          ) : (
            <CgProfile
              onClick={handleVisitProfile}
              title="Tap on to change your profile pic!"
              className="w-12 h-12 cursor-pointer"
            />
          )}
          <div>
            <h5
              onClick={handleVisitProfile}
              style={{ fontSize: '12px' }}
              className="font-bold cursor-pointer"
            >
              {author}
            </h5>
            <small style={{ fontSize: '10px' }} className="mr-3">
              {readingTime}
            </small>
            <small style={{ fontSize: '10px' }}>12th August</small>
          </div>
        </div>
        <div className="flex my-3 justify-between items-center">
          <div className="flex text-xs items-center gap-5">
            {/* <PiHandsClappingLight className="cursor:pointer "/><span>143</span> */}
            <div className="flex  items-center gap-1">
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
              <label
                htmlFor="response-drawer"
                onClick={() => setResponseBarStatus(true)}
                className="drawer-button"
              >
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
            <div className="relative ">
              {user === userUid && (
                <FiMoreHorizontal
                  onClick={handleMoreOptionModal}
                  title="More"
                  className={`cursor-pointer text-xl ${
                    responseBarStatus && 'hidden'
                  }`}
                />
              )}
              {isOpen && (
                <div
                  style={{ fontSize: '10px' }}
                  className={`absolute z-10 right-5 bg-white border shadow-lg  p-5 w-32}`}
                >
                  <label
                    htmlFor="my-drawer-4"
                    className="drawer-button font-bold cursor-pointer"
                  >
                    Edit
                  </label>
                  {/* <button
                    onClick={() => dispatch(deleteABLog(_id))}
                    style={{ fontSize: "10px" }}
                    className="btn btn-sm my-2"
                  >
                    Delete
                  </button> */}
                  <div
                    // onClick={() => dispatch(deleteABLog(_id))}
                    onClick={() => handleDeleteABLog(_id)}
                    className="my-3 cursor-pointer font-bold "
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
                    title="Remove Bookmarked!"
                    className="cursor-pointer"
                    onClick={handleRemoveBookmark}
                  />
                </div>
              ) : (
                <MdOutlineBookmarkAdd
                  title="Add to bookmark"
                  className={`cursor-pointer`}
                  onClick={handleBookmarks}
                />
              )}
            </div>
          </div>
        </div>
        <img src={image} style={{ height: '30%' }} alt="" />
        {/* <p className="my-5 border border-dark p-2">{description}</p> */}
        <div
          className="my-5 border border-dark p-2 font-serif" // Use Tailwind font-serif class
          dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
        />
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
