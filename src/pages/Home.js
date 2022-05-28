import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FooterPub, Navbar, Trip, User } from "../components";
import { logOut } from "../redux/actions";

const Home = () => {
  const [userName, setUserName] = useState("");

  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    dispatch(logOut());
  };

  useEffect(() => {
    setUserName(
      userInfo.username ? userInfo.username : userInfo.email.split("@")[0]
    );
  }, [userInfo]);

  return (
    <div>
      <Navbar userName={userName} />
      <div>
        <h1 className="ml-4 mt-10 text-3xl font-extrabold">Popular Travelers</h1>
        <User />
      </div>
      <div>
        <h1 className="ml-4 mt-10 text-3xl font-extrabold">Popular Trips</h1>
        <Trip />
      </div>
      <FooterPub />
    </div>
  );
};

export default Home;
