import React from "react";
import { useEffect } from "react";
import { FooterPub, Navbar, HeroSearch } from "../../components";
import TripSearch from "../../components/TripSearch/TripSearch";
import { useSelector, useDispatch } from "react-redux";
import api from "../../api/axios";
import { addSasToken } from "../../redux/actions";

const TripBeforeSearch = () => {
  const dispatch = useDispatch();
  const sasToken = useSelector((state) => state.user.sasToken);
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
    if (!sasToken) {
      getSasToken();
    }
  }, []);

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
