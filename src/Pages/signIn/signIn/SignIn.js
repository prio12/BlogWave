import React from 'react';
import { useForm } from 'react-hook-form';
import { BsChevronLeft, BsGithub } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { RxCross2 } from 'react-icons/rx';
import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => {

    const navigate = useNavigate();
    const {handleSubmit,register} = useForm()

    const handleCrossNavigate = () =>{
        navigate('/')
    }

    const submit = (data) =>{
      console.log(data);
    }
    return (
        <div className="mt-16 w-full py-24 relative  md:w-1/2 md:mx-auto  border-[1px]">
        <div className="absolute top-5 text-xl right-5">
            <RxCross2 className="cursor-pointer" onClick={handleCrossNavigate}/>
        </div>
      <div>
        <h3 className="text-2xl text-center font-semibold my-12">Welcome Back!</h3>
       <form onSubmit={handleSubmit(submit)} className="flex flex-col p-5 items-center">
       <input
        {...register("email")}
          type=" email"
          placeholder="Your Email"
          className="w-full md:w-1/2 my-5 text-sm  border-b-2 border-black focus:outline-none"
        />
        <input
        {...register("password")}
          type=" password"
          placeholder="Your Password"
          className="w-full md:w-1/2 my-5 text-sm  border-b-2 border-black focus:outline-none"
        />
        <button className="p-2 w-full md:w-2/4 my-8 rounded-full bg-black text-white">Sign In</button>
       </form>
       <div className='flex justify-center'>
       <button
            className="btn my-3  flex justify-between border border-black font-semibold rounded-full "
          >
            <FcGoogle className="text-xl " />
            <span className="px-12">Sign Up With Google</span>
          </button>
       </div>
          <div className='flex justify-center'>
          <button
            className="btn my-3 flex justify-between border border-black font-semibold rounded-full "
          >
            <BsGithub className="text-xl" />
            <span className="px-12">Sign Up With Github</span>
          </button>
          </div>
        </div>
        <div>
      </div>
    </div>
    );
};

export default SignIn;