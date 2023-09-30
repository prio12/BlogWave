import { postBlog } from "../actions/blogActions"
import { startLoading, stopLoading } from "../actions/userAuthActions"

export const addBlogPost = (post) =>{
    return async (dispatch) =>{
        try {
            dispatch(startLoading())
            const response = await fetch('http://localhost:5000/blogs',{
                method:"POST",
                body:JSON.stringify(post),
                headers: {
                    'Content-Type': 'application/json'
                  }
            })
            const data = await response.json();
            if (data.acknowledged) {
                dispatch(postBlog({
                    _id:data.insertedId,
                    ...post
                }))
                dispatch(stopLoading())
            }
            
        } catch (error) {
            console.log(error);
        }
    }
}