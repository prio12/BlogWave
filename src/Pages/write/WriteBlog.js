import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addBlogPost, fetchAllBlogs } from "../../redux/thunk/blogs";
import { useNavigate } from "react-router-dom";
import { fetchUserUpdatedData, getAllUsers } from "../../redux/thunk/userAuth";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
const WriteBlog = () => {
  const { handleSubmit, register } = useForm();
  const textareaRef = useRef();
  const userUid = useSelector((state) => state?.user?.user?.uid);
  const createdBlogId = useSelector((state) => state?.blogs?.createdBlogId);
  // const authorImage = useSelector((state) => state?.user?.user?.photoURL);
  // const author = useSelector((state) => state?.user?.user?.displayName);
  const author = useSelector((state) => state?.user?.userData?.name);
  const authorImage = useSelector((state) => state?.user?.userData?.profilePic);
  const [isLoading, setIsLoading] = useState(false);
  const [editorHtml, setEditorHtml] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchUserUpdatedData(userUid));
  }, [dispatch, userUid]);

  useEffect(() => {
    dispatch(fetchAllBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  const handleFocus = () => {
    setIsInputFocused(true);
  };

  const handleBlur = () => {
    setIsInputFocused(false);
  };
  const submit = (data) => {
    // console.log(data);
    const imageData = data.image[0];
    // console.log(imageData);
    const formData = new FormData();
    formData.append("image", imageData);
    // console.log(formData);
    setIsLoading(true);
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
          const postDetails = {
            userUid: userUid,
            title: data.title,
            category: data.category,
            // description: textAreaValue,
            description: editorHtml,
            image: imgData.data.url,
            author,
            authorImage,
            claps: 0,
            date: Date(),
            likedBy: [],
          };
          dispatch(addBlogPost(postDetails));
          setIsLoading(false);
          navigate("/profile");
        }
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
      // Remove the list options
      // [{ list: "ordered" }, { list: "bullet" }],
    ],
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
            placeholder={isInputFocused ? "Ex:Technology, Food.." : "Category"}
            className=" mb-3 font-mono focus:outline-none"
            onFocus={handleFocus}
            onBlur={handleBlur}
            required
          />
        </div>
        <ReactQuill
          className="h-48 overflow-y-auto my-5" // Set the height using Tailwind classes
          theme="snow"
          formats={formats}
          modules={modules}
          value={editorHtml}
          onChange={(html) => setEditorHtml(html)}
        />

        <div className="block md:flex">
          <input
            type="file"
            id="file-input"
            className="mb-5"
            required
            {...register("image")}
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
              }}
              className="btn btn-sm"
              required
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default WriteBlog;
