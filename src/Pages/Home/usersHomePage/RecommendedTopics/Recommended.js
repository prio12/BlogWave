import React from 'react';
import { Link } from 'react-router-dom';

const Recommended = () => {
    return (
        <div>
            <h5 style={{fontSize:"13px"}} className='font-bold mb-4'>Recommended topics</h5>
            <div style={{fontSize:"12px"}} className='grid mb-4 px-5 grid-cols-2 md:grid-cols-3'>
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

export default Recommended;