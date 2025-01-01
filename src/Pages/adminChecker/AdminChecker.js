import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../loading/Loader';
import { fetchUserUpdatedData } from '../../redux/thunk/userAuth';
import ErrorPage from '../errorPage/ErrorPage';
import SkeletonLoader from '../../loading/SkeletonLoader';

const AdminChecker = ({ children }) => {
  const user = useSelector((state) => state?.user?.user?.uid);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      dispatch(fetchUserUpdatedData(user));
    }
  }, [user, dispatch]);
  const loading = useSelector((state) => state?.user?.isLoading);
  const userDetails = useSelector((state) => state?.user?.userData);

  if (loading) {
    return <SkeletonLoader count={3} />;
  }
  if (userDetails && userDetails?.role) {
    if (userDetails?.role === 'admin') {
      return children;
    }
  } else {
    return <ErrorPage />;
  }
};

export default AdminChecker;
