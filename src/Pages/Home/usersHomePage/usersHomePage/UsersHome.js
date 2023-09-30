import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsData } from '../../../../redux/thunk/blogs';
import Blogs from '../../../../components/blog/Blogs';

const UsersHome = () => {
    const dispatch = useDispatch();
    const blogs = useSelector((state) => state?.blogs?.blogs)
    console.log(blogs);

    useEffect(() =>{
        dispatch(fetchProductsData())
    },[dispatch])

    let content;

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