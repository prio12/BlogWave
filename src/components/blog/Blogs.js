import React from "react";

const Blogs = () => {
  return (
    <div className="flex flex-row justify-between items-center">
  {/* blog details div */}
  <div className="mb-4 md:mb-0 md:w-2/3 pr-6">
    <div className="flex items-center gap-2">
      {/* avatar */}
      <img
        alt=""
        className="w-6 h-6 border rounded-full dark:bg-gray-500 dark:border-gray-700"
        src="https://img.freepik.com/premium-vector/cute-bear-cartoon-vector-icon-illustration-animal-icon-concept-isolated-vector-flat-cartoon-style_627305-346.jpg?w=2000"
      />
      <h5 style={{fontSize:"12px"}}>Kim Witten, PhD</h5>
    </div>
    <h4 className="font-bold mt-2">
      Why I’m breaking up with Burning Man
    </h4>
    <p style={{fontSize:"12px"}}>Removing affirmative action is only another way to keep the status quo. — The function of education is to teach one to think intensively and to</p>
    <p className="text-sm mt-2">
      <small>Aug 23 · 7 min read . <span className="ms-5">Topic</span></small>
    </p>
  </div>
  {/* blog image div */}
  <div className="w-full md:w-1/2">
    <img
      style={{ width: "100%" }}
      src="https://cdn.pixabay.com/photo/2015/11/06/13/25/blog-1027861_640.jpg"
      alt=""
    />
  </div>
 {/* remove static data */}
</div>

  );
};

export default Blogs;
