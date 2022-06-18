import React from "react";
import { useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { FaCalendarAlt } from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";
import { AiFillPicture } from "react-icons/ai";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";

function Itinerary() {
  const [locations, setLocations] = useState([]);

  const handleAddLoc = () => {
    var newloc = locations.length + 1;
    console.log(locations);
    setLocations((prev) => [...prev, newloc]);
  };

  const handleDel = (index) =>{   
    var arr = locations
    arr.splice(index,1);
    setLocations(() => [...arr]);
    
    
  }

  return (
    <div className="flex w-full h-[80vh] mx-48 my-16">
      <div className=" flex justify-between w-full h-full bg-aqua mb-10 rounded-10 shadow-lg  overflow-y-auto">
        <div className="w-full">
          <div className="w-full flex justify-between ">
            <button
              className="flex items-center hover:text-medium-blue cursor-pointer"
              onClick={handleAddLoc}
            >
              <AiFillPlusCircle className="text-6xl inline-block  pl-4 " />
              <h1 className="text-xl ml-2 ">Add location</h1>
            </button>

            <div>
              <button className="bg-dark-blue py-[0.5rem] mt-4 mb-2 mr-3 font-semibold text-white rounded-3 hover:opacity-90 hover:text-gray w-[75px]">
                Save
              </button>
            </div>
          </div>
          {locations.map((location,index) => {
            return (
              <div className>
                <div
                  key={location}
                  className="flex justify-between w-100 py-[5px] "
                >
                  <span className="text-xl pl-4">Location {location}</span>
                  <div className="flex-grow border-t-[0.7px]  my-auto mx-4"></div>
                  <span className="flex justify-end pr-4 align-middle w-[12rem] items-center">
                    <FaCalendarAlt className=" my-auto" />
                    <p className="ml-2 pr-2">Date</p>
                    <input
                      type="date"
                      className="border-solid border-gray border-1   w-[7rem]  rounded-3 font-normal text-sm outline-medium-blue "
                    />
                  </span>
                </div>

                <form className="flex flex-col items-center mb-5">
                  <div className="flex justify-between w-4/5 mt-3">
                    <p className="text-[#666666]">Location</p>
                    <HiLocationMarker className="my-auto" />
                  </div>
                  <div className="w-4/5 flex">
                    <input
                      type="text"
                      placeholder="Location"
                      className="border-solid border-gray border-1  w-full  p-3 rounded-3 font-normal text-sm outline-medium-blue"
                    />
                  </div>

                  <div className="flex justify-between w-4/5 mt-3">
                    <p className="text-[#666666]">Images</p>
                    <AiFillPicture className="my-auto" />
                  </div>
                  <div className="w-4/5 flex">
                    <input
                      type="file"
                      multiple
                      placeholder="Location"
                      className="border-solid border-gray border-1  w-full  p-3 rounded-3 font-normal text-sm outline-medium-blue"
                    />
                  </div>

                  <div className="flex justify-between w-4/5 mt-3">
                    <p className="text-[#666666]">Description</p>
                    <BsFillBookmarkHeartFill className="my-auto" />
                  </div>
                  <div className="w-4/5 flex overflow-y-auto">
                    <textarea
                      rows="5"
                      cols="50"
                      name="description"
                      placeholder="Description"
                      className="border-solid border-gray border-1  w-full  p-3 rounded-3 font-normal text-sm outline-medium-blue"
                    />
                  </div>
                  
                </form>
                <div key={index} className="flex justify-betwwen w-2/5 mt-3 mb-3 pb-3 mx-auto">
                    <div className="flex-grow border-t-[0.7px]  my-auto mx-4"></div>
                    <button onClick={() =>handleDel(index)} className="hover:text-medium-blue cursor-pointer"><AiFillCloseCircle className="flex justify-center py-auto text-4xl" /></button>
                    <div className="flex-grow border-t-[0.7px]  my-auto mx-4"></div>
                  </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Itinerary;
