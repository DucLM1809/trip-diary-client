import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assests/images/logo.png";
import unknown from "../../assests/images/unknown.png";
import { GoSearch, GoGlobe } from "react-icons/go";
import { FaMapMarkedAlt } from "react-icons/fa";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { FiChevronDown } from "react-icons/fi";

const Navbar = () => {
  return (
    <div className="w-full shadow-lg py-3">
      <div className="flex items-center justify-between mx-6 ">
        <div className="flex justify-start items-center flex-1">
          <div className="flex mr-24">
            <img src={logo} alt="logo" className="w-9" />
            <span className="text-light-blue font-extrabold text-3xl ml-2 font-logo">
              TriPari's
            </span>
          </div>
          <div>
            <form className="flex relative">
              <input
                type="text"
                placeholder="Search"
                className="pl-3 py-3 w-96 rounded-10 border-[0.2px]  border-gray focus:outline-double bg-aqua font-normal"
              ></input>
              <button className="absolute top-3 right-2 text-2xl ">
                <GoSearch />
              </button>
            </form>
          </div>
        </div>
        <div className="flex flex-1 justify-around items-center text-base ml-48">
          <Link to="/create" className="flex flex-col items-center justify-center  hover:text-medium-blue">
            <GoGlobe className="text-2xl" />
            <span className="font-normal">Home</span>
          </Link>

          <Link to="/create" className="flex flex-col items-center justify-center  hover:text-medium-blue">
            <FaMapMarkedAlt className="text-2xl" />
            <span className="font-normal">Trips</span>
          </Link>

          <Link to="/create" className="flex flex-col items-center justify-center  hover:text-medium-blue">
            <BsFillPlusCircleFill className="text-2xl" />
            <span className="font-normal">Create</span>
          </Link>
        </div>
        <div className="flex flex-1 justify-end items-center">
          <img src={unknown} alt="unknown" className="w-10 h-10" />
          <span className="ml-5">Minh Duc Le</span>
          <Link to="/create" className="ml-5 translate-y-[1px]">
            <FiChevronDown />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
