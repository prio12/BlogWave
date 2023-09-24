import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import { createUserWithEmailPass, setAuthUser, startLoading, stopLoading } from "../actions/userAuthActions";

export const createUserWithEmailAndPass = (user) => {
  return async (dispatch) => {
    try {
        console.log("startLoading by observer");
        dispatch(startLoading())
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );
      console.log("stopLoading by observer");
        dispatch(stopLoading())
      if (userCredential) {
        const user = userCredential.user;
        console.log(user);
        dispatch(createUserWithEmailPass(user));
        alert("User Created!!");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const observeAuthState = () =>{
    return  (dispatch) =>{
        // console.log("startLoading by observer");
        dispatch(startLoading())
       const unsubscribe = onAuthStateChanged(auth, (user) =>{
        // console.log("stopLoading by observer");
        dispatch(stopLoading()) 
        if (user) {
            dispatch(setAuthUser(user))
        }

       })
       return unsubscribe;
    }
}
