import React from "react";
import {
  CreatedOverview,
  FooterPub,
  Navbar,
  Sidebar,
  CreatedItinerary,
  CreatedChecklist,
} from "../../components";
import { useLocation } from "react-router-dom";

const Trips = () => {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        {location.hash === "" || location.hash === "#overview" ? (
          <CreatedOverview />
        ) : location.hash === "#itinerary" ? (
          <CreatedItinerary />
        ) : location.hash === "#check-list" ? (
          <CreatedChecklist />
        ) : (
          <></>
        )}
      </div>
      <FooterPub />
    </>
  );
};

export default Trips;
