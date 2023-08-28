import React from "react";
import { AiFillFire } from "react-icons/ai";
const Trending = () => {
  return (
    <div className="pt-10 px-12">
      <h5 className="flex gap-1  font-bold items-center">
        <AiFillFire /> Hottest Articles Now
      </h5>

      <div className="py-5 px-8 grid grid-cols-1 gap-8 md:grid-cols-3">
        <div>
          <div className="flex  items-center gap-2">
            <img
              alt=""
              className="w-8 h-8 border rounded-full dark:bg-gray-500 dark:border-gray-700"
              src="https://img.freepik.com/premium-vector/cute-bear-cartoon-vector-icon-illustration-animal-icon-concept-isolated-vector-flat-cartoon-style_627305-346.jpg?w=2000"
            />
            <h5 className="text-sm font-semibold">The Bold Italic</h5>
          </div>
          <h4 className="font-extrabold mt-2">
            Why I’m breaking up with Burning Man
          </h4>
          <p className="text-sm mt-2">
            <small>Aug 23 · 7 min read</small>
          </p>
        </div>
        {/* remove static data */}
        <div>
          <div className="flex  items-center gap-2">
            <img
              alt=""
              className="w-8 h-8 border rounded-full dark:bg-gray-500 dark:border-gray-700"
              src="https://img.freepik.com/premium-vector/cute-bear-cartoon-vector-icon-illustration-animal-icon-concept-isolated-vector-flat-cartoon-style_627305-346.jpg?w=2000"
            />
            <h5 className="text-sm font-semibold">Kevin Chisholm in Flutter</h5>
          </div>
          <h4 className="font-extrabold mt-2">What’s new in Flutter 3.13</h4>
          <p className="text-sm mt-2">
            <small>Aug 23 · 7 min read</small>
          </p>
        </div>
        <div>
          <div className="flex  items-center gap-2">
            <img
              alt=""
              className="w-8 h-8 border rounded-full dark:bg-gray-500 dark:border-gray-700"
              src="https://img.freepik.com/premium-vector/cute-bear-cartoon-vector-icon-illustration-animal-icon-concept-isolated-vector-flat-cartoon-style_627305-346.jpg?w=2000"
            />
            <h5 className="text-sm font-semibold">The PyCoach</h5>
          </div>
          <h4 className="font-extrabold mt-2">
            Python in Excel Will Reshape How Data Analysts Work
          </h4>
          <p className="text-sm mt-2">
            <small>Aug 23 · 7 min read</small>
          </p>
        </div>
        <div>
          <div className="flex  items-center gap-2">
            <img
              alt=""
              className="w-8 h-8 border rounded-full dark:bg-gray-500 dark:border-gray-700"
              src="https://img.freepik.com/premium-vector/cute-bear-cartoon-vector-icon-illustration-animal-icon-concept-isolated-vector-flat-cartoon-style_627305-346.jpg?w=2000"
            />
            <h5 className="text-sm font-semibold">The PyCoach</h5>
          </div>
          <h4 className="font-extrabold mt-2">
            Python in Excel Will Reshape How Data Analysts Work
          </h4>
          <p className="text-sm mt-2">
            <small>Aug 23 · 7 min read</small>
          </p>
        </div>
        <div>
          <div className="flex  items-center gap-2">
            <img
              alt=""
              className="w-8 h-8 border rounded-full dark:bg-gray-500 dark:border-gray-700"
              src="https://img.freepik.com/premium-vector/cute-bear-cartoon-vector-icon-illustration-animal-icon-concept-isolated-vector-flat-cartoon-style_627305-346.jpg?w=2000"
            />
            <h5 className="text-sm font-semibold">The PyCoach</h5>
          </div>
          <h4 className="font-extrabold mt-2">
            Python in Excel Will Reshape How Data Analysts Work
          </h4>
          <p className="text-sm mt-2">
            <small>Aug 23 · 7 min read</small>
          </p>
        </div>
        <div>
          <div className="flex  items-center gap-2">
            <img
              alt=""
              className="w-8 h-8 border rounded-full dark:bg-gray-500 dark:border-gray-700"
              src="https://img.freepik.com/premium-vector/cute-bear-cartoon-vector-icon-illustration-animal-icon-concept-isolated-vector-flat-cartoon-style_627305-346.jpg?w=2000"
            />
            <h5 className="text-sm font-semibold">The PyCoach</h5>
          </div>
          <h4 className="font-extrabold mt-2">
            Python in Excel Will Reshape How Data Analysts Work
          </h4>
          <p className="text-sm mt-2">
            <small>Aug 23 · 7 min read</small>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Trending;
