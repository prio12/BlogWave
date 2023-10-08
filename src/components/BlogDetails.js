import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogDetails } from '../redux/thunk/blogs';


const BlogDetails = () => {
   const dispatch = useDispatch();
   const _id = useSelector((state) => state?.blogs?.singleBLogId)
   console.log(_id);
    useEffect(() =>{
        dispatch(fetchBlogDetails(_id))
    },[dispatch,_id])
    return (
        <div>
            
        </div>
    );
};

export default BlogDetails;