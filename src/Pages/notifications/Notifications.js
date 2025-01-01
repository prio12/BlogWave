import React, { useEffect, useState } from 'react';
import StaffPicks from '../Home/usersHomePage/staffPicksBlogs/StaffPicks';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUserUpdatedData,
  follow,
  getAllUsers,
} from '../../redux/thunk/userAuth';
import { fetchAllBlogs } from '../../redux/thunk/blogs';
import { Link, useLocation } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import FollowingSuggestions from '../suggestions/FollowingSuggestions';
import Loader from '../../loading/Loader';
import SkeletonLoader from '../../loading/SkeletonLoader';

const Notifications = () => {
  const userDetails = useSelector((state) => state?.user?.userData);
  const userUid = useSelector((state) => state?.user?.user?.uid);
  const allUsers = useSelector((state) => state?.user?.allUsers);
  const isLoading = useSelector((state) => state?.user?.isUpdateLoading);
  const dispatch = useDispatch();
  const [activeContent, setActiveContent] = useState('notifications');
  const [toFollow, setToFollow] = useState([]);
  const toggleContent = (content) => {
    setActiveContent(content);
  };

  useEffect(() => {
    dispatch(fetchUserUpdatedData(userUid));
  }, [dispatch, userUid]);

  useEffect(() => {
    dispatch(fetchAllBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  //handling follow and rendering who to follow

  useEffect(() => {
    const users = allUsers.filter(
      (user) =>
        user?.uid !== null &&
        user?.uid !== userUid &&
        !userDetails?.following?.some(
          (following) => following?.uid === user.uid
        )
    );
    setToFollow(users);
  }, [allUsers, userUid, userDetails?.following]);

  //handling follow btn
  const handleFollowBtn = (followerInfo) => {
    const following = {
      profilePic: userDetails?.profilePic,
      name: userDetails?.name,
      uid: userDetails?.uid,
      about: userDetails?.about,
    };
    const follower = {
      profilePic: followerInfo?.profilePic,
      name: followerInfo?.name,
      uid: followerInfo?.uid,
      about: followerInfo?.about,
    };
    const relationshipInfo = {
      following,
      follower,
      action: 'follow',
    };

    dispatch(follow(relationshipInfo));
  };

  let content;

  if (
    userDetails &&
    userDetails?.notifications &&
    userDetails?.notifications?.length > 0
  ) {
    content = userDetails?.notifications
      ?.sort((a, b) => new Date(b.date) - new Date(a.date))
      .map((notification) => (
        <Link to={`/visitProfile/${notification?.uid}`}>
          <div className="flex gap-5 items-center mb-5">
            {/* <img src={notification?.profilePic} className="w-12 h-12" alt="" /> */}
            {notification?.profilePic ? (
              <img
                src={notification?.profilePic}
                className="w-12 h-12 rounded-full"
                alt=""
              />
            ) : (
              <CgProfile className="w-12 h-12 cursor-pointer " />
            )}
            <div>
              <p className="text-xs">
                <span className="font-bold">{notification?.name}</span> started
                following you!
              </p>
              <p className="text-xs">
                <small>
                  {notification
                    ? new Date(notification.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })
                    : ''}{' '}
                  ·
                </small>
              </p>
            </div>
          </div>
        </Link>
      ));
  } else {
    content = (
      <p className="text-xs text-center py-5">
        No one has started following you yet!
      </p>
    );
  }

  if (isLoading) {
    return <SkeletonLoader count={3} />;
  }

  return (
    <div className="px-8 py-5 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-5">
      <div className="md:col-span-2">
        {/* {content} */}
        <div className="flex items-center mb-5 gap-5">
          <p
            onClick={() => toggleContent('notifications')}
            className={`text-xs cursor-pointer ${
              activeContent === 'notifications' && 'underline'
            }`}
          >
            Notifications
          </p>
          <p
            onClick={() => toggleContent('Suggestions')}
            className={`text-xs cursor-pointer ${
              activeContent === 'Suggestions' && 'underline'
            }`}
          >
            Suggestions
          </p>
        </div>
        {activeContent === 'notifications' && <div>{content}</div>}
        {activeContent === 'Suggestions' && (
          <div>
            <div>
              <h4 className="font-bold text-xs my-5">Who to follow</h4>
              {toFollow?.map((user) => (
                <div className="my-5 flex items-center gap-3" key={user._id}>
                  <div>
                    <Link to={`/visitProfile/${user?.uid}`}>
                      {user?.profilePic ? (
                        <img
                          src={user.profilePic}
                          className="w-16 h-16 rounded-full"
                          alt=""
                        />
                      ) : (
                        <CgProfile className="w-16 h-16 cursor-pointer" />
                      )}
                    </Link>
                  </div>
                  <div className="w-3/4">
                    <Link to={`/visitProfile/${user?.uid}`}>
                      <h5 className="mb-1 font-bold">{user?.name}</h5>
                    </Link>
                    {user?.about && (
                      <p style={{ fontSize: '12px' }}>
                        {user?.about.slice(0, 100) + '...'}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => handleFollowBtn(user)}
                    className="btn btn-xs md:mb-0 lg:mb-0"
                    style={{
                      backgroundColor: '#1A8917',
                      color: 'white',
                      textTransform: 'none',
                      '&:hover': {
                        backgroundColor: '#1A8917',
                        textTransform: 'none',
                      },
                    }}
                  >
                    Follow
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="md:block hidden col-span-1">
        <div className="mb-5">
          <StaffPicks />
        </div>
      </div>
    </div>
  );
};

export default Notifications;
