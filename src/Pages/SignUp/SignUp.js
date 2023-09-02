import React from "react";
import { RxCross2 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import {BsChevronLeft} from "react-icons/bs"

const SignUp = () => {
    const navigate = useNavigate();

    const handleCrossNavigate = () => {
        navigate('/')
    }
  return (
    <div className="mt-16 w-full py-24 relative m-5 md:w-1/2 md:mx-auto  border-[1px]">
        <div className="absolute top-5 text-xl right-5">
            <RxCross2 className="cursor-pointer" onClick={handleCrossNavigate}/>
        </div>
      <div className="flex flex-col p-5 items-center">
        <h3 className="text-2xl font-semibold my-12">Sign up with email</h3>
        <input
          type=" text"
          placeholder="Your Full Name"
          className="w-full md:w-1/2 text-sm  border-b-2 border-black my-5 focus:outline-none"
        />
        <input
          type=" text"
          placeholder="Your Email"
          className="w-full md:w-1/2 my-5 text-sm  border-b-2 border-black focus:outline-none"
        />
        <input
          type=" text"
          placeholder="Your Password"
          className="w-full md:w-1/2 my-5 text-sm  border-b-2 border-black focus:outline-none"
        />
        <button className="p-2 w-full md:w-2/4 my-8 rounded-full bg-black text-white">Sign Up</button>
        <Link to='/signUpMethods'>
        <p><small className="flex items-center gap-2"> <BsChevronLeft/> <span className="text-green-600 font-semibold">All sign up options</span></small></p>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
