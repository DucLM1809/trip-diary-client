import React from "react";
import { Link } from "react-router-dom";
import des5 from "../../assests/images/Destination5.png";
import des3 from "../../assests/images/Destination3.png";
import unknown from "../../assests/images/unknown.png";

const destinations = (img) => {
  return (
    <div className="w-[25%] relative  mb-8 hover:scale-[1.02] hover:duration-[0.1s] hover:ease-in">
      <Link to="/home">
        <img src={img} alt="" className="opacity-100" />
        <div className="w-[97%] h-[95%] bg-black absolute top-[4px] left-[7.3px] opacity-20 rounded-10"></div>
        <div className="absolute text-white font-bold bottom-10 left-8 text-2xl">
          Paris
        </div>
      </Link>
    </div>
  );
};

const TripSearch = () => {
  return (
    <div>
      <div className="flex flex-col">
        <h1 className="ml-4 mt-10 text-3xl font-extrabold">
          Go with TriPari's
        </h1>
        <div className="pt-8 flex px-3 flex-between bg-[#f2f4f5]">
          <div className="w-1/3 flex flex-col items-center justify-left pr-4">
            <h1 className="flex  text-left text-5xl w-3/4 mb-20 mt-20 font-black">
              Take a trip with TripPari’s
            </h1>
            <p className="flex  text-left text-2xl w-3/4 font-medium">
              TriPari’s is a platform that connects you with an experienced
              traveler or with an expat living in that corner of the world you
              are interested in. You can buy the trip as a package with a
              ticket, accommodation and even experiences. You don't have to
              worry about anything!
            </p>
          </div>
          <div className="w-2/3 flex flex-wrap justify-center">
            <div className="w-[450px] relative mb-8  hover:scale-[1.02] hover:duration-[0.1s] hover:ease-in">
              <Link to="/home">
                <img src={des5} alt="" className="opacity-100" />
                
              </Link>
            </div>
            <div className="w-[450px] relative ml-16 mb-8 hover:scale-[1.02] hover:duration-[0.1s] hover:ease-in">
              <Link to="/home">
                <img src={des5} alt="" className="opacity-100" />
                
              </Link>
            </div>
            <div className="w-[450px] relative mb-8 hover:scale-[1.02] hover:duration-[0.1s] hover:ease-in">
              <Link to="/home">
                <img src={des5} alt="" className="opacity-100" />
                
              </Link>
            </div>
            <div className="w-[450px] relative ml-16 mb-8 hover:scale-[1.02] hover:duration-[0.1s] hover:ease-in">
              <Link to="/home">
                <img src={des5} alt="" className="opacity-100" />
                
              </Link>
            </div>
          </div>
        </div>
        <h1 className="ml-4 mt-20 text-3xl font-extrabold">
          Can’t decide where? Get inspired
        </h1>
        <div className="pt-8 flex px-3 flex-between bg-[#f2f4f5]">
          {destinations(des3)}
          {destinations(des5)}
          {destinations(des3)}
          {destinations(des5)}
        </div>
      </div>
    </div>
  );
};

export default TripSearch;
