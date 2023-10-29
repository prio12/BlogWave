import React, { useRef } from "react";
import { useSelector } from "react-redux";

const ResponseField = () => {
  const userDetails = useSelector((state) => state?.user?.userData);
  const { displayName, photoURL } = userDetails;
  const { profilePic, name } = userDetails;
  const textAreaRef = useRef();
  

  const handleSubmit = (event) =>{
    event.preventDefault();
    const textAreaValue = textAreaRef.current.value;
    console.log(textAreaValue);
  }
  return (
    <div className="p-2 my-5">
      <div className="flex items-center gap-3 ">
        <img src={profilePic} alt="" className="h-8 w-8" />
        <p>
          <small>{name}</small>
        </p>
      </div>
      <form onSubmit={handleSubmit} className="my-5">
        <textarea
          ref={textAreaRef}
          className="focus:outline-none font-mono"
          name=""
          id=""
          required
          placeholder="What are your thoughts?"
          cols="30"
          rows="10"
        ></textarea>
        <input
             type="submit"
             style={{
               backgroundColor: "black",
               borderRadius: "20px",
               padding: "10px 20px",
               fontFamily: "'Roboto Slab', serif",
               color: "white",
               border: "none",
             }}
             className="btn btn-sm"
             required
           />
      </form>
    </div>
  );
};

export default ResponseField;
