import React, { useState, useEffect } from "react";
import "./UserHomePage.css";
import { BiFilter } from "react-icons/bi";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/FooterPub/Footer";
import { AiFillCamera } from "react-icons/ai";
import { AiFillPlusCircle } from "react-icons/ai";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { MdDelete, MdOutlineFemale, MdOutlineMale } from "react-icons/md";
import { Link } from "react-router-dom";
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
import { format } from "date-fns";

const UserHomePage = () => {
  const [trips, setTrips] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const [type, setType] = useState(null);
  const [scope, setScope] = useState(null);
  const [display, setDisplay] = useState(false);
  const [displayArea, setDisplayArea] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [delId, setDelId] = useState();
  const [infor, setInfor] = useState();
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

  const handleGetInfor = async () => {
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
      setInfor(res.data);
    }
  };

  const openModal = (tripId) => {
    setShowModal((prev) => !prev);
    setDelId(tripId);
  };

  const tripInfo = useSelector((state) => state.trip);

  const handleGetTrips = async () => {
    let res = await api.get("/trips/me", config);
    if (res) {
      setTrips(res.data);
      setIsDeleted(false);
    }
  };

  useEffect(() => {
    handleGetTrips();
    console.log("redux", myprofile);
  }, []);

  useEffect(() => {
    if (isDeleted) {
      handleGetTrips();
    }
  }, [isDeleted]);

  const handleFilterType = async () => {
    let res = await api
      .get("/trips/me", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          Authorization: `bearer ${accessToken}`,
        },
        params: {
          type: type,
        },
      })
      .catch((error) => console.log(error));
    if (res) {
      setTrips(res.data);
      setIsDeleted(false);
    }
  };

  const handleFilterScope = async () => {
    let res = await api
      .get("/trips/me", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          Authorization: `bearer ${accessToken}`,
        },
        params: {
          scope: scope,
        },
      })
      .catch((error) => console.log(error));
    if (res) {
      setTrips(res.data);
      setIsDeleted(false);
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
  const [nexttrips, setNextTrips] = useState([]);
  const [pasttrips, setPastTrips] = useState([]);

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

  return (
    <>
      <Navbar />
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        setIsDeleted={setIsDeleted}
        delId={delId}
      />
      <div style={{ backgroundColor: "#F1F5FF" }} className="pb-10">
        <div className="profile">
          <div className="profileRight">
            <div>
              <div className="profileCover">
                <img
                  src={
                    myprofile
                      ? myprofile.coverImgUrl
                        ? myprofile.coverImgUrl
                        : hero
                      : hero
                  }
                  alt=""
                  className="profileCoverImg"
                />
                <img
                  src={
                    myprofile
                      ? myprofile.avatarUrl
                        ? myprofile.avatarUrl
                        : unknown
                      : unknown
                  }
                  alt=""
                  className="profileUserImg object-cover"
                />

                <div className="profileInfo">
                  <h4 className="profileInfoName">
                    {myprofile
                      ? myprofile.username
                        ? myprofile.username
                        : userName
                      : userName}
                  </h4>
                  <span>
                    {myprofile?.firstName &&
                      myprofile?.lastName &&
                      myprofile?.firstName + " " + myprofile?.lastName + " "}
                    {myprofile?.isFemale ? (
                      <MdOutlineFemale className="inline text-xl" />
                    ) : (
                      <MdOutlineMale className="inline text-xl" />
                    )}
                  </span>
                  <p>
                    {myprofile?.dateOfBirth &&
                      format(
                        Date.parse(myprofile?.dateOfBirth),
                        "MMMM do, yyyy "
                      )}
                  </p>
                </div>
                <Link to="/Profile" className="editProfile">
                  Edit Profile
                </Link>
                {/* <div className="iconcamera cursor-pointer">
                  <button>
                    <AiFillCamera size={"50px"} className="text-white" />
                  </button>
                </div> */}
                <div className="uploadFile1">
                  <input type={"file"} className="opacity-0" disabled />
                </div>
              </div>
            </div>
            <div className="share">
              <div className="shareWrapper">
                <div className="shareTop">
                  <span className="shareOptionText">Description</span>
                  <br />
                  <div className="text-md">
                    {myprofile ? (
                      myprofile.description ? (
                        myprofile.description
                      ) : (
                        <p>Welcome to TriPari</p>
                      )
                    ) : (
                      <></>
                    )}
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
                  className={`border-1 border-black rounded-5 mt-2 mb-1 max-w-[150px] cursor-pointer z-50 ${
                    displayArea ? "block" : "hidden"
                  }`}
                >
                  <div
                    className="w-full border-b-1 border-gray px-2 py-1 hover:bg-gray rounded-tr-3 rounded-tl-3 z-50"
                    onClick={(e) => handleScope(e)}
                  >
                    Local
                  </div>
                  <div
                    className="w-full px-2 py-1  hover:bg-gray rounded-br-3 rounded-bl-3 z-50"
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
              {nexttrips.length > 0 ? (
                nexttrips.map((trip) => (
                  <SwiperSlide key={trip.id} className="z-0">
                    <div className="swiperNextTrip">
                      <img
                        className="imgNextTrip object-cover"
                        alt=""
                        src={trip.coverImgUrl ? trip.coverImgUrl : banner}
                      />

                      <div className="CountryNextTrip">
                        {/* <img
                          className="CountryCircle"
                          src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg"
                        /> */}
                      </div>

                      <div className="swiperImgIcon">
                        <Link
                          to={`/edit/trip/${trip.id}`}
                          className="text-3xl text-gray hover:opacity-80"
                        >
                          <FaEdit />
                        </Link>
                      </div>
                      <div className="swiperDelete">
                        <MdDelete
                          className="text-3xl text-gray hover:opacity-80 cursor-pointer"
                          // onClick={() => handleDeleteTrip(trip.id)}
                          onClick={() => openModal(trip.id)}
                        />
                      </div>
                      <div className="swiperNextTripText">
                        <Link to={`/trips/trip/${trip.id}`} key={uuidv4()}>
                          <h2 className="tripName">{trip.name} </h2>
                        </Link>
                      </div>
                    </div>
                  </SwiperSlide>
                ))
              ) : (
                <></>
              )}
            </Swiper>
          </div>

          <div className="NextTripTitle_1">
            <Link to="/nexttrip">My next trips</Link>
          </div>
          <div className="UserNextTripHr">
            <hr />
          </div>
          <div className="mt-4 translate-x-28  inline">
            <Link to="/create">
              <button>
                <AiFillPlusCircle size={"35px"} />
              </button>
            </Link>
          </div>

          <div className="PastTripTitle">
            <Link to="/pasttrip">
              <h1>My past trips</h1>
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
              {pasttrips.length > 0 ? (
                pasttrips.map((trip) => (
                  <SwiperSlide key={trip.id} className="z-0">
                    <div className="swiperNextTrip">
                      <img
                        className="imgNextTrip object-cover"
                        alt=""
                        src={trip.coverImgUrl ? trip.coverImgUrl : banner}
                      />

                      <div className="CountryNextTrip">
                        {/* <img
                          className="CountryCircle"
                          src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg"
                        /> */}
                      </div>

                      <div className="PastswiperImgIcon">
                        <Link
                          to={`/edit/trip/${trip.id}`}
                          className="text-3xl text-gray hover:opacity-80"
                        >
                          <FaEdit />
                        </Link>
                      </div>
                      <div className="PastswiperDelete">
                        <MdDelete
                          className="text-3xl text-gray hover:opacity-80 cursor-pointer"
                          // onClick={() => handleDeleteTrip(trip.id)}
                          onClick={() => openModal(trip.id)}
                        />
                      </div>
                      <div className="swiperNextTripText">
                        <Link to={`/trips/trip/${trip.id}`} key={uuidv4()}>
                          <h2 className="tripName">{trip.name} </h2>
                        </Link>
                      </div>
                    </div>
                  </SwiperSlide>
                ))
              ) : (
                <></>
              )}
            </Swiper>
          </div>
          <div className="mt-[22.7rem] -translate-x-40">
            <Link to="/create/past">
              <button>
                <AiFillPlusCircle size={"35px"} />
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserHomePage;
