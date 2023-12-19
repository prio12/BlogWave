import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../../../redux/thunk/userAuth";
import { updateAuthorData } from "../../../redux/thunk/blogs";

const UserNameModal = () => {
    const dispatch = useDispatch();
    const uid = useSelector((state) => state?.user?.user?.uid);
    const {handleSubmit,register} = useForm();
    const submit = (data) =>{
       dispatch(updateUserProfile({displayName:data.name,uid:uid}))
       const updatedAuthorInfo = {
        userUid:uid,
       author:data.name
      } 
      dispatch(updateAuthorData(updatedAuthorInfo))
    }
  return (
    <div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      {/* <button
        className="btn"
        onClick={() => document.getElementById("user_name").showModal()}
      >
        open modal
      </button> */}
      <dialog id="user_name" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <form onSubmit={handleSubmit(submit)} action="">
            <input {...register("name")} type="text" className="focus:outline-none font-mono" placeholder="Enter your name" required />
            <input
            className="block cursor-pointer my-5"
              style={{
                backgroundColor: "black",
                borderRadius: "20px",
                padding: "10px 20px",
                fontFamily: "'Roboto Slab', serif",
                color: "white",
                border: "none",
              }}
              type="submit"
            />
          </form>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default UserNameModal;
