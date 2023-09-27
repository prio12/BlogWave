import { createBrowserRouter } from "react-router-dom";
import Main from "../Pages/Outlet/Main";
import Home from "../Pages/Home/Home/Home";
import OurStory from "../Pages/ourStory/OurStory";
import SignUpMethods from "../Pages/SignUp/SignUpMethods";
import SignUp from "../Pages/SignUp/SignUp";
import SignIn from "../Pages/signIn/signIn/SignIn";
import WriteBlog from "../Pages/write/WriteBlog";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/story",
        element: <OurStory />,
      },
      {
        path: "/writeBlog",
        element: <WriteBlog/>,
      },
    ],
  },
  {
    path: "/signUpMethods",
    element: <SignUpMethods />,
  },
  {
    path: "/signUp",
    element: <SignUp />,
  },
  {
    path: "/signIn",
    element: <SignIn />,
  },
]);
