import { CREATE_BLOG_SUCCESS,LOAD_BLOGS, POST_BLOGS, START_LOADING_FOR_BLOGS, STOP_LOADING_FOR_BLOGS,SELECT_BLOG, FETCH_USER_BLOGS, UPDATE_BLOG_SUCCESS, DELETE_A_BLOG, ADD_BOOKMARK, SEARCH_BLOGS, ADD_TO_CLAP,  } from "../actionTypes/actionTypes"

export const postBlog = (post) =>{
    return {
        type: POST_BLOGS,
        payload:post,
    }
}

export const createBlogStatus = (_id) =>{
    return {
        type:CREATE_BLOG_SUCCESS,
        payload:_id
    }
}

export const loadBlogs = (data) =>{
    return {
        type:LOAD_BLOGS,
        payload:data
    }
}

export const startLoadingBlogs = () =>{
    return {
        type:START_LOADING_FOR_BLOGS
    }
}
export const stopLoadingBlogs = () =>{
    return {
        type:STOP_LOADING_FOR_BLOGS
    }
}

export const selectedBlogData = (blog) =>{
    return {
      type:SELECT_BLOG,
      payload:blog  
    }
}

export const getUserBlogs = (blogs) =>{
    return {
        type:FETCH_USER_BLOGS,
        payload:blogs,
    }
}

export const updatedBlog = (blog) =>{
    return {
        type:UPDATE_BLOG_SUCCESS,
        payload:blog,
    }
}

export const deleteBlog = (_id) =>{
    return {
        type:DELETE_A_BLOG,
        payload:_id,
    }
}

export const addToBookMark = (data) =>{
    return {
        type:ADD_BOOKMARK,
        payload:data.selectedBlogData,
    }
}

export const searchBlogs = (query) =>{
    return {
        type:SEARCH_BLOGS,
        payload:query,
    }
}

export const addToClap = (blog) =>{
    return {
        type:ADD_TO_CLAP,
        payload:blog,
    }
}





