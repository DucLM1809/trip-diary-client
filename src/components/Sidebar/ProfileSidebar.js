import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineUser, AiOutlineTool } from "react-icons/ai";

const ProfileSidebar = () => {
  const profileRef = useRef();
  const editRef = useRef();
  const location = useLocation();

  const slide1 =
    "text-light-blue after:absolute after:w-[6px] after:h-[80px] after:bg-light-blue after:top-[2px] after:right-[2px] after:rounded-3";

  const slide2 =
    "text-light-blue after:absolute after:w-[6px] after:h-[80px] after:bg-light-blue after:top-[80px] after:right-[2px] after:rounded-3";

  const normalColor = "text-dark-white";

  const handleClick = useEffect(() => {
    if (location.hash === "#profile") {
      profileRef.current.classList.add(...slide1.split(" "));
      profileRef.current.classList.remove(normalColor);
      editRef.current.classList.remove(...slide2.split(" "));
      editRef.current.classList.add(normalColor);
    } else if (location.hash === "#edit") {
      editRef.current.classList.add(...slide2.split(" "));
      editRef.current.classList.remove(normalColor);
      profileRef.current.classList.remove(...slide1.split(" "));
      profileRef.current.classList.add(normalColor);
    }
  }, [location]);

  return (
    <div className="flex flex-col bg-dark-gray h-auto w-[100px] relative">
      <Link
        to="#profile"
        ref={profileRef}
        onClick={handleClick}
        className="flex flex-col items-center justify-center text-dark-white 
        hover:text-light-blue"
      >
        <AiOutlineUser className="mt-6 text-3xl" />
        <span className="font-normal">Profile</span>
      </Link>
      <Link
        to="#edit"
        ref={editRef}
        onClick={handleClick}
        className="flex flex-col items-center justify-center text-dark-white 
        hover:text-light-blue"
      >
        <AiOutlineTool className="mt-6 text-3xl" />
        <span className="font-normal">Edit</span>
      </Link>
    </div>
  );
};

export default ProfileSidebar;
