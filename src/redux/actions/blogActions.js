import { CREATE_BLOG_SUCCESS, LOAD_BLOGS, POST_BLOGS } from "../actionTypes/actionTypes"

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