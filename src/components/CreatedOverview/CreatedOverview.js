import React, { useMemo } from "react";
import banner from "../../assests/images/hero.png";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { IoAirplane } from "react-icons/io5";
import { IoSend } from "react-icons/io5";
import { FaMapMarkerAlt, FaMapPin, FaRegComment } from "react-icons/fa";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import destination1 from "../../assests/images/Destination1.png";
import unknown from "../../assests/images/unknown.png";

const CreatedOverview = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDAlsOlLHsgwjxpE-Vy3kylucbFURIPH5g",
    libraries: "places",
  });

  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  const center = useMemo(() => ({ lat: 43.45, lng: -80.49 }), []);

  return (
    <div className="flex flex-col justify-center mx-auto mt-10 max-w-[1100px]">
      <div
        className="w-full h-96 relative 
          after:absolute after:content-[''] 
          after:top-0 after:right-0 after:left-0 after:bottom-0 
        after:bg-black after:opacity-25 after:rounded-10"
      >
        <img
          src={banner}
          className="min-w-full h-full object-cover rounded-10 relative"
        />
      </div>
      <div className="shadow-lg border-1 border-gray h-fit my-10 py-10 rounded-10">
        <h1 className="text-3xl text-center mb-14">My Trip to the Future</h1>
        <div className="flex justify-between items-center mx-10 relative font-bold text-xl">
          <div>From: HoChiMinh City</div>
          <div className="absolute left-[36%]">
            <FaMapMarkerAlt />
          </div>
          <div className="text-green before:w-[100px] before:h-[1px] before:bg-black before:absolute before:top-[50%] before:left-[40%] after:w-[100px] after:h-[1px] after:bg-black after:absolute after:top-[50%] after:right-[33%]">
            <IoAirplane />
          </div>
          <div className="absolute right-[29%]">
            <FaMapPin />
          </div>
          <div>To: DaLat City</div>
        </div>
        <div className="w-full h-[500px] my-10">
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={6}
            >
              <Marker position={center} />
              {/* <Marker position={coordinate2} /> */}
            </GoogleMap>
          ) : (
            <></>
          )}
        </div>
        <div className="flex flex-col items-start mx-10 mb-10 relative text-xl">
          <h1 className="mb-2">Visited Places</h1>
          <div className="flex flex-wrap gap-1">
            <div className="relative">
              <img src={destination1} alt="" className="w-[250px] h-[250px]" />
              <div className="flex justify-center items-center absolute bottom-5 left-5 text-2xl">
                <FaMapMarkerAlt className="text-green" />
                <span className="text-xl text-white ml-1">Singapore</span>
              </div>
            </div>
            <div className="relative">
              <img src={destination1} alt="" className="w-[250px] h-[250px]" />
              <div className="flex justify-center items-center absolute bottom-5 left-5 text-2xl">
                <FaMapMarkerAlt className="text-green" />
                <span className="text-xl text-white ml-1">Singapore</span>
              </div>
            </div>
            <div className="relative">
              <img src={destination1} alt="" className="w-[250px] h-[250px]" />
              <div className="flex justify-center items-center absolute bottom-5 left-5 text-2xl">
                <FaMapMarkerAlt className="text-green" />
                <span className="text-xl text-white ml-1">Singapore</span>
              </div>
            </div>
            {/* className="relative before:absolute before:rounded-5 before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-black before:opacity-25" */}
            <div className="relative">
              <img src={destination1} alt="" className="w-[250px] h-[250px]" />
              <div className="flex justify-center items-center absolute bottom-5 left-5 text-2xl">
                <FaMapMarkerAlt className="text-green" />
                <span className="text-xl text-white ml-1">Singapore</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start mx-10 relative">
          <h1 className="mb-2 text-xl">Description</h1>
          <div className="mb-6">
            <p className="font-medium">This is a beautiful day!</p>
            <p className="font-medium">This is a beautiful day!</p>
            <p className="font-medium">This is a beautiful day!</p>
            <p className="font-medium">This is a beautiful day!</p>
            <p className="font-medium">This is a beautiful day!</p>
          </div>
          <div className="w-full border-1 border-gray rounded-5">
            <div className="w-full flex border-b-1 border-b-gray">
              <div className="flex items-center m-2">
                <AiOutlineHeart className="text-3xl " />
                <span className="text-base ml-1">1 Like</span>
              </div>
              <div className="flex items-center text-2xl m-2">
                <FaRegComment />
                <span className="text-base ml-1">0 Comment</span>
              </div>
            </div>
            <form className="my-4 flex relative">
              <img src={unknown} alt="" className="w-[50px] h-[50px] ml-4" />
              <input
                type="text"
                placeholder="Enter comment..."
                className="mx-4 px-4 border-1 border-gray w-full rounded-5"
              />
              <button className="absolute right-8 top-4 text-xl text-green hover:opacity-80">
                <IoSend />
              </button>
            </form>

            <div className="mb-10 flex-col">
              <div className="flex">
                <img src={unknown} alt="" className="w-[50px] h-[50px] ml-4" />
                <div className="ml-4 bg-aqua rounded-5 py-2 px-4">
                  <div className="flex items-center gap-2">
                    <h2>Tran Thanh Quang</h2>
                    <span className="text-xs text-placeholder">
                      06/06/2022, 03:21:17
                    </span>
                  </div>
                  <p className="text-sm font-normal">You are so handsome</p>
                </div>
              </div>
              <span className="ml-24 text-xs hover:opacity-80 cursor-pointer">
                Reply
              </span>
              <form className="ml-20 mt-4 flex relative">
                <img src={unknown} alt="" className="w-[50px] h-[50px] ml-4" />
                <input
                  type="text"
                  placeholder="Enter comment..."
                  className="mx-4 px-4 border-1 border-gray w-full rounded-5"
                />
                <button className="absolute right-8 top-4 text-xl text-green hover:opacity-80">
                  <IoSend />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatedOverview;
