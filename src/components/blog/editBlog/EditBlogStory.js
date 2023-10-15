import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { updateABlog } from "../../../redux/thunk/blogs";

const EditBlogStory = ({ image, _id, title, description }) => {
  const { handleSubmit, register } = useForm();
  const dispatch = useDispatch();
  const textareaRef = useRef();
  const submit = (data) => {
    const textAreaValue = textareaRef.current.value;
    const file = data.blogImage[0];
    const formData = new FormData();
    if (file) {
      formData.append("image", file);
    }
    else {
      formData.append("image", image)
    }
    
    fetch(
      "https://api.imgbb.com/1/upload?expiration=600&key=a0add477bb3aea1e07516557d1748e8c",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((imageData) => {
        if (imageData.success) {
          const editedBlogData = {
            _id,
            title:data.title,
            description:textAreaValue,
            image:imageData.data.url
          }
          // console.log(editedBlogData);
          dispatch(updateABlog(editedBlogData))
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submit)} action="">
        <label htmlFor="" className="font-mono text-xl">
          Title{" "}
        </label>
        <input
          {...register("title")}
          type="text"
          style={{ fontSize: "12px" }}
          className="w-full font-serif focus:outline-none"
          defaultValue={title}
        />
        <img
          src={image}
          className="md:h-[400px] h-full w-full mt-5 mb-3"
          alt=""
        />
        <input
          type="file"
          name="blogImage"
          {...register("blogImage")}
        />
        <label htmlFor="" className="font-mono text-xl mt-5 mb-2 block">
          Story{" "}
        </label>
        <textarea
          ref={textareaRef}
          name=""
          className="focus:outline-none"
          defaultValue={description}
          id=""
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
            fontSize: "12px",
          }}
          className="btn font-serif block my-5 btn-sm"
          required
        />
      </form>
    </div>
  );
};

export default EditBlogStory;
