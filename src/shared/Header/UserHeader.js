import React, { useEffect, useState } from 'react';
import Logo from '../../Assests/Blogwave.png';
import SearchBar from '../../Pages/Home/usersHomePage/searchBar/SearchBar';
import { BsPencilSquare } from 'react-icons/bs';
import { AiOutlineSearch } from 'react-icons/ai';
import { PiBookmarksLight, PiSignOutThin } from 'react-icons/pi';
import { FiUser } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setNotificationStatus, signOutUser } from '../../redux/thunk/userAuth';
import Loader from '../../loading/Loader';
import { CgProfile } from 'react-icons/cg';
import { IoNotificationsOutline } from 'react-icons/io5';
import { IoNotificationsSharp } from 'react-icons/io5';
import { RiAdminLine } from 'react-icons/ri';
import SkeletonLoader from '../../loading/SkeletonLoader';

const UserHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [unRead, setUnRead] = useState([]);
  const userDetails = useSelector((state) => state?.user?.userData);

  const isUpdateLoading = useSelector((state) => state?.user?.isUpdateLoading);
  const user = useSelector((state) => state?.user?.user?.uid);

  const dispatch = useDispatch();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    dispatch(signOutUser());
  };

  const { pathname } = useLocation();
  const isWriterBlogPage = pathname === '/writeBlog';

  useEffect(() => {
    if (userDetails && userDetails?.notifications) {
      const unreadNotifications = userDetails?.notifications.filter(
        (notification) => notification.status === 'unread'
      );
      setUnRead(unreadNotifications);
    }
  }, [userDetails]); // Only run the effect when userDetails changes

  if (!userDetails || isUpdateLoading) {
    return <SkeletonLoader count={3} />;
  }

  const { profilePic } = userDetails;

  return (
    <div
      style={{ borderBottom: '1px solid #F2F2F2' }}
      className="w-full flex items-center justify-between ps-0 pr-3 md:px-4"
    >
      <div className="flex gap-3 items-center">
        <Link to="/">
          <img className="w-36 md:w-32 " src={Logo} alt="" />
        </Link>
        <div className="hidden md:flex">
          <SearchBar />
        </div>
        <Link to="/smallSearchBar">
          <AiOutlineSearch className="flex items-center md:hidden" />
        </Link>
      </div>
      <div className="flex items-center gap-3">
        {!isWriterBlogPage && (
          <Link to="/writeBlog" className="flex items-center gap-3">
            <BsPencilSquare />
            <p className="md:block hidden">
              <small>Write</small>
            </p>
          </Link>
        )}
        {pathname === '/notifications' ? (
          <IoNotificationsSharp />
        ) : (
          // <Link  onClick={() => dispatch(setNotificationStatus(user))} to="/notifications">
          //   <IoNotificationsOutline />
          // </Link>

          <div>
            {unRead?.length ? (
              <Link
                onClick={() => dispatch(setNotificationStatus(user))}
                to="/notifications"
              >
                <div class="relative">
                  <IoNotificationsOutline className="h-6 w-6" />
                  <div class="absolute top-0 right-0 bg-[#1A8917] text-white rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold">
                    {unRead.length}
                  </div>
                </div>
              </Link>
            ) : (
              <Link to="/notifications">
                <IoNotificationsOutline />
              </Link>
            )}
          </div>
        )}
        <div className="relative inline-block text-left">
          <button
            onClick={handleToggle}
            className="flex text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            {profilePic ? (
              <img
                src={profilePic}
                alt=""
                className="w-8 h-8 rounded-full cursor-pointer"
              />
            ) : (
              <CgProfile className="w-8 h-8" />
            )}
          </button>
          {isOpen && (
            // </div>
            <div className="absolute w-48 p-5 mt-1 right-0 bg-base-100 z-[500] border">
              <div>
                <Link to="/profile" className="flex mb-5 items-center gap-3">
                  <FiUser />
                  <p>
                    <small>Profile</small>
                  </p>
                </Link>
                <Link className="flex mb-3 items-center gap-3">
                  <PiBookmarksLight />
                  <Link to="/library">
                    <p>
                      <small>Library</small>
                    </p>
                  </Link>
                </Link>
                {userDetails?.role === 'admin' && (
                  <Link className="flex mb-3 items-center gap-3">
                    <RiAdminLine />
                    <Link to="/admin">
                      <p>
                        <small>Admin</small>
                      </p>
                    </Link>
                  </Link>
                )}
                <div
                  onClick={handleLogout}
                  className="flex cursor-pointer gap-3 items-center"
                >
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
