import {
  ADD_BOOKMARK,
  CREATE_BLOG_SUCCESS,
  DELETE_A_BLOG,
  DELETE_BLOG_FLAG,
  FETCH_USER_BLOGS,
  LOAD_BLOGS,
  POST_BLOGS,
  SEARCH_BLOGS,
  SELECT_BLOG,
  SET_UPDATE_SUCCESS_FLAG,
  START_LOADING_FOR_BLOGS,
  STOP_LOADING_FOR_BLOGS,
  UPDATE_BLOG_SUCCESS,
} from "../actionTypes/actionTypes";
import { startLoading, stopLoading } from "../actions/userAuthActions";

const initialState = {
  blogs: [],
  createdBlogId: null,
  isLoading: false,
  selectedBlog: null,
  userBlogs: [],
  updateSuccess: false,
  isDeleted: false,
  bookmarks: [],
  searchResults: [],
  searchPeopleResults:[],
  query:'',
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
        selectedBlog: action.payload,
      };
    case FETCH_USER_BLOGS:
      return {
        ...state,
        userBlogs: action.payload,
      };
    case UPDATE_BLOG_SUCCESS:
      const updatedIndex = state.blogs.findIndex(
        (blog) => blog._id === action.payload._id
      );
      const updatedBlogs = [...state.blogs];
      updatedBlogs[updatedIndex] = action.payload;
      return {
        ...state,
        blogs: updatedBlogs,
        updateSuccess: true,
      };
    case SET_UPDATE_SUCCESS_FLAG: // Reducer case to reset the flag if needed
      return {
        ...state,
        updateSuccess: action.payload,
      };
    case DELETE_A_BLOG:
      return {
        ...state,
        blogs: state.blogs.filter((blog) => blog._id !== action.payload._id),
        isDeleted: true,
      };
    case DELETE_BLOG_FLAG:
      return {
        ...state,
        isDeleted: action.payload,
      };
    case ADD_BOOKMARK:
      return {
        ...state,
        bookmarks: action.payload,
      };
    case SEARCH_BLOGS:
      const query = action.payload.toLowerCase();
      // console.log(query,action);
      const searchResults = state.blogs.filter((blog) =>
        blog.title?.toLowerCase().includes(query) 
        // blog.author?.toLowerCase().includes(query)
      );
      // console.log("Search Results:", searchResults);
      const searchPeopleResults = state.blogs.filter((blog) =>
        blog.author?.toLowerCase().includes(query)
      );
      // console.log("People Results:", searchPeopleResults);
      return {
        ...state,
        searchResults,
        searchPeopleResults,
        query:query,
      };
    default:
      return state;
  }
};
