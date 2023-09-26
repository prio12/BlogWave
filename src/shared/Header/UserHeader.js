import React from "react";
import Logo from "../../Assests/Blogwave.png";
import SearchBar from "../../Pages/Home/usersHomePage/searchBar/SearchBar";
import {BsPencilSquare} from 'react-icons/bs'
import {AiOutlineSearch} from 'react-icons/ai'
import { Link } from "react-router-dom";
const UserHeader = () => {
  return (
    <div className="w-full flex items-center justify-between px-3 md:px-12" >
      <div className="flex gap-3 items-center">
        <img className="w-32 h-28" src={Logo} alt="" />
        {/* <h4 className="text-xl font-extrabold">BlogWave</h4> */}
        <div className="hidden md:flex">
        <SearchBar />
        </div>
        <AiOutlineSearch className="flex items-center md:hidden"/>
      </div>
      <div className="flex items-center gap-3">
        <Link className="flex items-center gap-3">
        <BsPencilSquare/>
        <p>Write</p>
        </Link>
        <img alt="" className="w-10 h-10 rounded-full ri ri dark:bg-gray-500 ri ri" src="https://source.unsplash.com/40x40/?portrait?4" />
      </div>
    </div>
  );
};

export default UserHeader;
