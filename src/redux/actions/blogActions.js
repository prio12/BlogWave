import { CREATE_BLOG_SUCCESS, POST_BLOGS } from "../actionTypes/actionTypes"

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