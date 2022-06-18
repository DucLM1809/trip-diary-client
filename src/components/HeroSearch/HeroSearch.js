import React from "react";
import banner from "../../assests/images/hero.png";

const HeroSearch = () => {
  return (
    <div id="hero" className="flex items-left justify-left mx-4 mt-16">
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
        <div className="flex flex-col justify-left items-left absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 z-10">
          
          <p className="text-left text-5xl max-w-xl text-white mb-6">
          Discover the world and experience authentic traveling
          </p>
          
        </div>
      </div>
    </div>
  );
};

export default HeroSearch;
