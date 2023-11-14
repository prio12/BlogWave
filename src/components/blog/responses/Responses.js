import React, { useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";

const Responses = ({response}) => {
   
    const [seeMoreStatus,setSeeMoreStatus] = useState(true);
    return (
        <div>
            
            <div className='my-5'>
               <div className='flex items-center gap-3'>
               <img src={response.profilePic} className='h-6 w-6' alt="" />
               <p style={{fontSize:"10px"}} className='font-semibold'>{response.name}</p>
               </div>
               <div style={{fontSize:"10px"}} className='p-2'>
                {
                   seeMoreStatus && <p>
                   {response.response.slice(0, 2)}
                   <p className='text-green-500 cursor-pointer font-bold' onClick={() => setSeeMoreStatus(false)}>See More</p>
               </p>
                }
                {
                    !seeMoreStatus && <p>{response.response} </p>
                }
               </div>
            </div>
        </div>
    );
};

export default Responses;