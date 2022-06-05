import React from "react";
import { CreatedOverview, FooterPub, Navbar, Sidebar } from "../../components";

const Trips = () => {
  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <CreatedOverview />
      </div>
      <FooterPub />
    </>
  );
};

export default Trips;
