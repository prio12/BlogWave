import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import { createUserWithEmailPass, setAuthUser, startLoading, stopLoading } from "../actions/userAuthActions";

export const createUserWithEmailAndPass = (user) => {
  return async (dispatch) => {
    try {
        dispatch(startLoading())
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );
      if (userCredential) {
        dispatch(stopLoading())
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
        dispatch(startLoading())
       const unsubscribe = onAuthStateChanged(auth, (user) =>{
        if (user) {
            dispatch(stopLoading())
            dispatch(setAuthUser(user))
        }

       })
       return unsubscribe;
    }
}
