import React, { useEffect, useState } from "react";
import StaffPicks from "../../Home/usersHomePage/staffPicksBlogs/StaffPicks";
import { fetchUserUpdatedData } from "../../../redux/thunk/userAuth";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../loading/Loader";
import Blogs from "../../../components/blog/Blogs";
import UserAbout from "../profile/UserAbout";

const Library = () => {
  const userUid = useSelector((state) => state?.user?.user?.uid);
  const userData = useSelector((state) => state?.user?.userData)
  const clapped = userData?.clapped;
  const isLoading = useSelector((state) => state?.blogs?.isLoading)
  const isUpdateLoading = useSelector((state) => state?.user?.isUpdateLoading)


  

  const dispatch = useDispatch();
  const [activeContent, setActiveContent] = useState("bookmarks");

  const handleToggle = (data) => {
    setActiveContent(data);
  };


  useEffect(() => {
    dispatch(fetchUserUpdatedData(userUid));
  }, [dispatch, userUid]);

  let content;
  let clappedContent;

  if (!userData || isUpdateLoading) {
    content = <Loader/>
  }

  const bookmarks = userData?.bookmarks;


  if (!bookmarks || !bookmarks.length) {
    content = <p className="text-xs text-center py-5">You have not bookmarked any post!</p>
  }

  if (isLoading) {
    content = <Loader/>
  }

  if (bookmarks?.length) {
    content = bookmarks.map((blog) => <Blogs blog={blog} key={blog._id}></Blogs>)
  }

  if (!clapped || !clapped.length) {
    clappedContent = <p className="text-xs text-center py-5">You have not clapped any post!</p>
  }

  if (clapped && clapped.length) {
    clappedContent = clapped.map((blog) => <Blogs blog={blog} key={blog._id}></Blogs>)
  }

  return (
    <div className="px-8  md:px-12 grid grid-cols-1 md:grid-cols-3 gap-5">
      <div className="md:col-span-2">
        <h2 className="text-3xl font-bold">Your library</h2>
        <div>
          <div className="flex gap-5 items-center cursor-pointer my-5 ms-1">
            <p onClick={() => handleToggle("bookmarks")}>
              <small
                className={` ${
                  activeContent === "bookmarks"
                    && "underline"
                     
                }`}
              >
                Bookmarks
              </small>
            </p>
            <p onClick={() => handleToggle("clapped")}>
              <small
                className={` ${
                  activeContent === "clapped"
                    && "underline"
                     
                }`}
              >
                Clapped
              </small>
            </p>
          </div>
          <div>
          {
                activeContent === 'bookmarks' && (
                    <div>
                      {content}
                    </div>
                )
            }
            {
                activeContent === 'clapped' && (
                    <div>
                        {clappedContent}
                    </div>
                )
            }
          </div>
        </div>
      </div>
      <div className="md:block hidden col-span-1 ">
        <StaffPicks />
      </div>
    </div>
  );
};

export default Library;
