import React from "react";
import Bear from '../../../Assests/Animation/Lottie_animation.json'
import Lottie from 'lottie-react'
import { Link } from "react-router-dom";
const Banner = () => {
  return (
    <div className="banner-background md:border-black  md:border-b-2 ">
      <div className="card p-5 px-12 py-5 lg:card-side flex">
        <div className="card-body pt-12 p-0 flex-grow">
          <h1
            style={{ fontFamily: "'Roboto Slab', serif" }}
            className="font-bold mb-5 text-7xl md:text-8xl"
          >
            Explore endlessly.
          </h1>
          <h5 className="text-xl font-semibold my-5">
            Explore insights, ideas, and perspectives shared by diverse minds.
          </h5>
          <Link to='/signUpMethods'>
          <button
            className="btn mt-5 btn-wide"
            style={{
              backgroundColor: "black",
              borderRadius: "20px",
              padding: "10px 20px",
              fontFamily: "'Roboto Slab', serif",
              color: "white",
              border: "none",
            }}
          >
            Start reading
          </button>
          </Link>
        </div>
        <div className="hidden md:block" style={{width:"28%"}}>
            <Lottie animationData={Bear} />
        </div>
      </div>
    </div>
  );
};

export default Banner;
