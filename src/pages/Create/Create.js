import React from "react";
import {
  Checklist,
  FooterPub,
  Itinerary,
  Navbar,
  Overview,
  Sidebar,
} from "../../components";
import { useLocation } from "react-router-dom";




const Create = () => {

  const location = useLocation();


  return (
    <>
    <div>
      <Navbar />
      <div className="flex">
      
        <Sidebar />
        {location.hash === "" || location.hash === "#overview" ? (
          <Overview />
        ) : location.hash === "#itinerary" ? (
          <Itinerary />
        ) : location.hash === "#check-list" ? (
          <Checklist />
        ) : (
          <></>
        )}
      </div>
      <FooterPub />
    </div>
    </>
  );
};

export default Create;
