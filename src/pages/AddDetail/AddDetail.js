import React from "react";
import { AddDetailBody, Navbar, Sidebar, Footer } from "../../components";


const Create = () => {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <AddDetailBody />
      </div>
      <Footer />
    </div>
  );
};

export default Create;
