import {
  AUTH_STATUS_OBSERVER,
  CREATE_USER_WITH_EMAIL_PASS,
  SIGN_IN_WITH_EMAIL_PASS,
  SIGN_IN_WITH_GOOGLE,
  SIGN_OUT,
  START_LOADING,
  STOP_LOADING,
} from "../actionTypes/actionTypes";

const initialState = {
  user: null,
  isLoading: false,
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
    case SIGN_OUT:
      return {
        ...state,
        user: null, // Reset user state when signing out
      };

    default:
      return state;
  }
};
