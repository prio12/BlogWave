import { CREATE_BLOG_SUCCESS,LOAD_BLOGS, POST_BLOGS, START_LOADING_FOR_BLOGS, STOP_LOADING_FOR_BLOGS,SELECT_BLOG, FETCH_USER_BLOGS, UPDATE_BLOG_SUCCESS, ADD_CLAPS } from "../actionTypes/actionTypes"

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

export const clapToPost = () =>{
    return {
        type:ADD_CLAPS,
    }
}


