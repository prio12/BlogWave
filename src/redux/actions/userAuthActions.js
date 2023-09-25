import { AUTH_STATUS_OBSERVER, CREATE_USER_WITH_EMAIL_PASS, SIGN_IN_WITH_EMAIL_PASS, SIGN_OUT, START_LOADING, STOP_LOADING } from "../actionTypes/actionTypes"


export const startLoading = () =>{
    return {
        type:START_LOADING,
    }
}
export const stopLoading = () =>{
    return {
        type:STOP_LOADING,
    }
}

export const createUserWithEmailPass = (user) =>{
    return {
        type:CREATE_USER_WITH_EMAIL_PASS,
        payload:user
    }
}

export const setAuthUser = (user) =>{
    return {
        type:AUTH_STATUS_OBSERVER,
        payload:user,
    }
}

export const signInWithEmail = (user) =>{
    return {
        type:SIGN_IN_WITH_EMAIL_PASS,
        payload:user,
    }
}
export const logOutUser = () =>{
    return {
        type:SIGN_OUT,
    }
}