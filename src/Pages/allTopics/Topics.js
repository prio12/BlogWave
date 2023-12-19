import React, { useEffect } from 'react';
import StaffPicks from '../Home/usersHomePage/staffPicksBlogs/StaffPicks';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserUpdatedData, getAllUsers } from '../../redux/thunk/userAuth';
import { fetchAllBlogs } from '../../redux/thunk/blogs';
import Loader from '../../loading/Loader';


const Topics = () => {
    const blogs = useSelector((state) => state?.blogs?.blogs)
    const userUid = useSelector((state) => state?.user?.user?.uid);
    const loading = useSelector((state) => state?.user?.isLoading);
    const uniqueCategory = new Set();
    let content;

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

      const handleNavigate = (category) => {
        console.log(category);
      }

      if (blogs && blogs.length) {
        blogs.map((blog) => uniqueCategory.add(blog.category))
      }

      if (loading) {
        content = <Loader/>
      }

      if (uniqueCategory) {
        content = Array.from(uniqueCategory).map((category) => <p onClick={() => handleNavigate(category)} key={category}>{category}</p>)
      }
    return (
        <div className="px-8  md:px-12 grid grid-cols-1 md:grid-cols-3 gap-5"> 
            <div className="md:col-span-2">
               <h2 className='text-4xl font-bold'>Explore topics</h2>
               <div className='my-5 cursor-pointer grid grid-cols-3 gap-3 font-semibold text-xs border-[1px] border-[#6B6B6B] p-5'>
                    {content}
                </div>
            </div>
            <div className="md:block hidden col-span-1 ">
                <StaffPicks/>
            </div>
        </div>
    );
};

export default Topics;