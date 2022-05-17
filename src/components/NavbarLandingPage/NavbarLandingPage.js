import React from "react";
import logo from "../../images/logo.png";

const NavbarLandingPage = () => {
  return (
    <div className="flex justify-between items-center mx-28">
      <div className="flex items-center justify-center">
        <img src={logo} alt="logo" />
        <span className="text-light-blue font-extrabold text-3xl ml-2 font-logo">
          TriPari's
        </span>
      </div>
      <ul className="flex p-8 text-medium-blue text-lg">
        <li className="mx-8 text-dark-blue">
          <a href="#home" className="font-bold">
            Home
          </a>
        </li>
        <li className="mx-8">
          <a href="#about">About</a>
        </li>
        <li className="mx-8">
          <a href="#places">Places</a>
        </li>
        <li className="mx-8">
          <a href="#recommendations">Recommendations</a>
        </li>
      </ul>
      <div>
        <button className="py-1 px-6 bg-light-blue text-white rounded-5">
          <a href="#sign-in" className="text-sm">
            Sign in
          </a>
        </button>
      </div>
    </div>
  );
};

export default NavbarLandingPage;
