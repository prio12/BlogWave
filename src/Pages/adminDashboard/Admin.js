import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteUserAndBlogs,
  fetchUserUpdatedData,
  getAllUsers,
} from '../../redux/thunk/userAuth';
import { fetchAllBlogs } from '../../redux/thunk/blogs';
import Blogs from '../../components/blog/Blogs';
import Loader from '../../loading/Loader';
import { CgProfile } from 'react-icons/cg';
import SkeletonLoader from '../../loading/SkeletonLoader';

const Admin = () => {
  const userUid = useSelector((state) => state?.user?.user?.uid);
  const allUsers = useSelector((state) => state?.user?.allUsers);
  const isLoading = useSelector((state) => state?.blogs?.isLoading);
  const allBlogs = useSelector((state) => state?.blogs?.blogs);
  const [activeContent, setActiveContent] = useState('users');

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserUpdatedData(userUid));
  }, [dispatch, userUid]);

  useEffect(() => {
    dispatch(fetchAllBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  if (isLoading) {
    return <SkeletonLoader count={3} />;
  }
  return (
    <div className="p-5 md:px-12">
      <div className="flex gap-5 items-center cursor-pointer text-xs">
        <p
          onClick={() => setActiveContent('users')}
          className={` ${activeContent === 'users' && 'underline'}`}
        >
          All Users
        </p>
        <p
          onClick={() => setActiveContent('blogs')}
          className={` ${activeContent === 'blogs' && 'underline'}`}
        >
          All Blogs
        </p>
      </div>
      <div>
        {activeContent === 'users' && (
          <div className="my-5">
            {allUsers
              ?.filter((user) => user.uid !== userUid)
              .map((user) => (
                <div
                  key={user?._id}
                  className="flex items-center mb-5 justify-between"
                >
                  <div className="flex items-center gap-5">
                    {user?.profilePic ? (
                      <img
                        src={user?.profilePic}
                        className="w-12 h-12 rounded-full"
                        alt=""
                      />
                    ) : (
                      <CgProfile className="w-8 h-8 cursor-pointer" />
                    )}
                    <p className="text-xs">{user?.name}</p>
                  </div>
                  <button
                    className="btn  btn-sm md:mb-0 lg:mb-0"
                    onClick={() =>
                      dispatch(deleteUserAndBlogs({ user, type: 'user' }))
                    }
                    style={{
                      backgroundColor: 'red',
                      color: 'white',
                      textTransform: 'none',
                      '&:hover': {
                        backgroundColor: '#1A8917',
                        textTransform: 'none',
                      },
                    }}
                  >
                    Delete
                  </button>
                </div>
              ))}
          </div>
        )}
        {activeContent === 'blogs' && (
          <div className="my-5">
            {allBlogs?.map((blog) => (
              <Blogs blog={blog}></Blogs>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
