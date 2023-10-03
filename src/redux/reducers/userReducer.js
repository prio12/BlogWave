import {
  AUTH_STATUS_OBSERVER,
  CREATE_USER_WITH_EMAIL_PASS,
  LOGIN_FAILURE,
  SIGN_IN_WITH_EMAIL_PASS,
  SIGN_IN_WITH_GITHUB,
  SIGN_IN_WITH_GOOGLE,
  SIGN_OUT,
  START_LOADING,
  STOP_LOADING,
  UPDATE_USER_ABOUT,
  UPDATE_USER_NAME,
  UPDATE_USER_PHOTOURL,
} from "../actionTypes/actionTypes";

const initialState = {
  user: null,
  isLoading: false,
  errorMessage: {}, 
};

export const createUserReducer = (state = initialState, action) => {
  console.log(action.payload);
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
      case UPDATE_USER_PHOTOURL:
        return {
            ...state,
            user:{
              ...state.user,
              photoURL: action.payload,
            }
        }
        case UPDATE_USER_NAME:
          return {
            ...state,
            user:{
              ...state.user,
              displayName:action.payload
            }
          }
        case UPDATE_USER_ABOUT:
          return {
            ...state,
            user:{
              ...state.user,
              about:action.payload
            }
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

    default:
      return state;
  }
};
