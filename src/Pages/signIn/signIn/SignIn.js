import React from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  signInWithEmailPass,
  signInWithGithubProvider,
  signInWithGoogleProvider,
} from "../../../redux/thunk/userAuth";
import { useEffect } from "react";

const SignIn = () => {
  const navigate = useNavigate();
  const { handleSubmit, register } = useForm();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.user?.uid);
  const error = useSelector((state) => state?.user?.errorMessage?.signIn);

  console.log(user);

  const handleCrossNavigate = () => {
    navigate("/");
  };

  const submit = (data) => {
    const user = {
      email: data.email,
      password: data.password,
    };
    dispatch(signInWithEmailPass(user));
  };

  const handleGoogleSignIn = () => {
    dispatch(signInWithGoogleProvider());
  };
  const handleGithubSignIn = () => {
    dispatch(signInWithGithubProvider());
  };

  useEffect(() => {
    if (user) {
      navigate(-1);
    }
  }, [user, navigate]);

  return (
    <div className="mt-16 w-full py-24 relative  md:w-1/2 md:mx-auto  border-[1px]">
      <div className="absolute top-5 text-xl right-5">
        <RxCross2 className="cursor-pointer" onClick={handleCrossNavigate} />
      </div>
      <div>
        <h3 className="text-2xl text-center font-semibold mt-12">
          Welcome Back!
        </h3>
        <form
          onSubmit={handleSubmit(submit)}
          className="flex flex-col p-5 items-center"
        >
          <input
            {...register("email")}
            type="email"
            placeholder="Your Email"
            className="w-full md:w-1/2 my-5 text-sm  border-b-2 border-black focus:outline-none"
            required
          />
          <input
            {...register("password")}
            type=" password"
            placeholder="Your Password"
            className="w-full md:w-1/2 my-5 text-sm  border-b-2 border-black focus:outline-none"
            required
          />
          <button className="p-2 w-full md:w-2/4 my-8 rounded-full bg-black text-white">
            Sign In
          </button>
          {error && (
            <p className="text-red-500 my-2">
              <small>{error}</small>
            </p>
          )}
          <p style={{fontSize:"12px"}}>
            New to BlogWave? <Link to="/signUpMethods" className="text-[#1A8917] font-bold">SignUp</Link>
          </p>
        </form>
        <div className="flex  justify-center">
          <button
            onClick={handleGoogleSignIn}
            className="btn mt-2  flex justify-between border border-black font-semibold rounded-full "
          >
            <FcGoogle className="text-xl " />
            <span className="px-12">Sign In With Google</span>
          </button>
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleGithubSignIn}
            className="btn mt-2 flex justify-between border border-black font-semibold rounded-full "
          >
            <FaGithub className="text-xl" />
            <span className="px-12">Sign In With Github</span>
          </button>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default SignIn;
