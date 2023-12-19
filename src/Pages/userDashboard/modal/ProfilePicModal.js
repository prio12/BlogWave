import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../../../redux/thunk/userAuth";
import { updateABlog, updateAuthorData } from "../../../redux/thunk/blogs";

const ProfilePicModal = () => {
  const { handleSubmit, register } = useForm();
  const dispatch = useDispatch();
  const uid = useSelector((state) => state?.user?.user?.uid);
  const [isLoading,setIsLoading] = useState(false)

  const submit = (data) => {
    const imageData = data.profilePic[0];
    const formData = new FormData();
    formData.append("image", imageData);
    setIsLoading(true)
    fetch(
      "https://api.imgbb.com/1/upload?&key=78c93d71ed75d250027e69675b3934bb",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          const imageUrl = imgData.data.url;
          // dispatch(updateUserProfile(imageUrl))
          dispatch(updateUserProfile({photoURL:imageUrl,uid:uid}))
          //updatedBlogAuthorData
          const updatedAuthorInfo = {
            userUid:uid,
           photoURL:imageUrl
          }
          dispatch(updateAuthorData(updatedAuthorInfo))
          setIsLoading(false)
        }
      });
  };
  return (
    <div>
      <dialog
        id="profile_pic_modal"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">Upload your Profile Pic!</h3>
          <form onSubmit={handleSubmit(submit)} className="mt-5" action="">
            <input {...register("profilePic")} required type="file" />
            {
              isLoading ?   <div className="flex my-5 items-center">
              <div className="animate-spin mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-arrow-clockwise"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.646 1.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L10 3.707V7.5a.5.5 0 0 1-1 0V2a.5.5 0 0 1 .5-.5z"
                  />
                  <path
                    fillRule="evenodd"
                    d="M2.5 8a.5.5 0 0 1 .5.5V13a.5.5 0 0 1-1 0V9.293l-2.146 2.147a.5.5 0 0 1-.708-.708l3-3a.5.5 0 0 1 .708 0z"
                  />
                </svg>
              </div>
              Loading...
            </div> : 
            <input
              style={{
                backgroundColor: "black",
                borderRadius: "20px",
                padding: "10px 20px",
                fontFamily: "'Roboto Slab', serif",
                color: "white",
                border: "none",
              }}
              type="submit"
              className="btn block my-5"
            />
            }
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

export default ProfilePicModal;
