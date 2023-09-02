import React from "react";
import { FcGoogle } from "react-icons/fc";
import { BsGithub,BsEnvelope } from "react-icons/bs";
import {RxCross2} from 'react-icons/rx'
const SignUp = () => {
  return (
    <div className="mt-16 py-24 relative m-5 md:w-1/2 md:mx-auto  border-[1px]">
        <div className="absolute top-5 text-xl right-5">
            <RxCross2/>
        </div>
      <div className="flex flex-col items-center">
        <h3 className="text-2xl font-semibold my-12">Join BlogWave.</h3>
        <div>
          <button
            className="btn my-3 flex justify-between border border-black font-semibold rounded-full "
          >
            <FcGoogle className="text-xl " />
            <span className="px-12">Sign Up With Google</span>
          </button>
        </div>
        <div>
        <button
            className="btn my-3 flex justify-between border border-black font-semibold rounded-full "
          >
            <BsGithub className="text-xl" />
            <span className="px-12">Sign Up With Github</span>
          </button>
        </div>
        <div>
        <button
            className="btn my-3 flex justify-between border border-black font-semibold rounded-full "
          >
            <BsEnvelope className="text-xl " />
            <span className="px-12">Sign Up With Google</span>
          </button>
        </div>
        <p className=" my-5 font-semibold">Already have an account? Sign in</p>

        <p className="text-sm text-center mt-16">Click “Sign Up” to agree to Medium’s Terms of Service and acknowledge <br />
        that Medium’s Privacy Policy applies to you.</p>
      </div>
    </div>
  );
};

export default SignUp;
