import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchSelectedBLogData} from '../redux/thunk/blogs'
import Loader from "../loading/Loader";
import {PiHandsClappingLight} from 'react-icons/pi'
import {FaRegComment} from 'react-icons/fa'
import {MdOutlineBookmarkAdd} from "react-icons/md"
import { useNavigate, useParams } from "react-router-dom";
import {GrLinkPrevious} from 'react-icons/gr'

const BlogDetails = () => {
  const dispatch  = useDispatch();
  const {id} = useParams();
  useEffect(() =>{
    dispatch(fetchSelectedBLogData(id))
  },[dispatch,id])

  const selectedBlogData = useSelector((state) => state?.blogs?.selectedBlog);
  const isLoading = useSelector((state) => state?.blogs?.isLoading);
  const navigate = useNavigate();
  if (!selectedBlogData || isLoading) {
    return <Loader/>
  }
  const {author,authorImage,title,description,category,date,image} = selectedBlogData;
  const handleNavigate = () =>{
    navigate(-1)
  }
  return (
    <div className="p-5">
      <div className="w-full md:w-1/2 mx-auto">
        <h2 className="text-4xl font-extrabold my-3">{title}</h2>
        <div className="flex gap-2 items-center my-3">
            <img src={authorImage} className="h-12 w-12" alt="" />
            <div>
            <h5 style={{fontSize:"12px"}} className="font-semibold">{author}</h5>
            <small style={{fontSize:"10px"}} className="mr-3">7 min read</small>
            <small style={{fontSize:"10px"}}>12th August</small>
            </div>
        </div>
        <div className="flex my-3 justify-between items-center">
            <div  className="flex text-xs items-center gap-5">
                {/* <PiHandsClappingLight className="cursor:pointer "/><span>143</span> */}
                <div className="flex  items-center gap-1">
                  <PiHandsClappingLight className="cursor-pointer"/>
                  <span>143</span>
                </div>
                {/* <FaRegComment/><span>5</span> */}
                <div className="flex items-center gap-1">
                  <FaRegComment className="cursor-pointer"/>
                  <span>5</span> 
                </div>
            </div>
            <MdOutlineBookmarkAdd/>
        </div>
        <img src={image} style={{ height: "50%" }} alt="" />
        <p className="my-5 border border-dark p-2">{description}</p>
        <GrLinkPrevious className="cursor-pointer" onClick={handleNavigate} title="See more blogs"/>
      </div>
    </div>
  );
};

export default BlogDetails;
