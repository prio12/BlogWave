import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { updateABlog } from "../../../redux/thunk/blogs";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import DOMPurify from "dompurify";

const EditBlogStory = ({ selectedBlogData }) => {
  const { image, title, description, _id, author, authorImage, date, userUid } =
    selectedBlogData;
  const [isLoading, setIsLoading] = useState(false);
  const [editorHtml, setEditorHtml] = useState("");
  const { handleSubmit, register } = useForm();
  const dispatch = useDispatch();
  const textareaRef = useRef();
  useEffect(() =>{
    const sanitizedDescription = DOMPurify.sanitize(description);
    setEditorHtml(sanitizedDescription)

  },[description])
  const submit = (data) => {
    const file = data.blogImage[0];
    const formData = new FormData();
    if (file) {
      formData.append("image", file);
    } else {
      formData.append("image", image);
    }

    setIsLoading(true);
    fetch(
      "https://api.imgbb.com/1/upload?&key=a0add477bb3aea1e07516557d1748e8c",
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
            author,
            authorImage,
            userUid,
            title: data.title,
            description: editorHtml,
            image: imageData.data.url,
            date,
          };
          console.log(description);
          dispatch(updateABlog(editedBlogData));
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "indent",
  ];

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
    ],
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
          className=" h-96 w-full mt-5 mb-3"
          alt=""
        />
        <input type="file" name="blogImage" {...register("blogImage")} />
        <label htmlFor="" className="font-mono text-xl mt-5 mb-2 block">
          Story{" "}
        </label>
        <ReactQuill
          className="h-48 overflow-y-auto my-5" // Set the height using Tailwind classes
          theme="snow"
          formats={formats}
          modules={modules}
          value={editorHtml}
          onChange={(html) => setEditorHtml(html)}
        />
        {isLoading ? (
          <div className="flex m-3 items-center">
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
            Uploading...
          </div>
        ) : (
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
        )}
      </form>
    </div>
  );
};

export default EditBlogStory;
