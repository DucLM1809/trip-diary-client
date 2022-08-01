import React, { useState, useEffect } from "react";
import "./UserHomePage.css";
import { BiFilter } from "react-icons/bi";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/FooterPub/Footer";
import { AiFillCamera } from "react-icons/ai";
import { AiFillPlusCircle } from "react-icons/ai";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper";
import unknown from "../../assests/images/unknown.png";
import hero from "../../assests/images/hero.png";
import api from "../../api/axios";
import { useSelector } from "react-redux";
import banner from "../../assests/images/hero.png";
import { v4 as uuidv4 } from "uuid";
import { Modal } from "../../components";
import moment from "moment";

const OtherUserHomePage = () => {
  const [trips, setTrips] = useState([]);
  const [type, setType] = useState(null);
  const [scope, setScope] = useState(null);
  const [display, setDisplay] = useState(false);
  const [displayArea, setDisplayArea] = useState(false);
  const [meId, setMeId] = useState();

  const location = useLocation();

  const myprofile = useSelector((state) => state.profile);

  const userName = localStorage.getItem("username");

  const accessToken = localStorage
    .getItem("accessToken")
    .toString()
    .split('"')[1];

  const config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
    // params: {
    //   type: type,
    //   scope: scope,
    // },
  };

  if (accessToken) {
    config.headers.Authorization = `bearer ${accessToken}`;
  }

  const handleGetTrips = async () => {
    let res = await api.get("/trips", {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        Authorization: `bearer ${accessToken}`,
      },
      params: {
        search: location.pathname.split("/")[2],
      },
    });
    if (res) {
      setTrips(res.data);
    }
  };

  const handleGetMe = async () => {
    let res = await api
      .get(`/users/me`, config)
      .catch((error) => console.log(error));
    if (res) {
      setMeId(res.data.id);
    }
  };

  useEffect(() => {
    handleGetTrips();
    handleGetMe();
  }, [location]);

  const handleFilterType = async () => {
    let res = await api
      .get("/trips", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          Authorization: `bearer ${accessToken}`,
        },
        params: {
          type: type,
          search: location.pathname.split("/")[2],
        },
      })
      .catch((error) => console.log(error));
    if (res) {
      setTrips(res.data);
    }
  };

  const handleFilterScope = async () => {
    let res = await api
      .get("/trips", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          Authorization: `bearer ${accessToken}`,
        },
        params: {
          scope: scope,
          search: location.pathname.split("/")[2],
        },
      })
      .catch((error) => console.log(error));
    if (res) {
      setTrips(res.data);
    }
  };

  useEffect(() => {
    handleFilterType();
  }, [type]);

  useEffect(() => {
    handleFilterScope();
  }, [scope]);

  const handleChooseType = () => {
    setDisplay(!display);
  };

  const handleChooseScope = () => {
    setDisplayArea(!displayArea);
  };

  const handleType = (e) => {
    if (e.target.textContent === "Single") {
      setType("single");
      setDisplay(false);
    } else if (e.target.textContent === "Around") {
      setType("around");
      setDisplay(false);
    } else {
      setType(null);
      setScope(null);
      setDisplay(false);
    }
  };

  const handleScope = (e) => {
    if (e.target.textContent === "Local") {
      setScope("local");
      setDisplayArea(false);
    } else if (e.target.textContent === "Global") {
      setScope("global");
      setDisplayArea(false);
    } else {
      setType(null);
      setScope(null);
      setDisplayArea(false);
    }
  };
  const [nextTrips, setNextTrips] = useState([]);
  const [pastTrips, setPastTrips] = useState([]);

  useEffect(() => {
    setNextTrips([]);
    setPastTrips([]);
    const currentdate = moment().format("YYYY-MM-DD");
    trips.map((trip) => {
      if (trip.isFinished) {
        setPastTrips((prev) => [...prev, trip]);
      } else if (new Date(trip.startAt) > new Date()) {
        setNextTrips((prev) => [...prev, trip]);
      } else {
        setPastTrips((prev) => [...prev, trip]);
      }
    });
  }, [trips]);

  console.log("TRIPS: ", trips);
  console.log("NEXT TRIPS: ", nextTrips);
  console.log("PAST TRIPS: ", pastTrips);

  return (
    <>
      <Navbar />
      <div style={{ backgroundColor: "#F1F5FF" }} className="pb-10">
        <div className="profile">
          <div className="profileRight">
            <div>
              <div className="profileCover">
                <img
                  src={trips[0]?.author?.coverImgUrl || hero}
                  alt=""
                  className="profileCoverImg"
                />
                <img
                  src={trips[0]?.author?.avatarUrl || unknown}
                  alt=""
                  className="profileUserImg object-cover"
                />

                <div className="profileInfo">
                  <h4 className="profileInfoName">
                    {trips[0]?.author?.username}
                  </h4>
                </div>
              </div>
            </div>
            <div className="share">
              <div className="shareWrapper">
                <div className="shareTop">
                  <span className="shareOptionText">Description</span>
                  <br />
                  <div className="text-md">
                    {trips[0]?.author?.description || "Welcome to TriPari's"}
                  </div>
                </div>
              </div>
            </div>
            <br />
            <hr style={{ width: "90%", marginLeft: "5%" }} />
            <div className="smallFilter">
              <div className="f1 cursor-pointer" onClick={(e) => handleType(e)}>
                All trip
              </div>

              <div className="f2 flex flex-col">
                <div
                  className="flex items-center cursor-pointer"
                  onClick={handleChooseScope}
                >
                  <BiFilter display={""} />
                  <span>{scope || "Area"}</span>
                </div>
                <div
                  className={`border-1 border-black rounded-5 mt-2 mb-1 max-w-[150px] cursor-pointer ${
                    displayArea ? "block" : "hidden"
                  }`}
                >
                  <div
                    className="w-full border-b-1 border-gray px-2 py-1 hover:bg-gray rounded-tr-3 rounded-tl-3"
                    onClick={(e) => handleScope(e)}
                  >
                    Local
                  </div>
                  <div
                    className="w-full px-2 py-1  hover:bg-gray rounded-br-3 rounded-bl-3"
                    onClick={(e) => handleScope(e)}
                  >
                    Global
                  </div>
                </div>
              </div>

              <div className="f3 flex flex-col">
                <div
                  className="flex items-center cursor-pointer"
                  onClick={handleChooseType}
                >
                  <BiFilter display={""} />
                  <span>{type || "Type"}</span>
                </div>
                <div
                  className={`border-1 border-black rounded-5 mt-2 mb-1 max-w-[150px] cursor-pointer ${
                    display ? "block" : "hidden"
                  }`}
                >
                  <div
                    className="w-full border-b-1 border-gray px-2 py-1 hover:bg-gray rounded-tr-3 rounded-tl-3"
                    onClick={(e) => handleType(e)}
                  >
                    Single
                  </div>
                  <div
                    className="w-full px-2 py-1  hover:bg-gray rounded-br-3 rounded-bl-3"
                    onClick={(e) => handleType(e)}
                  >
                    Around
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="tripgogo">
          <div className="NextTripSwiper">
            <Swiper
              slidesPerView={3}
              spaceBetween={30}
              freeMode={true}
              pagination={{
                clickable: true,
              }}
              modules={[FreeMode, Pagination]}
              className="mySwiper"
            >
              {nextTrips?.map((trip) =>
                (trip?.author?.id !== meId ? trip?.isPublic : true) ? (
                  <SwiperSlide key={trip.id} className="z-0">
                    <div className="swiperNextTrip">
                      <img
                        className="imgNextTrip object-cover"
                        alt=""
                        src={trip.coverImgUrl ? trip.coverImgUrl : banner}
                      />

                      <div className="CountryNextTrip">
                        <img
                          className="CountryCircle"
                          src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg"
                        />
                      </div>
                      <div className="swiperNextTripText">
                        <Link to={`/trips/trip/${trip.id}`} key={uuidv4()}>
                          <h2 className="tripName">{trip.name} </h2>
                        </Link>
                      </div>
                    </div>
                  </SwiperSlide>
                ) : (
                  <></>
                )
              )}
            </Swiper>
          </div>

          <div className="NextTripTitle_1">
            <Link to="/nexttrip">Next trips</Link>
          </div>
          <div className="UserNextTripHr">
            <hr />
          </div>
          <div className="NextTripButton">
            <Link to="/nexttrip">
              <button className="buttonShow">Show all</button>
            </Link>
          </div>

          <div className="PastTripTitle">
            <Link to="/pasttrip">
              <h1>Past trips</h1>
            </Link>
          </div>

          <div className="PastTripSwiper">
            <Swiper
              slidesPerView={3}
              spaceBetween={30}
              freeMode={true}
              pagination={{
                clickable: true,
              }}
              modules={[FreeMode, Pagination]}
              className="mySwiper"
            >
              {pastTrips.length > 0 ? (
                pastTrips.map((trip) =>
                  (trip?.author?.id !== meId ? trip?.isPublic : true) ? (
                    <SwiperSlide key={trip.id} className="z-0">
                      <div className="swiperNextTrip">
                        <img
                          className="imgNextTrip object-cover"
                          alt=""
                          src={trip.coverImgUrl ? trip.coverImgUrl : banner}
                        />

                        <div className="CountryNextTrip">
                          <img
                            className="CountryCircle"
                            src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg"
                          />
                        </div>
                        <div className="swiperNextTripText">
                          <Link to={`/trips/trip/${trip.id}`} key={uuidv4()}>
                            <h2 className="tripName">{trip.name} </h2>
                          </Link>
                        </div>
                      </div>
                    </SwiperSlide>
                  ) : (
                    <></>
                  )
                )
              ) : (
                <></>
              )}
            </Swiper>
          </div>
          <div className="PastTripButton">
            <Link to="/pasttrip">
              <button className="buttonShow">Show all</button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OtherUserHomePage;
