import React, { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import {FaGithub} from 'react-icons/fa'
import { BsEnvelope } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInWithGithubProvider, signInWithGoogleProvider } from "../../redux/thunk/userAuth";
const SignUpMethods = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.user?.uid);


  const handleGoBack = () => {
    navigate(-1); // This will take you back to the previous page.
  };
  const handleGoogleSignIn = () =>{
      dispatch(signInWithGoogleProvider())
  }
  const handleGithubSignIn = () =>{
    dispatch(signInWithGithubProvider())
  }
  useEffect(() =>{
    if (user) {
      navigate(-1)
    }
  },[user,navigate])

  return (
    <div className="mt-16 py-24 relative m-5 md:w-1/2 md:mx-auto  border-[1px]">
      <div className="absolute top-5 text-xl right-5">
        <RxCross2 className="cursor-pointer" onClick={handleGoBack} />
      </div>
      <div className="flex flex-col items-center">
        <h3 className="text-2xl font-semibold my-12">Join BlogWave.</h3>
        <div>
          <button onClick={handleGoogleSignIn} className="btn my-3 flex justify-between border border-black font-semibold rounded-full ">
            <FcGoogle className="text-xl " />
            <span className="px-12">Sign Up With Google</span>
          </button>
        </div>
        <div>
          <button onClick={handleGithubSignIn} className="btn my-3 flex justify-between border border-black font-semibold rounded-full ">
            <FaGithub className="text-xl" />
            <span className="px-12">Sign Up With GitHub</span>
          </button>
        </div>
        <Link to="/signUp">
          <button className="btn my-3 flex justify-between border border-black font-semibold rounded-full ">
            <BsEnvelope className="text-xl " />
            <span className="px-12">Sign Up With Email</span>
          </button>
        </Link>
        <p className=" my-5 font-semibold">Already have an account? <Link className="text-[#1A8917] font-bold" to='/signIn'>Sign in</Link></p>

        <p className="text-sm text-center mt-16">
          Click “Sign Up” to agree to BlogWave's Terms of Service and
          acknowledge <br />
          that BlogWave's Privacy Policy applies to you.
        </p>
      </div>
    </div>
  );
};

export default SignUpMethods;
