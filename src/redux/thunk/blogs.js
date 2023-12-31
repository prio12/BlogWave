import {
  addToBookMark,
  addToClap,
  createBlogStatus,
  deleteBlog,
  getUserBlogs,
  loadBlogs,
  postBlog,
  selectedBlogData,
  startLoadingBlogs,
  stopLoadingBlogs,
  updateClaps,
  updatedBlog,
} from "../actions/blogActions";
import { startLoading, stopLoading } from "../actions/userAuthActions";
import { getAllUsers } from "./userAuth";

export const addBlogPost = (post) => {
  return async (dispatch) => {
    try {
      dispatch(startLoading());
      const response = await fetch("https://blog-wave-server-roan.vercel.app/blogs", {
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
    const res = await fetch("https://blog-wave-server-roan.vercel.app/blogs");
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
      const response = await fetch(`https://blog-wave-server-roan.vercel.app/blogs/${_id}`);
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
        `https://blog-wave-server-roan.vercel.app/blogs/myBlogs/${_id}`
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
        `https://blog-wave-server-roan.vercel.app/blogs/myBlogs/edit/${data._id}`,
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

export const updateAuthorData = (data) =>{
  return async (dispatch) =>{
    dispatch(startLoadingBlogs());
    try {
      const response = await fetch("https://blog-wave-server-roan.vercel.app/blogs/updateAuthorInfo",{
        method:"PUT",
        headers: { "Content-Type": "application/json" },
        body:JSON.stringify(data)
      })

      const responseData = await response.json();
      if (responseData) {
        dispatch(stopLoadingBlogs());
        dispatch(fetchAllBlogs());
        dispatch(getAllUsers())
      }
    } catch (error) {
      
    }
  }
}

export const updateClapsCount = (_id,userUid) =>{
  // console.log(_id,userUid);
  return async (dispatch) =>{
    try {
      const response = await fetch(`https://blog-wave-server-roan.vercel.app/blogs/blogDetails/likes/${_id}/${userUid}`,{
        method:"PUT",
        headers: { "Content-Type": "application/json" },
        
      })

      const responseData = await response.json();
      if (responseData) {
        dispatch(selectedBlogData(responseData))
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export const deleteABLog = (_id) =>{
  return async (dispatch) =>{
    try {
      const response = await fetch(`https://blog-wave-server-roan.vercel.app/delete/${_id}`, {
        method:"DELETE",
      })
      const result = await response.json();
      if (result) {
        dispatch(deleteBlog(_id))
      }
    } catch (error) {
      console.log(error);
    }
  }
}

//bookmarks
export const saveAsBookmarks = (selectedBlogData,userUid,action) =>{
  return async (dispatch) =>{
    try {
      dispatch(startLoading())
      const response = await fetch(`https://blog-wave-server-roan.vercel.app/users/${userUid?.userUid}`,{
        method:"PUT",
        headers: { "Content-Type": "application/json" },
        body:JSON.stringify({selectedBlogData,action})
      })
      const responseData = await response.json();
      if (responseData) {
        dispatch(addToBookMark(selectedBlogData))
        dispatch(stopLoading())
      }
    } catch (error) {
      console.log(error);
    }
  }
}

//add response
export const addResponse = (responseDetails) =>{
  const _id = responseDetails?.blogId;
  return async (dispatch) =>{
    try {
      // dispatch(startLoading())
      const response = await fetch(`https://blog-wave-server-roan.vercel.app/blogs/selectedBLog/responses/${_id}`,{
        method:"PUT",
        headers: { "Content-Type": "application/json" },
        body:JSON.stringify(responseDetails)
      })
      const responseData = await response.json();
      if (responseData) {
        // console.log(responseData);
        // dispatch(stopLoading())
        dispatch(selectedBlogData(responseData))
      }
    } catch (error) {
      
    }
  }
}

export const addPostToClap = (blog,userUid) =>{
  // console.log(userUid);
  return async (dispatch) =>{
    try {
      // dispatch(startLoading())
      const response = await fetch(`https://blog-wave-server-roan.vercel.app/users/${userUid?.userUid}`,{
        method:"PUT",
        headers: { "Content-Type": "application/json" },
        body:JSON.stringify(blog)
      })
      const responseData = await response.json();
      if (responseData) {
        // console.log(responseData);
        dispatch(addToClap(blog))
      }
    } catch (error) {
      console.log(error);
    }
  }
}

