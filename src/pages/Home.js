import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FooterPub, Navbar, Trip, User } from "../components";
import { logOut } from "../redux/actions";
import api from "../api/axios";
import { addSasToken } from "../redux/actions";

const Home = () => {
  const [userName, setUserName] = useState("");

  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);
  const sasToken = useSelector((state) => state.user.sasToken);

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
    },
  };

  if (accessToken) {
    config.headers.Authorization = `bearer ${accessToken}`;
  }
  const getSasToken = async () => {
    let res = await api
      .get("https://triparis.work/api/v1/users/blob-sas", config)
      .catch((error) => console.log(error));
    if (res) {
      const sasToken = res.data.sasToken;
      console.log(sasToken);
      dispatch(addSasToken(sasToken));
    }
  };
  useEffect(() => {
    setUserName(
      userInfo.username ? userInfo.username : userInfo.email.split("@")[0]
    );
    if (!sasToken) {
      getSasToken();
    }
  }, [userInfo]);

  return (
    <div>
      <Navbar userName={userName} />
      <div>
        <h1 className="ml-4 mt-10 text-3xl font-extrabold">
          Popular Travelers
        </h1>
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
