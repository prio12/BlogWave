import { AUTH_STATUS_OBSERVER, CREATE_USER_WITH_EMAIL_PASS } from "../actionTypes/actionTypes"

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