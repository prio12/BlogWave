import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import {
  createUserWithEmailPass,
  fetchAllUsers,
  logInError,
  logInWithGithub,
  logInWithGoogle,
  logOutUser,
  setAuthUser,
  signInWithEmail,
  startLoading,
  stopLoading,
  stopLoadingUpdatedUser,
  updateUserDetails,
} from "../actions/userAuthActions";
import {
  START_LOADING_UPDATE_USER,
  STOP_LOADING_UPDATE_USER,
} from "../actionTypes/actionTypes";

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

//Sending useDetails to the database using this function

const postUserDetails = async (userDetails) => {
  try {
    const response = await fetch("http://localhost:5000/users", {
      method: "POST",
      body: JSON.stringify(userDetails),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    console.log(result);
  } catch (error) {
    // console.log(error);
  }
};

export const createUserWithEmailAndPass = (user) => {
  return async (dispatch) => {
    const inputName = user.name;
    try {
      console.log("startLoading by observer");
      dispatch(startLoading());
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );
      //useDetails for database

      // console.log("stopLoading by observer");
      dispatch(stopLoading());
      if (userCredential) {
        const user = userCredential.user;
        const userDetails = {
          name: inputName,
          email: user.email,
          profilePic: null,
          uid: user.uid,
        };
        console.log(user);
        dispatch(createUserWithEmailPass(user));
        postUserDetails(userDetails);
        alert("User Created!!");
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
        //userDetails for database
        const useDetails = {
          name: user.displayName,
          email: user.email,
          profilePic: user.photoURL,
          uid: user.uid,
        };
        console.log(user);
        dispatch(logInWithGoogle(user));
        postUserDetails(useDetails);
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
        console.log(user);
        //userDetails for database
        const userDetails = {
          name: user.displayName,
          email: user.email,
          profilePic: user.photoURL,
          uid: user.uid,
        };
        postUserDetails(userDetails);
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

export const updateUserProfile = ({ photoURL, displayName, about, uid }) => {
  // console.log(imageUrl);
  return async (dispatch) => {
    try {
      const profileUpdateData = {};

      if (photoURL) {
        profileUpdateData.photoURL = photoURL;
      }
      if (displayName) {
        profileUpdateData.displayName = displayName;
      }
      if (about) {
        profileUpdateData.about = about;
      }

      await updateProfile(auth.currentUser, {
        profileUpdateData,
      });

      const userId = auth.currentUser.uid;
      //updating the Name and photo of the user in db

      const response = await fetch(`http://localhost:5000/users/${userId}`, {
        method: "PUT",
        body: JSON.stringify(profileUpdateData),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const data = await response.json();
      if (data?.result?.modifiedCount > 0) {
        dispatch(fetchUserUpdatedData(uid));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

//adding followers

export const follow = (relationshipInfo) => {
  const { uid } = relationshipInfo?.following;
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:5000/users/${uid}`, {
        method: "PUT",
        body: JSON.stringify(relationshipInfo),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const responseData = await response.json();
    if (responseData?.targetedResult?.modifiedCount > 0) {
      dispatch(fetchUserUpdatedData(uid))
    }
    } catch (error) {}
  };
};

export const fetchUserUpdatedData = (uid) => {
  return async (dispatch) => {
    try {
      dispatch({ type: START_LOADING_UPDATE_USER });
      const response = await fetch(`http://localhost:5000/users/${uid}`);
      const data = await response.json();
      if (data) {
        dispatch({ type: STOP_LOADING_UPDATE_USER });
        dispatch(updateUserDetails(data));
      }
    } catch (error) {
      console.log(error);
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

//fetch ALL users

export const getAllUsers = () => {
  return async (dispatch) => {
    // dispatch(startLoading())
    try {
      const response = await fetch("http://localhost:5000/users");
      const data = await response.json();

      if (data) {
        dispatch(fetchAllUsers(data));
        // dispatch(stopLoading())
      }
    } catch (error) {
      console.log(error);
    }
  };
};


