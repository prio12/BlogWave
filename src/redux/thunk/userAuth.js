import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import {
  createUserWithEmailPass,
  logInError,
  logInWithGithub,
  logInWithGoogle,
  logOutUser,
  setAuthUser,
  signInWithEmail,
  startLoading,
  stopLoading,
} from "../actions/userAuthActions";

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export const createUserWithEmailAndPass = (user) => {
  return async (dispatch) => {
    try {
      console.log("startLoading by observer");
      dispatch(startLoading());
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );
      //useDetails for database
        const useDetails = {
          name: user.name,
          email:user.email,
          password:user.password
        }

      // console.log("stopLoading by observer");
      dispatch(stopLoading());
      if (userCredential) {
        const user = userCredential.user;
        // console.log(user);
        dispatch(createUserWithEmailPass(user));
        alert("User Created!!");
        const response = await fetch("http://localhost:5000/users", {
          method: "POST",
          body: JSON.stringify(useDetails),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const result = await response.json();
        console.log(result);
      }
    } catch (error) {
      // console.log(error);
      dispatch(startLoading());
      dispatch(logInError({ signUp: error.message }));
      dispatch(stopLoading());
    }
  };
};

export const observeAuthState = () => {
  return (dispatch) => {
    // console.log("startLoading by observer");
    dispatch(startLoading());
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // console.log("stopLoading by observer");
      dispatch(stopLoading());
      if (user) {
        dispatch(setAuthUser(user));
      }
    });
    return unsubscribe;
  };
};

export const signInWithEmailPass = (user) => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );
      dispatch(stopLoading());
      if (userCredential) {
        const user = userCredential.user;
        dispatch(signInWithEmail(user));
        alert("Welcome Back!!");
      }
    } catch (error) {
      dispatch(startLoading());
      dispatch(logInError({ signIn: error.message }));
      dispatch(stopLoading());
    }
  };
};

export const signInWithGoogleProvider = () => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const credential = await signInWithPopup(auth, googleProvider);
      dispatch(stopLoading());
      if (credential) {
        const user = credential.user;
        dispatch(logInWithGoogle(user));
        alert("userCreated!");
      }
    } catch (error) {
      dispatch(startLoading());
      dispatch(logInError({ signIn: error.message }));
      dispatch(stopLoading());
    }
  };
};

export const signInWithGithubProvider = () => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const credential = await signInWithPopup(auth, githubProvider);
      dispatch(stopLoading());
      if (credential) {
        const user = credential.user;
        dispatch(logInWithGithub(user));
        alert("UserCreated!");
      }
    } catch (error) {
      dispatch(startLoading());
      dispatch(logInError({ signIn: error.message }));
      dispatch(stopLoading());
    }
  };
};

export const signOutUser = () => {
  return async (dispatch) => {
    try {
      await signOut(auth);
      dispatch(logOutUser());
    } catch (error) {
      console.log(error);
    }
  };
};
