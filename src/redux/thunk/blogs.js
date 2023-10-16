import {
  clapToPost,
  createBlogStatus,
  getUserBlogs,
  loadBlogs,
  postBlog,
  selectedBlogData,
  startLoadingBlogs,
  stopLoadingBlogs,
  updatedBlog,
} from "../actions/blogActions";
import { startLoading, stopLoading } from "../actions/userAuthActions";

export const addBlogPost = (post) => {
  return async (dispatch) => {
    try {
      dispatch(startLoading());
      const response = await fetch("http://localhost:5000/blogs", {
        method: "POST",
        body: JSON.stringify(post),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.acknowledged) {
        dispatch(
          postBlog({
            _id: data.insertedId,
            ...post,
          })
        );
        dispatch(createBlogStatus({ postId: data.insertedId }));
        dispatch(stopLoading());
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchAllBlogs = () => {
  return async (dispatch) => {
    dispatch(startLoadingBlogs());
    const res = await fetch("http://localhost:5000/blogs");
    const data = await res.json();
    // dispatch(stopLoading())

    if (data) {
      dispatch(loadBlogs(data));
    }
    dispatch(stopLoadingBlogs());
  };
};

export const fetchSelectedBLogData = (_id) => {
  return async (dispatch) => {
    try {
      dispatch(startLoadingBlogs());
      const response = await fetch(`http://localhost:5000/blogs/${_id}`);
      const data = await response.json();
      if (data) {
        dispatch(stopLoadingBlogs());
        dispatch(selectedBlogData(data));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchUserAllBlogs = (_id) => {
  return async (dispatch) => {
    dispatch(startLoadingBlogs());
    try {
      const response = await fetch(
        `http://localhost:5000/blogs/myBlogs/${_id}`
      );
      const data = await response.json();
      if (data) {
        dispatch(stopLoadingBlogs());
        dispatch(getUserBlogs(data));
      }
    } catch (error) {}
  };
};

export const updateABlog = (data) => {
  //   console.log(data);
  return async (dispatch) => {
    dispatch(startLoadingBlogs());
    try {
      const response = await fetch(
        `http://localhost:5000/blogs/myBlogs/edit/${data._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      const responseData = await response.json();
      if (responseData) {
        dispatch(stopLoadingBlogs());
        dispatch(updatedBlog(data));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const addClapping = () =>{
  return async (dispatch) =>{
    dispatch(clapToPost())
  }
} 
