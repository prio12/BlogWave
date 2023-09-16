import React from 'react';
import { Link } from 'react-router-dom';

const BlogTopics = () => {
    return (
        <div>
            <h5 className='font-bold mb-4'>Discover more of what matters to you</h5>
            <div className="grid mb-4 px-5 grid-cols-2 md:grid-cols-3">
                <p>Programming</p>
                <p>Writing</p>
                <p>Technology</p>
                <p>Programming</p>
                <p>Writing</p>
                <p>Technology</p>
            </div>
            <p style={{color:"rgb(44, 148, 44)"}} className=' font-semibold'><Link><small>See more Topics</small></Link></p>
        </div>
    );
};

export default BlogTopics;