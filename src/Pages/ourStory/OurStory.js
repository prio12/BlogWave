import React from "react";
import bg from "../../Assests/bg.avif";

const OurStory = () => {
  const divStyle = {
    backgroundImage: `url(${bg})`,
  };
  return (
    <div className="h-screen pt-16 justify-center bg-cover" style={divStyle}>
      <div className="md:px-12 px-5 font-mono md:w-1/2 w-full">
        <h1
          style={{ color: "rgba(255, 255, 255, 1)" }}
          className="text-5xl font-extrabold"
        >
          Your Story <br />
          Our Universe.
        </h1>
        <div style={{ color: "rgba(255, 255, 255, 1)" }} className="my-8">
          <p>
            Tired of the internet's yelling? Join the whisperers on BlogWave.
            Share your knowledge, wisdom, and ideas without building a massive
            following first. We believe in depth, not clicks. Your words matter
            here, finding the right ears even in the crowd. BlogWave is simple,
            beautiful, and built for thoughtful conversations. Forget quick
            takes and viral trends. This is where stories linger, connections
            spark, and ideas take root.
          </p>
          <p style={{ color: "rgba(255, 255, 255, 1)" }} className="text-xl my-8 font-bold">
            So, come raise your voice (quietly) on BlogWave. We're listening.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OurStory;
