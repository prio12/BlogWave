import React, { useState } from 'react';

const SearchResults = () => {
    const [selectedResult,setSelectedResult] = useState("stories")
    console.log(selectedResult);
    return (
        <div className='p-5 md:px-12'>
           <h1 className='text-4xl font-bold'><span className='text-slate-400'>Results for</span> full</h1>
           <div className='flex gap-3 items-center text-xs font-semibold my-5 cursor-pointer'>
            <p onClick={() => setSelectedResult("stories")}>Stories</p>
            <p onClick={() => setSelectedResult("people")}>People</p>
           </div>
        </div>
    );
};

export default SearchResults;