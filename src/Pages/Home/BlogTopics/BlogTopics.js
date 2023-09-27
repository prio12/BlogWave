import React from 'react';
import { Link } from 'react-router-dom';

const BlogTopics = () => {
    return (
        <div>
            <h5 style={{fontSize:"13px"}} className='font-bold mb-4'>Discover more of what matters to you</h5>
            <div style={{fontSize:"12px"}} className="flex flex-wrap gap-2">
                <p>Programming</p>
                <p>Writing</p>
                <p>Technology</p>
                <p>Programming</p>
                <p>Writing</p>
                <p>Technology</p>
            </div>
            <p  style={{color:"rgb(44, 148, 44)" ,fontSize:"12px"}} className=' font-semibold'><Link><small>See more Topics</small></Link></p>
        </div>
    );
};

export default BlogTopics;