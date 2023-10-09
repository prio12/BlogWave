import {
  AUTH_STATUS_OBSERVER,
  CREATE_USER_WITH_EMAIL_PASS,
  FETCH_UPDATED_USER_DATA,
  LOGIN_FAILURE,
  SIGN_IN_WITH_EMAIL_PASS,
  SIGN_IN_WITH_GITHUB,
  SIGN_IN_WITH_GOOGLE,
  SIGN_OUT,
  START_LOADING,
  START_LOADING_UPDATE_USER,
  STOP_LOADING,
  STOP_LOADING_UPDATE_USER,
} from "../actionTypes/actionTypes";

const initialState = {
  user: null,
  isLoading: false,
  errorMessage: {}, 
  userData:null,
  isUpdateLoading:false,
};

export const createUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case STOP_LOADING:
      return {
        ...state,
        isLoading: false,
      };
      case START_LOADING_UPDATE_USER:
      return {
        ...state,
        isUpdateLoading: true,
      };
    case STOP_LOADING_UPDATE_USER:
      return {
        ...state,
        isUpdateLoading: false,
      };
    case CREATE_USER_WITH_EMAIL_PASS:
      return {
        ...state,
        user: action.payload,
      };
    case AUTH_STATUS_OBSERVER:
      return {
        ...state,
        user: action.payload,
      };
      case SIGN_IN_WITH_EMAIL_PASS:
        return {
            ...state,
            user:action.payload,
        }
      case SIGN_IN_WITH_GOOGLE:
        return {
            ...state,
            user:action.payload,
        }
      case SIGN_IN_WITH_GITHUB:
        return {
            ...state,
            user:action.payload,
        }
    case SIGN_OUT:
      return {
        ...state,
        user: null, // Reset user state when signing out
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        errorMessage:action.payload, // Reset user state when signing out
      };
      case FETCH_UPDATED_USER_DATA:
        return {
          ...state,
          userData:action.payload,
        }

    default:
      return state;
  }
};
