import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../../../redux/thunk/userAuth";

const ProfilePicModal = () => {
  const { handleSubmit, register } = useForm();
  const dispatch = useDispatch();
  const uid = useSelector((state) => state?.user?.user?.uid);

  const submit = (data) => {
    const imageData = data.profilePic[0];
    const formData = new FormData();
    formData.append("image", imageData);
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
          alert('image uploaded successfully!')
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
