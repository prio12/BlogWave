import React from "react";

const ProfilePicModal = () => {
  return (
    <div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      {/* <button
        className="btn"
        onClick={() => document.getElementById("profile_pic_modal").showModal()}
      >
        open modal
      </button> */}
      <dialog id="profile_pic_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Upload your Profile Pic!</h3>
          <form className="mt-5" action="">
            <input type="file" />
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
