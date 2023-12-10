import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserUpdatedData, getAllUsers } from '../../redux/thunk/userAuth';
import Blogs from '../../components/blog/Blogs';
import Loader from '../../loading/Loader';
import { fetchAllBlogs } from '../../redux/thunk/blogs';
import StaffPicks from '../Home/usersHomePage/staffPicksBlogs/StaffPicks';
import SearchedUsers from './SearchedUsers';

const SearchResults = () => {
    const [selectedResult,setSelectedResult] = useState("stories")
    const [searchedBlogs,setSearchBlogs] = useState([]);
    const [searchedQuery,setSearchQuery] = useState("");
    const [searchedPeople,setSearchPeople] = useState([]);
    const query = useSelector((state) => state?.blogs?.query);
    const userUid = useSelector((state) => state?.user?.user?.uid);
    const isLoading = useSelector((state) => state?.blogs?.isLoading)
    const dispatch = useDispatch()
    useEffect(() =>{
        dispatch(fetchUserUpdatedData(userUid))
      },[dispatch,userUid])
      useEffect(() =>{
        dispatch(fetchAllBlogs())
    },[dispatch])

    useEffect(() =>{
      dispatch(getAllUsers())
    },[dispatch])

      useEffect(() =>{
        const storedSearchBlogs = JSON.parse(sessionStorage.getItem("searchBlogs"));
        const storedSearchQuery = JSON.parse(sessionStorage.getItem("query"));
        const storedSearchedPeople = JSON.parse(sessionStorage.getItem("searchPeopleResults"));
        setSearchBlogs(storedSearchBlogs)
        setSearchPeople(storedSearchedPeople)
        setSearchQuery(storedSearchQuery)
      },[query])
      let content;

      if (searchedBlogs && searchedBlogs.length) {
        content = searchedBlogs.map((blog) => <Blogs key={blog._id} blog={blog}></Blogs>)
      }

      if (isLoading) {
        content = <Loader/>
      }

      if (searchedBlogs && !searchedBlogs.length) {
        content = <div className='text-center text-xs py-5'><p>Ooops! Nothing Found!</p></div>
      }
    return (
        <div className='p-5 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-5'>
           <div className='md:col-span-2'>
           <h1 className='text-4xl font-bold'><span className='text-slate-600'>Results for</span> {searchedQuery}</h1>
           <div className='flex gap-3 items-center text-xs font-semibold my-5 cursor-pointer'>
            <p onClick={() => setSelectedResult("stories")} className={`${selectedResult === "stories" && "underline"}`}>Stories</p>
            <p onClick={() => setSelectedResult("people")} className={`${selectedResult === "people" && "underline"}`}>People</p>
           </div>
           {
            selectedResult === "stories"? 
            <div>
            {content}
           </div> :
           <div>
           {
            searchedPeople && searchedPeople.length? searchedPeople.map((user) => <SearchedUsers key={user._id} user={user}/>): <div><p className='text-xs text-center py-5'>Ooops! Nothing Found!</p></div>
           }
          </div>
           }
           </div>
           <div className="md:block hidden col-span-1 ">
            <StaffPicks/>
           </div>
        </div>
    );
};

export default SearchResults;