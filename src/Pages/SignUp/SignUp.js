import React from "react";
import { FcGoogle } from "react-icons/fc";
import { BsGithub,BsEnvelope } from "react-icons/bs";
const SignUp = () => {
  return (
    <div className="mt-16 py-24 m-5 md:w-1/2 md:mx-auto  border-[1px]">
      <div className="flex flex-col items-center">
        <h3 className="text-2xl font-semibold my-12">BlogWave</h3>
        <div>
          <button
            className="btn my-3 flex justify-between border border-black font-semibold rounded-full "
          >
            <FcGoogle className="text-xl mr-16" />
            <span className="pr-16">Sign Up With Google</span>
          </button>
        </div>
        <div>
        <button
            className="btn my-3 flex justify-between border border-black font-semibold rounded-full "
          >
            <BsGithub className="text-xl mr-16" />
            <span className="pr-16">Sign Up With Github</span>
          </button>
        </div>
        <div>
        <button
            className="btn my-3 flex justify-between border border-black font-semibold rounded-full "
          >
            <BsEnvelope className="text-xl mr-16" />
            <span className="pr-16">Sign Up With Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
