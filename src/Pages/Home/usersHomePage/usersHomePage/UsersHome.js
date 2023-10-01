import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsData } from '../../../../redux/thunk/blogs';
import Blogs from '../../../../components/blog/Blogs';
import Loader from '../../../../loading/Loader';

const UsersHome = () => {
    const dispatch = useDispatch();
    const blogs = useSelector((state) => state?.blogs?.blogs)
    const isLoading = useSelector((state) => state?.blogs?.isLoading)
    console.log(isLoading);


    useEffect(() =>{
        dispatch(fetchProductsData())
    },[dispatch])

    let content;

    if (isLoading) {
        content = <Loader/>
    }

    if (blogs.length) {
        content = blogs.map((blog) =>(
            <Blogs key={blog._id} blog={blog}></Blogs>
        ))
    }
    return (
        <div>
            {content}
        </div>
    );
};

export default UsersHome;