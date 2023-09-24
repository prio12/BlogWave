import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import { createUserWithEmailPass, setAuthUser } from "../actions/userAuthActions";

export const createUserWithEmailAndPass = (user) => {
  return async (dispatch) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );
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
       const unsubscribe = onAuthStateChanged(auth, (user) =>{
        if (user) {
            dispatch(setAuthUser(user))
        }

       })
       return unsubscribe;
    }
}
