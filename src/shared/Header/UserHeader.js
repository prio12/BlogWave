import React, { useState } from "react";
import Logo from "../../Assests/Blogwave.png";
import SearchBar from "../../Pages/Home/usersHomePage/searchBar/SearchBar";
import { BsPencilSquare } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
import { PiBookmarksLight, PiSignOutThin } from "react-icons/pi";
import { FiUser } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOutUser } from "../../redux/thunk/userAuth";

const UserHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const userEmail = useSelector((state) => state?.user?.user?.email);
  const dispatch = useDispatch();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    dispatch(signOutUser())
  };

  const {pathname} = useLocation();
  const isWriterBlogPage = pathname === "/writeBlog"

  return (
    <div className="w-full flex items-center justify-between ps-0 pr-3 md:px-4">
      <div className="flex gap-3 items-center">
        <Link to='/'><img className="w-32 " src={Logo} alt="" /></Link>
        <div className="hidden md:flex">
          <SearchBar />
        </div>
        <AiOutlineSearch className="flex items-center md:hidden" />
      </div>
      <div className="flex items-center gap-3">
        {
          !isWriterBlogPage && <Link to='/writeBlog' className="flex items-center gap-3">
          <BsPencilSquare />
          <p>
            <small>Write</small>
          </p>
        </Link>
        }
        <div className="relative inline-block text-left">
          <button
            onClick={handleToggle}
            className="flex text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            <img
              src="https://source.unsplash.com/40x40/?portrait?4"
              alt=""
              className="w-8 h-8 rounded-full cursor-pointer"
            />
          </button>
          {isOpen && (
            // </div>
            <div className="absolute w-48 p-5 mt-1 right-0 bg-white border">
              <div>
                <Link to='/profile' className="flex mb-5 items-center gap-3">
                  <FiUser />
                  <p>
                    <small>Profile</small>
                  </p>
                </Link>
                <Link className="flex mb-3 items-center gap-3">
                  <PiBookmarksLight />
                  <p>
                    <small>Library</small>
                  </p>
                </Link>
                <div onClick={handleLogout} className="flex cursor-pointer gap-3 items-center">
                  <PiSignOutThin />
                  <p>
                    <small>Sign Out</small>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserHeader;
