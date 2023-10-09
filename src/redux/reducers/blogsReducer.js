import {
  CREATE_BLOG_SUCCESS,
  LOAD_BLOGS,
  POST_BLOGS,
  SELECT_BLOG,
  START_LOADING_FOR_BLOGS,
  STOP_LOADING_FOR_BLOGS,
} from "../actionTypes/actionTypes";

const initialState = {
  blogs: [],
  createdBlogId: null,
  isLoading: false,
  selectedBlog:null,
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
      case SELECT_BLOG:
        return {
          ...state,
          selectedBlog:action.payload
        }
    

    default:
      return state;
  }
};
