import React from "react";
import { CreateBody, Navbar, Sidebar } from "../../components";

const Create = () => {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <CreateBody />
      </div>
    </div>
  );
};

export default Create;
