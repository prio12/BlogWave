import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addResponse } from "../../../redux/thunk/blogs";
import Responses from "./Responses";
import { IoIosArrowDown } from "react-icons/io";

const ResponseField = () => {
  const userDetails = useSelector((state) => state?.user?.userData);
  const selectedBlogData = useSelector((state) => state?.blogs?.selectedBlog);
  const [selectedFilter,setSelectedFilter] = useState("MOST RECENT")
  const [isDropDown, setIsDropdown] = useState(false);
  const handleDropdown = () =>{
      setIsDropdown(!isDropDown)
  }
  const responses = selectedBlogData?.responses;
  const { profilePic, name } = userDetails;
  const textAreaRef = useRef();
  const dispatch = useDispatch();
  const createdAt = new Date();

  const handleSubmit = (event) => {
    event.preventDefault();
    const textAreaValue = textAreaRef.current.value;
    const response = {
      blogId: selectedBlogData?._id,
      name,
      profilePic,
      response: textAreaValue,
      createdAt,
    };

    dispatch(addResponse(response));
    textAreaRef.current.value = ""
  };
  
  return (
    <div className="p-2 my-5">
      <div className="flex items-center gap-3 ">
        <img src={profilePic} alt="" className="h-8 w-8" />
        <p>
          <small>{name}</small>
        </p>
      </div>
      <form onSubmit={handleSubmit} className='border-b-2  border-black py-3'>
        <textarea
          ref={textAreaRef}
          className="focus:outline-none font-mono"
          name=""
          id=""
          required
          placeholder="What are your thoughts?"
          cols="30"
          rows="10"
        ></textarea>
        <input
          type="submit"
          style={{
            backgroundColor: "black",
            borderRadius: "20px",
            padding: "10px 20px",
            fontFamily: "'Roboto Slab', serif",
            color: "white",
            border: "none",
          }}
          className="btn btn-sm"
          required
        />
      </form>
      <div className='my-3 flex items-center gap-2 relative'>
            <p className='font-bold' style={{fontSize:"12px"}}>{selectedFilter}</p> 
            <IoIosArrowDown className='cursor-pointer' onClick={handleDropdown}/>
            {
                isDropDown && <div style={{fontSize:"10px"}} className='absolute top-8 font-bold p-5 w-32  bg-white z-50 '>
                    <p className='cursor-pointer' onClick={() => setSelectedFilter("MOST RECENT")}>Most Recent</p>
                    <p className='cursor-pointer' onClick={() => setSelectedFilter("ALL COMMENTS")}>All Comments</p>
                </div>
            }
            </div>
      {
        selectedFilter === "MOST RECENT" && responses
        ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map((response, index) => <Responses response={response} key={index}></Responses>)
      }
      {
        selectedFilter === "ALL COMMENTS" && responses
        ?.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        .map((response, index) => <Responses response={response} key={index}></Responses>)
      }
    </div>
  );
};

export default ResponseField;
