import React from "react";
import des4 from "../../assests/images/Destination4.png";
import unknown from "../../assests/images/unknown.png";
import { FaSuitcaseRolling } from "react-icons/fa";

const User = () => {
  return (
    <div className="pt-8 flex px-3 flex-wrap">
      <div className="w-[360px] relative mb-8">
        <img src={des4} alt="" />
        <div
          className="bg-white absolute w-[348.7px] h-[180px] bottom-0 right-[6px] rounded-10 shadow-lg 
        flex flex-col items-center justify-center
        "
        >
          <h1 className="text-xl mt-3">Amber Heard</h1>
          <h2 className="opacity-40">United States</h2>
          <div className="mt-3 flex justify-center items-center gap-2">
            <FaSuitcaseRolling className="text-2xl" />
            <div className="flex flex-col justify-center">
              <span className="leading-4">33</span>
              <span className="leading-4 opacity-40">Trips</span>
            </div>
          </div>
        </div>
        <img
          src={unknown}
          alt=""
          className="w-[80px] h-[80px] absolute top-[40px] left-1/2 -translate-x-1/2 rounded-[50%] border-1 border-white"
        />
      </div>
      <div className="w-[360px] relative mb-8">
        <img src={des4} alt="" />
        <div
          className="bg-white absolute w-[348.7px] h-[180px] bottom-0 right-[6px] rounded-10 shadow-lg 
        flex flex-col items-center justify-center
        "
        >
          <h1 className="text-xl mt-3">Amber Heard</h1>
          <h2 className="opacity-40">United States</h2>
          <div className="mt-3 flex justify-center items-center gap-2">
            <FaSuitcaseRolling className="text-2xl" />
            <div className="flex flex-col justify-center">
              <span className="leading-4">33</span>
              <span className="leading-4 opacity-40">Trips</span>
            </div>
          </div>
        </div>
        <img
          src={unknown}
          alt=""
          className="w-[80px] h-[80px] absolute top-[40px] left-1/2 -translate-x-1/2 rounded-[50%] border-1 border-white"
        />
      </div>
      <div className="w-[360px] relative mb-8">
        <img src={des4} alt="" />
        <div
          className="bg-white absolute w-[348.7px] h-[180px] bottom-0 right-[6px] rounded-10 shadow-lg 
        flex flex-col items-center justify-center
        "
        >
          <h1 className="text-xl mt-3">Amber Heard</h1>
          <h2 className="opacity-40">United States</h2>
          <div className="mt-3 flex justify-center items-center gap-2">
            <FaSuitcaseRolling className="text-2xl" />
            <div className="flex flex-col justify-center">
              <span className="leading-4">33</span>
              <span className="leading-4 opacity-40">Trips</span>
            </div>
          </div>
        </div>
        <img
          src={unknown}
          alt=""
          className="w-[80px] h-[80px] absolute top-[40px] left-1/2 -translate-x-1/2 rounded-[50%] border-1 border-white"
        />
      </div>
      <div className="w-[360px] relative mb-8">
        <img src={des4} alt="" />
        <div
          className="bg-white absolute w-[348.7px] h-[180px] bottom-0 right-[6px] rounded-10 shadow-lg 
        flex flex-col items-center justify-center
        "
        >
          <h1 className="text-xl mt-3">Amber Heard</h1>
          <h2 className="opacity-40">United States</h2>
          <div className="mt-3 flex justify-center items-center gap-2">
            <FaSuitcaseRolling className="text-2xl" />
            <div className="flex flex-col justify-center">
              <span className="leading-4">33</span>
              <span className="leading-4 opacity-40">Trips</span>
            </div>
          </div>
        </div>
        <img
          src={unknown}
          alt=""
          className="w-[80px] h-[80px] absolute top-[40px] left-1/2 -translate-x-1/2 rounded-[50%] border-1 border-white"
        />
      </div>
    </div>
  );
};

export default User;
