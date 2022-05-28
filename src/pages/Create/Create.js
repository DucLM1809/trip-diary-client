import React from "react";
import {
  Background,
  FooterPub,
  Navbar,
  Sidebar,
} from "../../components";

const Create = () => {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <Background />
      </div>
      <FooterPub />
    </div>
  );
};

export default Create;
