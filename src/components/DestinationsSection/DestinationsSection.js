import React from "react";
import destination1 from "../../images/Destination1.png";

const DestinationsSection = () => {
  return (
    <div className="flex flex-col items-center justify-center mx-28 mt-16">
      <h1 className="mt-6 mb-20 text-3xl font-bold">
        Recommended Destinations
      </h1>
      <div className="flex gap-10">
        <div className="w-1/4 py-8 px-4 bg-aqua rounded-10 shadow-lg mb-12">
          <img src={destination1} alt="" />
          <h2 className="font-bold my-3">Singapore</h2>
          <span className="font-normal">
            Singapore, officialy thr Republic of Singapore...
          </span>
        </div>
        <div className="w-1/4 py-8 px-4 bg-aqua rounded-10 shadow-lg mb-12">
          <img src={destination1} alt="" />
          <h2 className="font-bold my-3">Singapore</h2>
          <span className="font-normal">
            Singapore, officialy thr Republic of Singapore...
          </span>
        </div>
        <div className="w-1/4 py-8 px-4 bg-aqua rounded-10 shadow-lg mb-12">
          <img src={destination1} alt="" />
          <h2 className="font-bold my-3">Singapore</h2>
          <span className="font-normal">
            Singapore, officialy thr Republic of Singapore...
          </span>
        </div>
        <div className="w-1/4 py-8 px-4 bg-aqua rounded-10 shadow-lg mb-12">
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
