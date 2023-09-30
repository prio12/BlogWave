import { POST_BLOGS } from "../actionTypes/actionTypes";

const initialState = {
    blogs: [],
}

export const blogReducer = (state = initialState, action) =>{
    switch (action.type) {
        case POST_BLOGS:
            return {
                ...state,
                blogs: [...state.blogs, action.payload]
            }
    
        default:
            return state;
    }
}