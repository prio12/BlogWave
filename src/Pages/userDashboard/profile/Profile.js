import React from 'react';
import {MdEdit} from 'react-icons/md'
import ProfilePicModal from '../modal/ProfilePicModal';

const Profile = () => {
    const openModal = () =>{
        document.getElementById("profile_pic_modal").showModal()
    }
    return (
        <div className=' flex md:flex-row flex-col-reverse  md:justify-evenly p-5 md:px-12 '>
           <div>
            <h3 className='text-4xl hidden md:block font-bold'>Maksudur Rahman prio</h3>
            <div style={{fontSize:"12px"}} className='flex my-7 gap-7'>
                <p>Home</p>
                <p>About</p>
            </div>
            <div>
                OThers 
            </div>
           </div>
           <div className='flex md:block gap-3 items-center'>
           <div className='mb-3 flex items-center'>
           <img  onClick={openModal} title='Tap on to change your profile pic!' alt="" className="w-16 h-16 border rounded-full dark:bg-gray-500 dark:border-gray-700" src="https://i.ibb.co/V2vmZf3/wallpaperflare-com-wallpaper-1.jpg" />
           </div>
           <div className='flex gap-2 items-center'>
            <p className='font-bold'>Maksudur Rahman prio</p>
            <MdEdit/>
           </div>
           <ProfilePicModal/>
           </div>
        </div>
    );
};

export default Profile;