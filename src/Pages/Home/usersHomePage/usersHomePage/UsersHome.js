import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Blogs from '../../../../components/blog/Blogs';
import Loader from '../../../../loading/Loader';
import { fetchAllBlogs } from '../../../../redux/thunk/blogs';
import { fetchUserUpdatedData } from '../../../../redux/thunk/userAuth';
import SkeletonLoader from '../../../../loading/SkeletonLoader';

const UsersHome = ({ category }) => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state?.blogs?.blogs);
  const isLoading = useSelector((state) => state?.blogs?.isLoading);
  const userUid = useSelector((state) => state?.user?.user?.uid);
  useEffect(() => {
    dispatch(fetchAllBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchUserUpdatedData(userUid));
  }, [dispatch, userUid]);

  let content;

  if (isLoading) {
    content = <SkeletonLoader count={3} />;
  } else {
    if (blogs.length) {
      if (category && category !== 'For you') {
        // Filter and map if category is provided
        content = blogs
          .filter((filteredBlog) => filteredBlog.category === category)
          .map((blog) => <Blogs key={blog._id} blog={blog}></Blogs>);
      } else {
        content = blogs
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .map((blog) => <Blogs key={blog._id} blog={blog}></Blogs>);
      }
    }
  }

  return <div>{content}</div>;
};

export default UsersHome;
