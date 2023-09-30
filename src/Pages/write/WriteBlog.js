import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addBlogPost } from "../../redux/thunk/blogs";
import { useNavigate } from "react-router-dom";
const WriteBlog = () => {
  const { handleSubmit, register } = useForm();
  const textareaRef = useRef();
  const userUid = useSelector((state) => state?.user?.user?.uid);
  const createdBlogId = useSelector((state) => state?.blogs?.createdBlogId);
  console.log(createdBlogId);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submit = (data) => {
    // console.log(data);
    const textAreaValue = textareaRef.current.value;
    const imageData = data.image[0];
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
          console.log(imgData);
          const postDetails = {
            userUid:userUid,
            title: data.title,
            category:data.category,
            description:textAreaValue,
            image:imgData.data.url,
            date:Date(),
          };
          dispatch(addBlogPost(postDetails))
          navigate('/profile')
          
        }
      });
  };
  return (
    <div className="w-full md:w-1/2 p-5 m-auto">
      <form onSubmit={handleSubmit(submit)} className=" items-center">
        <div>
          <input
            {...register("title")}
            type="text"
            className="text-3xl mb-3 font-mono focus:outline-none"
            placeholder="Title"
            required
          />
          <input
            {...register("category")}
            type="text"
            placeholder="Category"
            className=" mb-3 font-mono focus:outline-none"
            required
          />
        </div>
        <textarea
          ref={textareaRef}
          className="focus:outline-none font-mono"
          name=""
          id=""
          required
          placeholder="Tell your story..."
          cols="30"
          rows="10"
        ></textarea>
        <div className="block md:flex">
          <input
            type="file"
            id="file-input"
            className="mb-5"
            {...register("image")}
          />
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
        </div>
      </form>
    </div>
  );
};

export default WriteBlog;
