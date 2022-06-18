import React from "react";
import { Footer, FooterPub, Navbar, Trip, User } from "../../components";

const AfterSearch = () => {
  return (
    <>
      <Navbar />
      <div>
        <h1 className="ml-4 mt-10 text-3xl font-extrabold">
          Travelers
        </h1>
        <User />
      </div>
      <div>
        <h1 className="ml-4 mt-10 text-3xl font-extrabold">Trips</h1>
        <Trip />
      </div>
      <FooterPub />
    </>
  );
};

export default AfterSearch;
