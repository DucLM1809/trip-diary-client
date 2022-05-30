import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link  } from "react-router-dom";

const Footer = () => {
  return (
    <div className="flex justify-around items-center w-full h-[100px] bg-sky">
      <p>Copyright © 2022 TriPari’s. All rights reserved</p>
      <ul className="flex p-8 text-base">
        <li className="mx-8 cursor-pointer hover:text-light-blue">
          <Link
            to="/home"
          >
            Home
          </Link>
        </li>
        <li className="mx-8 cursor-pointer hover:text-light-blue">
          <Link
            to="/trips"
          >
            Trips
          </Link>
        </li>
        <li className="mx-8 cursor-pointer hover:text-light-blue">
          <Link
            to="/create"
          >
            Create
          </Link>
        </li>
        
      </ul>
      <div className="flex items-center gap-6 text-2xl">
        <a href="" className="hover:text-light-blue">
          <FaFacebook />
        </a>
        <a href="" className="hover:text-light-blue">
          <FaInstagram />
        </a>
        <a href="" className="hover:text-light-blue">
          <FaLinkedin />
        </a>
      </div>
    </div>
  );
};

export default Footer;
