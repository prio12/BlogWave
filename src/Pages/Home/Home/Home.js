import React from "react";
import Banner from "../Banner/Banner";
import Blogs from "../../../components/blog/Blogs";
import Trending from "../Trending/Trending";
import BlogTopics from "../BlogTopics/BlogTopics";
import SearchBar from "../usersHomePage/searchBar/SearchBar";
import UserTopics from "../userTopics/UserTopics";
import StaffPicks from "../usersHomePage/staffPicksBlogs/StaffPicks";
import { useSelector } from "react-redux";

const Home = () => {
    const user = useSelector((state) => state?.user?.user?.uid);
  const loading = useSelector((state) => state?.user?.isLoading);
  return (
    <div>
     {
      user? <div className="md:px-16 px-5 w-full grid px-12 grid-cols-1 md:grid-cols-2">
        <div style={{gridTemplateColumns:"3fr"}}>
        <UserTopics/>
        <Blogs/>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[1fr]">
  {/* For small screens (hidden) */}
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
          <Blogs />
        </div>
        <div className="md:w-1/3">
          <BlogTopics />
        </div>
      </div>
     </div>
     }
      {/* for logged in user */}

      {/* <div className="grid px-12 grid-cols-1 md:grid-cols-2">
        <div style={{gridTemplateColumns:"3fr"}}>
          <SearchBar />
          <UserTopics />
          <Blogs/>
        </div>
        <div style={{gridTemplateColumns:"1fr"}}>
            <StaffPicks/>
        </div>
      </div> */}
  
    </div>
  );
};

export default Home;
