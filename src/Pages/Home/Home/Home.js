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
  const state = useSelector((state) => state);
  console.log(state);
  return (
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
      {/* for logged in user */}

      <div className="grid px-12 grid-cols-1 md:grid-cols-2">
        <div style={{gridTemplateColumns:"3fr"}}>
          <SearchBar />
          <UserTopics />
          <Blogs/>
        </div>
        <div style={{gridTemplateColumns:"1fr"}}>
            <StaffPicks/>
        </div>
      </div>
    </div>
  );
};

export default Home;
