import React from "react";
import banner from "../../images/hero.png";

const HeroSection = () => {
  return (
    <div id="hero" className="flex items-center justify-center mx-28 mt-16">
      <div
        className="w-full h-96 relative 
          after:absolute after:content-[''] 
          after:top-0 after:right-0 after:left-0 after:bottom-0 
        after:bg-black after:opacity-60 after:rounded-10
          "
      >
        <img
          src={banner}
          alt="banner"
          className="w-full h-full object-cover rounded-10"
        />
        <div className="flex flex-col justify-center items-center absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-10">
          <h1 className="text-white text-2xl font-bold mb-6">
            TRAVEL TO EXPLORE
          </h1>
          <p className="text-center max-w-2xl text-white mb-6">
            Don’t let beautiful memories fade. Create your own travel journal in
            our free software for web, iOS and Android. Create an account and
            start today!
          </p>
          <h2 className="text-light-blue text-xl font-bold">LET'S GO</h2>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
