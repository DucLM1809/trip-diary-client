import React from "react";
import { Link } from "react-router-dom";
import { FaSuitcaseRolling, FaListAlt } from "react-icons/fa";
import { BiDirections } from "react-icons/bi";

const Sidebar = () => {
  return (
    <div className="flex flex-col bg-dark-gray h-auto w-[100px] relative">
      <Link to="#overview"
        className="flex flex-col items-center justify-center text-dark-white 
        hover:text-light-blue focus:text-light-blue focus:after:absolute 
        focus:after:w-[6px] focus:after:h-[68px] focus:after:bg-light-blue 
        focus:after:top-0 focus:after:right-[2px] focus:after:rounded-3"
      >
        <FaSuitcaseRolling className="mt-3 text-3xl" />
        <span className="font-normal">Overview</span>
      </Link>
      <Link to="#itinerary"
        className="flex flex-col items-center justify-center text-dark-white 
        hover:text-light-blue focus:text-light-blue focus:after:absolute 
        focus:after:w-[6px] focus:after:h-[68px] focus:after:bg-light-blue 
        focus:after:top-[68px] focus:after:right-[2px] focus:after:rounded-3"
      >
        <BiDirections className="mt-3 text-3xl" />
        <span className="font-normal">Itinerary</span>
      </Link>
      <Link to="#check-list"
        className="flex flex-col items-center justify-center text-dark-white 
        hover:text-light-blue focus:text-light-blue focus:after:absolute 
        focus:after:w-[6px] focus:after:h-[68px] focus:after:bg-light-blue 
        focus:after:top-[136px] focus:after:right-[2px] focus:after:rounded-3"
      >
        <FaListAlt className="mt-3 text-3xl" />
        <span className="font-normal">Checklist</span>
      </Link>
    </div>
  );
};

export default Sidebar;
