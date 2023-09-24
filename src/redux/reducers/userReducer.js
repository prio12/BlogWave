import { AUTH_STATUS_OBSERVER, CREATE_USER_WITH_EMAIL_PASS } from "../actionTypes/actionTypes";

const initialState = {
    user: null,
}

export const createUserReducer = (state= initialState, action) =>{
    switch (action.type) {
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