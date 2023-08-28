import React from 'react';
import Banner from '../Banner/Banner';
import Blogs from '../../../components/blog/Blogs';
import Trending from '../Trending/Trending';
import BlogTopics from '../BlogTopics/BlogTopics';

const Home = () => {
    return (
        <div>
            <Banner/>
            <Trending/>
            <div className='flex md:flex-row flex-col-reverse gap-12 px-12 justify-between items-center'>
            <div className='md:w-2/4'>
            <Blogs />
            </div>
            <div className='md:w-1/3'>
            <BlogTopics/>
            </div>
            </div>
        </div>
    );
};

export default Home;