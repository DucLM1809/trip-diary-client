import React, { useState, useEffect } from "react";
import "./UserHomePage.css";
import { BiFilter } from "react-icons/bi";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/FooterPub/Footer";
import { AiFillCamera } from "react-icons/ai";
import { AiFillPlusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { IoPersonCircleOutline } from "react-icons/io5";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper";
import unknown from "../../assests/images/unknown.png";
import api from "../../api/axios";
import { useDispatch, useSelector } from "react-redux";
import banner from "../../assests/images/hero.png";
import { TiLocationOutline } from "react-icons/ti";
import { FiCalendar } from "react-icons/fi";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { Scrollbars } from "react-custom-scrollbars";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

const NextTrip = () => {
  const [trips, setTrips] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const [type, setType] = useState(null);
  const [scope, setScope] = useState(null);
  const [display, setDisplay] = useState(false);
  const [displayArea, setDisplayArea] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [delId, setDelId] = useState();

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
      if (new Date(trip.startAt) > new Date()) {
        setNextTrips((prev) => [...prev, trip]);
      } else {
        setPastTrips((prev) => [...prev, trip]);
      }
    });
  }, [trips]);

  return (
    <>
      <Navbar />
      <div style={{ backgroundColor: "#F1F5FF" }} className="pb-10">
        <div className="profile">
          <div className="profileRight">
            <div>
              <div className="profileCover">
                <img
                  src="https://thuthuatnhanh.com/wp-content/uploads/2020/01/background-powerpoint-dep.jpg"
                  alt=""
                  className="profileCoverImg"
                />
                <img src={unknown} alt="" className="profileUserImg" />

                <div className="profileInfo">
                  <h3 className="profileInfoName">{userName}</h3>
                  {/* <h3>/tungtung</h3> */}
                  {/* <p className="profileInfoDesc">Hế nhô các bạn!</p> */}
                </div>
                <button className="editProfile">Edit Profile</button>
                <div className="iconcamera cursor-pointer">
                  <button>
                    <AiFillCamera size={"50px"} className="text-white" />
                  </button>
                </div>
                <div className="uploadFile1 cursor-pointer">
                  <input type={"file"} className="cursor-pointer" />
                </div>
              </div>
            </div>
            <div className="share">
              <div className="shareWrapper">
                <div className="shareTop">
                  <span className="shareOptionText">Description</span>
                  <br />
                  <input
                    type="text"
                    className="shareInput"
                    placeholder="Add something about you!"
                  />
                </div>
              </div>
            </div>
            <br />
            <hr style={{ width: "90%", marginLeft: "5%" }} />
            <div className="smallFilter">
              <div className="f1">All trip</div>
              <div className="f2">
                <BiFilter /> Filter area{" "}
              </div>
              <div className="f3">
                <BiFilter display={""} /> Filter type
              </div>
              <div className="f4">
                <BiFilter display={""} /> Filter countries
              </div>
            </div>
          </div>
        </div>

        <div className="tripgogo">
          <div className="NextTripTitle">
            <h1>My next trips</h1>
          </div>
          <div className="trip8">
            <hr />
          </div>

          <div className="NextTripContent">
            <Scrollbars style={{ height: "500px" }}>
              {nexttrips.length > 0 ? (
                nexttrips.map((trip) => (
                  <div key={uuidv4()}>
                    <div className="swiperNextTrip">
                      <img
                        className="imgNextTrip"
                        alt=""
                        src={trip.coverImgUrl ? trip.coverImgUrl : banner}
                      />

                      <div className="CountryNextTrip">
                        <img
                          className="CountryCircle"
                          src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg"
                        />
                      </div>
                      <div className="DetailTripLocation">
                        <TiLocationOutline />
                      </div>
                      <div className="DeatailTripDate">
                        <FiCalendar />
                      </div>
                      <div className="DetailTripType">
                        <AiOutlineExclamationCircle />
                      </div>
                      <div className="TripLocationText">{trip.name}</div>
                      <div className="TripDateText">{trip.startAt}</div>
                      <div className="TripTypeText">{trip.description}</div>
                      <div className="swiperNextTripText">
                        <h2 className="tripName">
                          <Link to={`/trips/trip/${trip.id}`} key={uuidv4()}>
                            {trip.name}
                          </Link>
                        </h2>
                      </div>
                      <div className="NextTripHr">
                        <hr />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <></>
              )}
            </Scrollbars>
          </div>

          
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NextTrip;
