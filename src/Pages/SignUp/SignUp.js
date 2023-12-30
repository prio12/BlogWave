import React, { useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { BsChevronLeft } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createUserWithEmailAndPass } from "../../redux/thunk/userAuth";

const SignUp = () => {
  const navigate = useNavigate();
  const { handleSubmit, register } = useForm();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.user?.uid);
  const error = useSelector((state) => state?.user?.errorMessage?.signUp)
  
  console.log(error);


  const handleCrossNavigate = () => {
    navigate("/");
  };

  const submit = (data) => {
    const user = {
      name: data.fullName,
      email: data.email,
      password: data.password,
    };

    dispatch(createUserWithEmailAndPass(user));
  };

  useEffect(() =>{
    if (user) {
      navigate("/")
    }
  },[user,navigate])

  return (
    
    <div className="mt-16 w-full py-24 relative md:w-1/2 md:mx-auto border-[1px]">
      <div className="absolute top-5 text-xl right-5">
        <RxCross2 className="cursor-pointer" onClick={handleCrossNavigate} />
      </div>
      <div>
        <h3 className="text-2xl text-center font-semibold my-12">
          Sign up with email
        </h3>
        <form
          onSubmit={handleSubmit(submit)}
          className="flex flex-col p-5 items-center"
        >
          <input
            {...register("fullName")}
            type="text"
            placeholder="Your Full Name"
            className="w-full md:w-1/2 text-sm border-b-2 border-black my-5 focus:outline-none"
            required
          />
          <input
            {...register("email")}
            type="email"
            placeholder="Your Email"
            className="w-full md:w-1/2 my-5 text-sm border-b-2 border-black focus:outline-none"
            required
          />
          <input
            {...register("password")}
            type="password"
            placeholder="Your Password"
            className="w-full md:w-1/2 my-5 text-sm border-b-2 border-black focus:outline-none"
            required
          />
          {
            error && <p className="text-red-500 my-2"><small>{error}</small></p>
          }
          <button className="p-2 w-full md:w-2/4 my-8 rounded-full bg-black text-white">
            Sign Up
          </button>
        </form>
        <Link to="/signUpMethods" className="flex justify-center">
          <p>
            <small className="flex items-center gap-2">
              <BsChevronLeft />{" "}
              <span className="text-green-600 font-semibold">
                All sign up options
              </span>
            </small>
          </p>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
