import React from "react";
import { FooterPub, Navbar, HeroSearch } from "../../components";
import TripSearch from "../../components/TripSearch/TripSearch";

const TripBeforeSearch = () => {
  return (
    <div>
      <Navbar />
      <HeroSearch />
      <TripSearch />
      <FooterPub />
    </div>
  );
};

export default TripBeforeSearch;
