import { POST_BLOGS, START_LOADING, STOP_LOADING } from "../actionTypes/actionTypes";

const initialState = {
    blogs: [],
    isLoading:false,
}

export const blogReducer = (state = initialState, action) =>{
    switch (action.type) {
        case START_LOADING:
            return {
                ...state,
                isLoading:true,
            };
        case STOP_LOADING:
            return {
                ...state,
                isLoading:false,
            };
        case POST_BLOGS:
            return {
                ...state,
                blogs: [...state.blogs, action.payload]
            }
    
        default:
            return state;
    }
}