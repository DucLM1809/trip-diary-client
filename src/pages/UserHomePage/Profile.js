import React from "react";
import {
  EditProfile,
  FooterPub,
  Navbar,
  ProfileSidebar,
  MyProfile,
} from "../../components";
import { useLocation } from "react-router-dom";

const Profile = () => {
  const location = useLocation();

  return (
    <>
      <div>
        <Navbar />
        <div className="flex">
          <ProfileSidebar />
          {location.hash === "" || location.hash === "#profile" ? (
            <MyProfile />
          ) : location.hash === "#edit" ? (
           <EditProfile />
          )  : (
            <></>
          )}
        </div>
        <FooterPub />
      </div>
    </>
  );
};

export default Profile;
