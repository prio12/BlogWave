import { AUTH_STATUS_OBSERVER, CREATE_USER_WITH_EMAIL_PASS, FETCH_ALL_USERS, FETCH_UPDATED_USER_DATA, LOGIN_FAILURE, SIGN_IN_WITH_EMAIL_PASS, SIGN_IN_WITH_GITHUB, SIGN_IN_WITH_GOOGLE, SIGN_IN_WITH_TWITTER, SIGN_OUT, START_LOADING, STOP_LOADING,} from "../actionTypes/actionTypes"


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

export const logInWithGoogle =(user) =>{
    return {
        type:SIGN_IN_WITH_GOOGLE,
        payload:user
    }
}
export const logInWithGithub = (user) =>{
    return {
        type:SIGN_IN_WITH_GITHUB,
        payload:user,
    }
}
export const logOutUser = () =>{
    return {
        type:SIGN_OUT,
    }
}

export const logInError = (errorMessage) =>{
    console.log(errorMessage);
 return {
    type:LOGIN_FAILURE,
    payload:errorMessage
 }
}

export const updateUserDetails = (data) =>{
    return {
        type:FETCH_UPDATED_USER_DATA,
        payload:data,
    }
}

export const fetchAllUsers = (data) =>{
    return {
        type:FETCH_ALL_USERS,
        payload:data,
    }
}