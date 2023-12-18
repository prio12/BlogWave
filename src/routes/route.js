import { createBrowserRouter } from "react-router-dom";
import Main from "../Pages/Outlet/Main";
import Home from "../Pages/Home/Home/Home";
import OurStory from "../Pages/ourStory/OurStory";
import SignUpMethods from "../Pages/SignUp/SignUpMethods";
import SignUp from "../Pages/SignUp/SignUp";
import SignIn from "../Pages/signIn/signIn/SignIn";
import WriteBlog from "../Pages/write/WriteBlog";
import PrivateRoute from "./PrivateRoute";
import Profile from "../Pages/userDashboard/profile/Profile";
import BlogDetails from "../components/BlogDetails";
import Library from "../Pages/userDashboard/library/Library";
import SearchResults from "../Pages/searchResults/SearchResults";
import VisitProfile from "../components/visitProfile/VisitProfile";
import Followers from "../Pages/followers/Followers";
import Followings from "../Pages/followers/followings/Followings";
import StaffPicksBlogs from "../Pages/stafPickBlogs/StaffPicksBlogs";

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
        element: <PrivateRoute><WriteBlog/></PrivateRoute>,
      },
      {
        path: "/staffPicksBlogs",
        element: <PrivateRoute><StaffPicksBlogs/></PrivateRoute>,
      },
      {
        path: "/searchResults",
        element: <PrivateRoute><SearchResults/></PrivateRoute>,
      },
      {
        path: "/profile",
        element: <PrivateRoute><Profile/></PrivateRoute>,
      },
      {
        path: "/library",
        element: <PrivateRoute><Library/></PrivateRoute>,
      },
      {
        path: "/blogDetails/:id",
        element: <PrivateRoute><BlogDetails/></PrivateRoute>,
      },
      {
        path: "/visitProfile/:id",
        element: <PrivateRoute><VisitProfile/></PrivateRoute>,
      },
      {
        path: "/followers/:id",
        element: <PrivateRoute><Followers/></PrivateRoute>,
      },
      {
        path: "/following/:id",
        element: <PrivateRoute><Followings/></PrivateRoute>,
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
