import React, { useRef, useState } from "react";
import { MdEdit } from "react-icons/md";
import ProfilePicModal from "../modal/ProfilePicModal";
import { useSelector } from "react-redux";
import UserNameModal from "../modal/UserNameModal";
import UserAbout from "./UserAbout";

const Profile = () => {
  const image = useSelector((state) => state?.user?.user?.photoURL);
  const name = useSelector((state) => state?.user?.user?.displayName);
  const [activeContent,setActiveContent] = useState('home')
  const textareaRef = useRef();

  const toggleContent = (content) =>{
    setActiveContent(content)
  }
  // console.log(image);
  const openImageModal = () => {
    document.getElementById("profile_pic_modal").showModal();
  };

  const openNameModal = () =>{
    document.getElementById("user_name").showModal();
  }
  return (
    <div className=" flex md:flex-row flex-col-reverse  gap-3 p-5 md:px-12 ">
      <div className="w-3/4">
        <div>
        <h3 className="text-4xl hidden md:block font-bold">
         {name}
        </h3>
        </div>
        <div style={{ fontSize: "12px" }} className="flex my-7 gap-7">
          <p style={{ cursor: 'pointer' }} className={` ${activeContent === "home" ? 'underline' : 'margin-top-class'}`} onClick={() => toggleContent("home")}>Home</p>
          <p className={`${activeContent==="about" && 'underline'}`} style={{ cursor: 'pointer' }} onClick={() => toggleContent("about")}>About</p>
        </div>
        <div>
            {
                activeContent === 'home' && (
                    <div>

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
        <div className="mb-3 flex items-center">
          <img
            onClick={openImageModal}
            title="Tap on to change your profile pic!"
            alt=""
            className="w-16 h-16 border rounded-full dark:bg-gray-500 dark:border-gray-700"
            src={image}
          />
        </div>
        <div className="flex gap-2 items-center">
          <p className="font-bold">{name}</p>
          < MdEdit  onClick={openNameModal}/>
        </div>
        <ProfilePicModal />
        <UserNameModal/>
      </div>
    </div>
  );
};

export default Profile;
