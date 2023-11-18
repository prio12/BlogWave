import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../../../redux/thunk/userAuth";

const UserAbout = () => {
  const textareaRef = useRef();
  const { handleSubmit } = useForm();
  const dispatch = useDispatch();
  const about = useSelector((state) => state?.user?.userData?.about);
  console.log(about);
  const uid = useSelector((state) => state?.user?.user?.uid);
  

  const submit = () => {
    const textAreaValue = textareaRef.current.value;
        dispatch(updateUserProfile({about:textAreaValue,uid:uid}))
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submit)} action="">
        <textarea
          ref={textareaRef}
          className="focus:outline-none font-mono"
          name=""
          id=""
          required
          defaultValue={`${about? about : 'Tell us about yourself!'}`}
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
          className="btn block btn-sm "
          required
        />
      </form>
    </div>
  );
};

export default UserAbout;
