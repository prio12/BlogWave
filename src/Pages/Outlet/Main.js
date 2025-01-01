import React, { useEffect, useState } from 'react';
import Header from '../../shared/Header/Header';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserHeader from '../../shared/Header/UserHeader';
import SkeletonLoader from '../../loading/SkeletonLoader';

const Main = () => {
  const user = useSelector((state) => state?.user?.user?.uid);
  const loading = useSelector((state) => state?.user?.isLoading);

  return (
    <div>
      {loading ? (
        <SkeletonLoader count={3} /> // Render the Loader when loading is true
      ) : user ? (
        <UserHeader />
      ) : (
        <Header />
      )}
      <div className={user ? 'pt-0' : 'pt-[80px]'}>
        <Outlet />
      </div>
    </div>
  );
};

export default Main;
