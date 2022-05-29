import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaSuitcaseRolling, FaListAlt } from "react-icons/fa";
import { BiDirections } from "react-icons/bi";

const Sidebar = () => {
  const overviewRef = useRef();
  const itineraryRef = useRef();
  const checklistRef = useRef();
  const location = useLocation();

  const slide1 =
    "text-light-blue after:absolute after:w-[6px] after:h-[68px] after:bg-light-blue after:top-0 after:right-[2px] after:rounded-3";

  const slide2 =
    "text-light-blue after:absolute after:w-[6px] after:h-[68px] after:bg-light-blue after:top-[68px] after:right-[2px] after:rounded-3";

  const slide3 =
    "text-light-blue after:absolute after:w-[6px] after:h-[68px] after:bg-light-blue after:top-[136px] after:right-[2px] after:rounded-3";

  const normalColor = "text-dark-white";

  const handleClick = useEffect(() => {
    if (location.hash === "#overview") {
      overviewRef.current.classList.add(...slide1.split(" "));
      overviewRef.current.classList.remove(normalColor);
      itineraryRef.current.classList.remove(...slide2.split(" "));
      itineraryRef.current.classList.add(normalColor);
      checklistRef.current.classList.remove(...slide3.split(" "));
      checklistRef.current.classList.add(normalColor);
    } else if (location.hash === "#itinerary") {
      itineraryRef.current.classList.add(...slide2.split(" "));
      itineraryRef.current.classList.remove(normalColor);
      overviewRef.current.classList.remove(...slide1.split(" "));
      overviewRef.current.classList.add(normalColor);
      checklistRef.current.classList.remove(...slide3.split(" "));
      checklistRef.current.classList.add(normalColor);
    } else if (location.hash === "#check-list") {
      checklistRef.current.classList.add(...slide3.split(" "));
      checklistRef.current.classList.remove(normalColor);
      overviewRef.current.classList.remove(...slide1.split(" "));
      overviewRef.current.classList.add(normalColor);
      itineraryRef.current.classList.remove(...slide2.split(" "));
      itineraryRef.current.classList.add(normalColor);
    }
  }, [location]);

  return (
    <div className="flex flex-col bg-dark-gray h-auto w-[100px] relative">
      <Link
        to="#overview"
        ref={overviewRef}
        onClick={handleClick}
        className="flex flex-col items-center justify-center text-dark-white 
        hover:text-light-blue"
      >
        <FaSuitcaseRolling className="mt-3 text-3xl" />
        <span className="font-normal">Overview</span>
      </Link>
      <Link
        to="#itinerary"
        ref={itineraryRef}
        onClick={handleClick}
        className="flex flex-col items-center justify-center text-dark-white 
        hover:text-light-blue"
      >
        <BiDirections className="mt-3 text-3xl" />
        <span className="font-normal">Itinerary</span>
      </Link>
      <Link
        to="#check-list"
        ref={checklistRef}
        onClick={handleClick}
        className="flex flex-col items-center justify-center text-dark-white 
        hover:text-light-blue"
      >
        <FaListAlt className="mt-3 text-3xl" />
        <span className="font-normal">Checklist</span>
      </Link>
    </div>
  );
};

export default Sidebar;
