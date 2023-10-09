import React, { useEffect } from "react";
import Banner from "../Banner/Banner";
import Blogs from "../../../components/blog/Blogs";
import Trending from "../Trending/Trending";
import BlogTopics from "../BlogTopics/BlogTopics";
import SearchBar from "../usersHomePage/searchBar/SearchBar";
import UserTopics from "../userTopics/UserTopics";
import StaffPicks from "../usersHomePage/staffPicksBlogs/StaffPicks";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../loading/Loader";
import UsersHome from "../usersHomePage/usersHomePage/UsersHome";
import { fetchUserUpdatedData } from "../../../redux/thunk/userAuth";
import { fetchAllBlogs } from "../../../redux/thunk/blogs";

const Home = () => {
    const user = useSelector((state) => state?.user?.user?.uid);
  const loading = useSelector((state) => state?.user?.isLoading);
  const blogs = useSelector((state) => state?.blogs?.blogs)
  const dispatch = useDispatch()
  useEffect(() =>{
    dispatch(fetchUserUpdatedData(user))
  },[dispatch,user])

  useEffect(() =>{
    dispatch(fetchAllBlogs())
},[dispatch])

  return (
    <div>
      {
        loading? <Loader/> : 
        user? <div className="md:px-16 px-5 w-full grid gap-5 grid-cols-1 md:grid-cols-3">
        <div className="col-span-2">
          <div className="grid grid-cols-1">
            <div>
              <UserTopics />
            </div>
            <div>
              {/* <Blogs /> */}
              <UsersHome/>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="hidden md:block">
            <StaffPicks />
          </div>
        </div>
      </div> : 
      <div>
      <Banner />
       <Trending />
       <div className="flex md:flex-row flex-col-reverse gap-12 px-12 justify-between items-center">
         <div className="md:w-2/4">
          {
            blogs.map((blog) => (
              <Blogs key={blog?._id} blog={blog}/>
            ))
          }
         </div>
         <div className="md:w-1/3">
           <BlogTopics />
         </div>
       </div>
      </div>
      }
     {/* {
      user? <div className="md:px-16 px-5 w-full grid grid-cols-1 md:grid-cols-3">
      <div className="col-span-2">
        <div className="grid grid-cols-1">
          <div>
            <UserTopics />
          </div>
          <div>
            <Blogs />
          </div>
        </div>
      </div>
      <div className="col-span-1">
        <div className="hidden md:block">
          <StaffPicks />
        </div>
      </div>
    </div>
    
     : 
      <div>
     <Banner />
      <Trending />
      <div className="flex md:flex-row flex-col-reverse gap-12 px-12 justify-between items-center">
        <div className="md:w-2/4">
          <Blogs />
        </div>
        <div className="md:w-1/3">
          <BlogTopics />
        </div>
      </div>
     </div>
     } */}
  
    </div>
  );
};

export default Home;
