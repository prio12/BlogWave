import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserUpdatedData } from '../../redux/thunk/userAuth';

const SearchResults = () => {
    const [selectedResult,setSelectedResult] = useState("stories")
    const searchBlogs = useSelector((state) => state?.blogs?.searchResults)
    const searchedUsers = useSelector((state) => state?.blogs?.searchPeopleResults)
    const userUid = useSelector((state) => state?.user?.user?.uid);
    const dispatch = useDispatch()
    useEffect(() =>{
        dispatch(fetchUserUpdatedData(userUid))
      },[dispatch,userUid])
    console.log(searchBlogs);
    return (
        <div className='p-5 md:px-12'>
           <h1 className='text-4xl font-bold'><span className='text-slate-400'>Results for</span> full</h1>
           <div className='flex gap-3 items-center text-xs font-semibold my-5 cursor-pointer'>
            <p onClick={() => setSelectedResult("stories")} className={`${selectedResult === "stories" && "underline"}`}>Stories</p>
            <p onClick={() => setSelectedResult("people")} className={`${selectedResult === "people" && "underline"}`}>People</p>
           </div>
           {
            selectedResult === "stories"? 
            <div>
            <p>Stories</p>
           </div> :
           <div>
           <p>people</p>
          </div>
           }
        </div>
    );
};

export default SearchResults;