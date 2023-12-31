import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { signOutUser } from "../../redux/thunk/userAuth";
const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.user?.uid);
  // console.log(user);

  // const toggleDropdown = () => {
  //   setIsDropdownOpen(!isDropdownOpen);
  // };

  const handleScroll = () => {
    const scrolledPosition = window.scrollY;

    if (scrolledPosition > 0) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSignOut = () => {
    // console.log("Sign out button clicked"); // Add this line for debugging
    dispatch(signOutUser());
  };

  return (
    <div>
      <nav
        className={`navbar-container py-5 md:px-12 px-5 md:border-black shadow-md md:border-b-2 ${
          scrolled ? "scrolled-navbar" : "banner-background"
        }`}
        style={{
          transition: "background-color 1s ease ", // Add transition property
          backgroundColor: scrolled ? "#ffffff" : "rgb(224, 179, 16)", // Set initial background color
        }}
      >
        <div className="container mx-auto flex justify-between items-center">
          <Link
            to="/"
            className="font-serif inline-block no-underline    hover:scale-110 transition-transform duration-700"
          >
            <span className="text-2xl font-semibold  ">
              <span></span>Blog
            </span>
            <span className="text-2xl  font-semibold ">
              <span className="text-5xl">W</span>ave
            </span>
          </Link>

          <div className="md:hidden ">
            <Link></Link>
            <Link to="/signUpMethods">
              <button className={scrolled ? "scrolled-button" : "nav-btn"}>
                Get Started
              </button>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link style={{ fontSize: "12px" }} to="/story">
              Our Story
            </Link>
            <Link to="/signIn" style={{ fontSize: "12px" }}>
              Sign In
            </Link>
            {user && (
              <button
                onClick={handleSignOut}
                className={scrolled ? "scrolled-button" : "nav-btn"}
              >
                Log out
              </button>
            )}
            <Link to="/signUpMethods">
              <button
                className={`${scrolled ? "scrolled-button" : "nav-btn"}`}
              >
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
