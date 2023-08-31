import React from "react";
import { Link } from "react-router-dom";
import Recommended from "../RecommendedTopics/Recommended";
import {BsBookmarkPlus} from 'react-icons/bs'

const StaffPicks = () => {
  return (
    <div>
      <div className="mb-8">
      <h4 className="font-bold mb-5">Staff Picks</h4>
      <div className="flex  items-center gap-2">
        {/* avatar */}
        <img
          alt=""
          className="w-8 h-8 border rounded-full dark:bg-gray-500 dark:border-gray-700"
          src="https://img.freepik.com/premium-vector/cute-bear-cartoon-vector-icon-illustration-animal-icon-concept-isolated-vector-flat-cartoon-style_627305-346.jpg?w=2000"
        />
        <h5>Kim Witten, PhD</h5>
      </div>
      <h4 className="font-extrabold mt-2">
        Why I’m breaking up with Burning Man
      </h4>
      <p style={{ color: "rgb(44, 148, 44)" }} className=" font-semibold">
        <Link>
          <small>See more Topics</small>
        </Link>
      </p>
      </div>
      <Recommended/>
      <div>
        <h5 className="font-bold mt-8 mb-3">Reading list</h5>
        <p className="text-sm">
        Click the <BsBookmarkPlus className="inline"/> on any story to easily add it to your reading list or a custom list that you can share.
        </p>
      </div>
    </div>
  );
};

export default StaffPicks;
