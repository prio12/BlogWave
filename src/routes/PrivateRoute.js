import React from "react";
import { useSelector } from "react-redux";
import Loader from "../loading/Loader";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const PrivateRoute = ({ children }) => {
  const user = useSelector((state) => state?.user?.user?.uid);
  const loading = useSelector((state) => state?.user?.isLoading);
  const navigate = useNavigate(); // Get the navigate function

  if (loading) {
    return <Loader />; // Render the Loader when loading is true
  }

  if (user) {
    return children;
  }

  // Use navigate to redirect the user to another page
  navigate("/signIn"); // Redirect to the signIn page

  // You can also return null here to prevent rendering anything
//   return null;
};

export default PrivateRoute;
