import React from "react";
import about1 from "../../assests/images/about1.png";
import about2 from "../../assests/images/about2.png";
import about3 from "../../assests/images/about3.png";
import about4 from "../../assests/images/about4.png";

const AboutSection = () => {
  return (
    <div id="about" className="flex flex-col items-center justify-center mx-28 mt-16">
      <h1 className="mt-6 mb-32 text-3xl font-bold">About Us</h1>
      <div className="flex flex-row items-center justify-between gap-60">
        <div className="flex flex-col max-w-sm justify-center items-center">
          <h1 className="font-bold text-4xl mb-10">
            We are inspired by your adventures and travel experiences!
          </h1>
          <p className="font-normal mb-10">
            No matter where in the world you want to go, we can help plan and
            store your journey.
          </p>
          <div className="flex w-48 mr-72">
            <img src={about2} alt="" />
            <img src={about3} alt="" />
            <img src={about4} alt="" />
          </div>
        </div>
        <div className="max-w-lg">
          <img src={about1} alt="" />
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
