import { AUTH_STATUS_OBSERVER, CREATE_USER_WITH_EMAIL_PASS, START_LOADING, STOP_LOADING,  } from "../actionTypes/actionTypes";

const initialState = {
    user: null,
    isLoading:false,
}

export const createUserReducer = (state= initialState, action) =>{
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
        case CREATE_USER_WITH_EMAIL_PASS:
            return {
                ...state,
                user:action.payload,
            };
        case AUTH_STATUS_OBSERVER:
            return {
                ...state,
                user:action.payload,
            };
            
        default: return state;
    }
}