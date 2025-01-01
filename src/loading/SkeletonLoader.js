import React from 'react';
import './SkeletonLoader.css';
const SkeletonLoader = ({ count = 1 }) => {
  return (
    <div className="skeleton-container">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="skeleton">
          <div className="skeleton-avatar"></div>
          <div className="skeleton-text">
            <div className="skeleton-line short"></div>
            <div className="skeleton-line long"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
