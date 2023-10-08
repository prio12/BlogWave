import {
  CREATE_BLOG_SUCCESS,
  FETCH_SINGLE_BLOG,
  GET_BLOG_ID,
  LOAD_BLOGS,
  POST_BLOGS,
  START_LOADING_FOR_BLOGS,
  STOP_LOADING_FOR_BLOGS,
} from "../actionTypes/actionTypes";

const initialState = {
  blogs: [],
  blogDetails: null,
  createdBlogId: null,
  isLoading: false,
  singleBLogId: null,
};

export const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_LOADING_FOR_BLOGS:
      return {
        ...state,
        isLoading: true,
      };
    case STOP_LOADING_FOR_BLOGS:
      return {
        ...state,
        isLoading: false,
      };
    case POST_BLOGS:
      return {
        ...state,
        blogs: [...state.blogs, action.payload],
      };
    case CREATE_BLOG_SUCCESS:
      return {
        ...state,
        createdBlogId: action.payload,
      };
    case LOAD_BLOGS:
      return {
        ...state,
        blogs: action.payload,
      };
    case FETCH_SINGLE_BLOG:
      return {
        ...state,
        blogDetails: action.payload,
      };
    case GET_BLOG_ID:
      return {
        ...state,
        singleBLogId: action.payload,
      };

    default:
      return state;
  }
};
