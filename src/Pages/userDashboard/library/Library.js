import React, { useEffect, useState } from "react";
import StaffPicks from "../../Home/usersHomePage/staffPicksBlogs/StaffPicks";
import { fetchUserUpdatedData } from "../../../redux/thunk/userAuth";
import { useDispatch, useSelector } from "react-redux";

const Library = () => {
  const userUid = useSelector((state) => state?.user?.user?.uid);
  const dispatch = useDispatch();
  const [activeContent, setActiveContent] = useState("bookmarks");

  const handleToggle = (data) => {
    setActiveContent(data);
  };

  console.log(activeContent);

  useEffect(() => {
    dispatch(fetchUserUpdatedData(userUid));
  }, [dispatch, userUid]);
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
        </div>
      </div>
      <div className="md:block hidden col-span-1 ">
        <StaffPicks />
      </div>
    </div>
  );
};

export default Library;
