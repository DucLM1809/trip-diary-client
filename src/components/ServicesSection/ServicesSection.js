import React from "react";
import { RiKeyboardBoxFill } from "react-icons/ri";
import { MdInsertPhoto } from "react-icons/md";

const ServicesSection = () => {
  return (
    <div className="flex flex-col items-center justify-center mx-28 mt-16">
      <h1 className="mt-6 mb-20 text-3xl font-bold">Services</h1>
      <div className="flex gap-10">
        <div className="w-1/3 py-8 px-4 bg-aqua rounded-10 shadow-lg mb-12">
          <span>
            <RiKeyboardBoxFill className="text-purple text-6xl mb-3" />
          </span>
          <h1 className="font-bold mb-3">TELL YOUR STORY</h1>
          <p className="font-normal">
            Easily add stories to your diary in our online editor or app
          </p>
        </div>

        <div className="w-1/3 py-8 px-4 bg-aqua rounded-10 shadow-lg mb-12">
          <span>
            <MdInsertPhoto className="text-purple text-6xl mb-3" />
          </span>
          <h1 className="font-bold mb-3">ADD PHOTOS AND MAPS</h1>
          <p className="font-normal">
            Complete your journal with image gallery
          </p>
        </div>

        <div className="w-1/3 py-8 px-4 bg-aqua rounded-10 shadow-lg mb-12">
          <span>
            <RiKeyboardBoxFill className="text-purple text-6xl mb-3" />
          </span>
          <h1 className="font-bold mb-3">SHARE YOUR DIARY</h1>
          <p className="font-normal">
            Public your diary for everyone to refer from
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;
