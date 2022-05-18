import React from "react";
import { Link as LinkR } from "react-scroll";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";

const NavbarLandingPage = () => {
  return (
    <div id="home" className="flex justify-between items-center mx-28">
      <div className="flex items-center justify-center">
        <img src={logo} alt="logo" />
        <span className="text-light-blue font-extrabold text-3xl ml-2 font-logo">
          TriPari's
        </span>
      </div>
      <ul className="flex p-8 text-medium-blue text-lg">
        <li className="mx-8 cursor-pointer" >
          <LinkR
            to="home"
            smooth={true}
            duration={500}
            spy={true}
            exact="true"
            activeClass="active"
            className="hover:text-dark-blue hover:font-bold"
          >
            Home
          </LinkR>
        </li>
        <li className="mx-8 cursor-pointer">
          <LinkR
            to="about"
            smooth={true}
            duration={500}
            spy={true}
            exact="true"
            activeClass="active"
            className="hover:text-dark-blue hover:font-bold"
          >
            About
          </LinkR>
        </li>
        <li className="mx-8 cursor-pointer">
          <LinkR
            to="services"
            smooth={true}
            duration={500}
            spy={true}
            exact="true"
            activeClass="active"
            className="hover:text-dark-blue hover:font-bold"
          >
            Services
          </LinkR>
        </li>
        <li className="mx-8 cursor-pointer">
          <LinkR
            to="destinations"
            smooth={true}
            duration={500}
            spy={true}
            exact="true"
            activeClass="active"
            className="hover:text-dark-blue hover:font-bold"
          >
            Recommendations
          </LinkR>
        </li>
      </ul>
      <div>
        <button className="py-1 px-6 bg-light-blue text-white rounded-5 hover:bg-medium-blue">
          <a href="/sign-in" className="text-sm ">
            SIGN IN
          </a>
        </button>
      </div>
    </div>
  );
};

export default NavbarLandingPage;
