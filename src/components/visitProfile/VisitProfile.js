import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserUpdatedData, getAllUsers } from "../../redux/thunk/userAuth";
import UserAbout from "../../Pages/userDashboard/profile/UserAbout";
import { fetchAllBlogs, fetchUserAllBlogs } from "../../redux/thunk/blogs";
import { Link, useParams } from "react-router-dom";
import Loader from "../../loading/Loader";
import Blogs from "../blog/Blogs";

const VisitProfile = () => {
  const userUid = useSelector((state) => state?.user?.user?.uid);
  const selectedProfile = useSelector((state) => state?.user?.selectedProfile)
  const userBLogs = useSelector((state) =>state?.blogs?.userBlogs)
  const isLoading = useSelector((state) => state?.blogs?.isLoading)
  const dispatch = useDispatch();
  const {id  } = useParams();
  console.log(id);


  
  const [user,setUser] = useState(null)
  const [activeContent,setActiveContent] = useState('home')

  useEffect(() =>{
    const storedUser = JSON.parse(sessionStorage.getItem('user'));
    // console.log(storedUser);
    setUser(storedUser)
  },[selectedProfile])

 
   
//   console.log("user",user);
  useEffect(() => {
    dispatch(fetchUserUpdatedData(userUid));
  }, [dispatch, userUid]);

  useEffect(() =>{
    dispatch(fetchAllBlogs())
  },[dispatch])
  
  useEffect(() =>{
    dispatch(getAllUsers())
  },[dispatch])

  const toggleContent = (content) =>{
    setActiveContent(content)
  }

  let content;

  useEffect(() =>{
    dispatch(fetchUserAllBlogs(id))
  },[dispatch,id])
//   useEffect(() =>{
//    if (user?.uid) {
//     dispatch(fetchUserAllBlogs(user?.uid))
//    }
//    else {
//     console.log("no uid found");
//    }
//   },[dispatch,user?.uid])

  if (!userBLogs.length) {
    content = <div className="text-center">
      <p>You have not written any blog!</p>
      <Link to='/writeBlog' style={{fontSize:"12px"}} className="text-[#1A8917] ">Write now?</Link>
    </div>
  }

  if (isLoading) {
    content = <Loader/>
  }

  if (userBLogs.length) {
    content = userBLogs.map((blog) =>(
      <Blogs key={blog?._id} blog={blog}></Blogs>
    ))
  }

  return (
    <div className=" flex md:flex-row flex-col-reverse  gap-3 p-5 md:px-12 ">
      <div className="w-3/4">
        <div>
        <h3 className="text-4xl hidden md:block font-bold">
         {user?.name}
        </h3>
        </div>
        <div style={{ fontSize: "12px" }} className="flex my-7 gap-7">
          <p style={{ cursor: 'pointer' }} className={` ${
                  activeContent === "home"
                    && "underline"
                     
                }`} onClick={() => toggleContent("home")}>Home</p>
          <p className={`${activeContent==="about" && 'underline'}`} style={{ cursor: 'pointer' }} onClick={() => toggleContent("about")}>About</p>
        </div>
        <div>
            {
                activeContent === 'home' && (
                    <div>
                      {content}
                    </div>
                )
            }
            {
                activeContent === 'about' && (
                    <div>
                        <UserAbout/>
                    </div>
                )
            }
        </div>
      </div>
      <div className="flex md:block gap-3 items-center">
        <div className="mb-3 ">
          <img src={user?.profilePic} className="w-16 h-16" alt="" />
        </div>
        <div className="flex gap-2 items-center">
          <p className="font-bold">{user?.name}</p>
        </div>
      </div>
    </div>
  );
};

export default VisitProfile;
