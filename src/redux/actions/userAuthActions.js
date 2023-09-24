import { CREATE_USER_WITH_EMAIL_PASS } from "../actionTypes/actionTypes"

export const createUserWithEmailPass = (user) =>{
    return {
        type:CREATE_USER_WITH_EMAIL_PASS,
        payload:user
    }
}