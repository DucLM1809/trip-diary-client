import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="mx-28 mt-16">
      <div className="flex justify-around items-center w-full h-20 bg-light-purple mb-10 rounded-10">
        <p>Copyright © 2022 TriPari’s. All rights reserved</p>
        <ul className="flex p-8 text-base">
          <li className="mx-8">
            <a href="#home">Home</a>
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
