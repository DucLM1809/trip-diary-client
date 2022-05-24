import React from "react";
import destination1 from "../../assests/images/Destination1.png";

const DestinationsSection = () => {
  return (
    <div
      id="destinations"
      className="flex flex-col items-center justify-center mx-28 mt-16"
    >
      <h1 className="mt-6 mb-20 text-3xl font-bold">
        Recommended Destinations
      </h1>
      <div className="flex gap-10">
        <div
          className="w-1/4 py-8 px-4 bg-aqua rounded-10 shadow-lg mb-12
          hover:translate-x-[0.4rem] hover:translate-y-[-1rem] hover:shadow-[0px_5px_15px_rgb(0,0,0,0.35)] hover:duration-300"
        >
          <img src={destination1} alt="" />
          <h2 className="font-bold my-3">Singapore</h2>
          <span className="font-normal">
            Singapore, officialy thr Republic of Singapore...
          </span>
        </div>
        <div
          className="w-1/4 py-8 px-4 bg-aqua rounded-10 shadow-lg mb-12
          hover:translate-x-[0.4rem] hover:translate-y-[-1rem] hover:shadow-[0px_5px_15px_rgb(0,0,0,0.35)] hover:duration-300"
        >
          <img src={destination1} alt="" />
          <h2 className="font-bold my-3">Singapore</h2>
          <span className="font-normal">
            Singapore, officialy thr Republic of Singapore...
          </span>
        </div>
        <div
          className="w-1/4 py-8 px-4 bg-aqua rounded-10 shadow-lg mb-12
          hover:translate-x-[0.4rem] hover:translate-y-[-1rem] hover:shadow-[0px_5px_15px_rgb(0,0,0,0.35)] hover:duration-300"
        >
          <img src={destination1} alt="" />
          <h2 className="font-bold my-3">Singapore</h2>
          <span className="font-normal">
            Singapore, officialy thr Republic of Singapore...
          </span>
        </div>
        <div
          className="w-1/4 py-8 px-4 bg-aqua rounded-10 shadow-lg mb-12
          hover:translate-x-[0.4rem] hover:translate-y-[-1rem] hover:shadow-[0px_5px_15px_rgb(0,0,0,0.35)] hover:duration-300"
        >
          <img src={destination1} alt="" />
          <h2 className="font-bold my-3">Singapore</h2>
          <span className="font-normal">
            Singapore, officialy thr Republic of Singapore...
          </span>
        </div>
      </div>
    </div>
  );
};

export default DestinationsSection;
