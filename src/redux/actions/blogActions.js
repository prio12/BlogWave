import { CREATE_BLOG_SUCCESS, FETCH_SINGLE_BLOG, LOAD_BLOGS, POST_BLOGS, START_LOADING_FOR_BLOGS, STOP_LOADING_FOR_BLOGS } from "../actionTypes/actionTypes"

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

export const blogDetails = (details) =>{
    return {
        type:FETCH_SINGLE_BLOG,
        payload:details,
    }
}
