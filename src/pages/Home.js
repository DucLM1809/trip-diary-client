import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FooterPub, Navbar, Trip, User } from "../components";
import { logOut } from "../redux/actions";
import api from "../api/axios";


const Home = () => {
  const [profile, setProfile] = useState();

  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    dispatch(logOut());
  };

  const accessToken = localStorage
    .getItem("accessToken")
    ?.toString()
    .split('"')[1];

  const config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
  };

  if (accessToken) {
    config.headers.Authorization = `bearer ${accessToken}`;
  }

  const handleGetProfile = async () => {
    let res = await api
      .get("/users/me", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          Authorization: `bearer ${accessToken}`,
        },
      })
      .catch((error) => console.log(error));
    if (res) {
      console.log(res.data);
      setProfile(res.data);
    }
  };

  useEffect(() => {
    handleGetProfile();
  }, [])

  return (
    <div>
      <Navbar />
      <div>
        <h1 className="ml-4 mt-10 text-3xl font-extrabold">Travelers</h1>
        <User />
      </div>
      <div>
        <h1 className="ml-4 mt-10 text-3xl font-extrabold">Trips</h1>
        <Trip />
      </div>
      <FooterPub />
    </div>
  );
};

export default Home;
