import React from "react";
import { Link as LinkR } from "react-scroll"
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="mx-28 mt-16">
      <div className="flex justify-around items-center w-full h-20 bg-light-purple mb-10 rounded-10">
        <p>Copyright © 2022 TriPari’s. All rights reserved</p>
        <ul className="flex p-8 text-base">
          <li className="mx-8 cursor-pointer">
            <LinkR
            to="home"
            smooth={true}
            duration={500}
            spy={true}
            exact="true"
            activeClass="active">Home</LinkR>
          </li>
          <li className="mx-8 cursor-pointer">
            <LinkR
            to="about"
            smooth={true}
            duration={500}
            spy={true}
            exact="true"
            activeClass="active">About</LinkR>
          </li>
          <li className="mx-8 cursor-pointer">
            <LinkR
            to="services"
            smooth={true}
            duration={500}
            spy={true}
            exact="true"
            activeClass="active" href="#places">Services</LinkR>
          </li>
          <li className="mx-8 cursor-pointer">
            <LinkR
            to="destinations"
            smooth={true}
            duration={500}
            spy={true}
            exact="true"
            activeClass="active" href="#recommendations">Recommendations</LinkR>
          </li>
        </ul>
        <div className="flex items-center gap-6 text-2xl">
          <a href="">
            <FaFacebook />
          </a>
          <a href="">
            <FaInstagram />
          </a>
          <a href="">
            <FaLinkedin />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
