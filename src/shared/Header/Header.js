import { React, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import "./Header.css";
const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="mb-24 ">
      <nav className=" navbar-container  p-5 shadow-md md:border-b-2 md:border-black nav-background">
        <div className="container mx-auto flex justify-between items-center">
          <Link
            to="/"
            style={{ fontFamily: "'Roboto Slab', serif" }}
            className=" text-4xl font-extrabold"
          >
            BlogWave
          </Link>

          <div className="md:hidden">
            <button className="text-white" onClick={toggleDropdown}>
              <AiOutlineMenu className="mr-1" />
            </button>
            {isDropdownOpen && (
              <div className="absolute bg-white mt-2 p-2 rounded shadow-md right-0">
                <Link to="/story" className="block text-black mb-1">
                  Our Story
                </Link>
              </div>
            )}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link to="/story" className="text-sm font-semibold">Our Story</Link>
            <button
              style={{
                backgroundColor: "black",
                borderRadius: "20px",
                padding: "10px 20px",
                fontFamily: "'Roboto Slab', serif",
                color: "white",
                border: "none",
              }}
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
