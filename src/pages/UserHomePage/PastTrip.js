<<<<<<< HEAD
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
import {FiCalendar} from "react-icons/fi";
import {AiOutlineExclamationCircle} from "react-icons/ai";
import { Scrollbars } from "react-custom-scrollbars";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";



const NextTrip = () => {
  const [trip, setTrip] = useState();
  const [trips, setTrips] = useState([]);
  const userName = localStorage.getItem("username");

  const accessToken = localStorage
    .getItem("accessToken")
    .toString()
    .split('"')[1];

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (accessToken) {
    config.headers.Authorization = `bearer ${accessToken}`;
  }

  const tripInfo = useSelector((state) => state.trip);
  useEffect(() => {
    console.log(tripInfo);
  }, [tripInfo]);

  const handleGetTrips = async () => {
    let res = await api.get("/trips", config);
    if (res) {
      console.log("Trips: ", res.data);
      setTrips(res.data);
    }
  };
  useEffect(() => {
    handleGetTrips();
  }, []);
  const currentdate = moment().format("YYYY-MM-DD");

  const nexttrips = [];
  const pasttrips = [];

  for(let x of trips){
    if(x.startAt>currentdate){
      nexttrips.push(x);
    }
    else if(x.startAt<currentdate){
      pasttrips.push(x);
    }
  }

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
            <h1>My past trips</h1>
           
          </div>          


          <div className="NextTripContent">
            <Scrollbars style={{height:"500px"}}>
            {pasttrips.length > 0 ? (
                pasttrips.map((trip) => (
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
                          <TiLocationOutline/>
                        </div>
                        <div className="DeatailTripDate">
                          <FiCalendar/>
                        </div>
                        <div className="DetailTripType">
                          <AiOutlineExclamationCircle/>
                        </div>
                        <div className="TripLocationText">
                          tung
                        </div>
                        <div className="TripDateText">
                          tugntung
                        </div>
                        <div className="TripTypeText">tungtung</div>
                        <div className="swiperNextTripText">
                          <h2 className="tripName">{trip.name}  </h2>
                        </div>
                        <div className="NextTripHr">
                          <hr/>
                        </div>
                      </div>
                    </div>
                ))
              ) : (
                <></>
              )}
              

            </Scrollbars>
          </div>
          

        
          {trip ? (
            <>
              {" "}
              <div className="trip12">
                <Link to="/user">
                  <IoPersonCircleOutline />
                </Link>
              </div>
              <div className="trip13">
                <img
                  className="trip13Img"
                  src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg"
                />
              </div>
            </>
          ) : (
            <></>
          )}
          {trip ? (
            <div className="trip14">
              <h2 className="trip14text">{trip.name}</h2>
            </div>
          ) : (
            <></>
          )}

        </div>
      </div>
      <Footer />
    </>
  );
};

export default NextTrip;
=======
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
import {FiCalendar} from "react-icons/fi";
import {AiOutlineExclamationCircle} from "react-icons/ai";
import { Scrollbars } from "react-custom-scrollbars";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";


const NextTrip = () => {
  const [trip, setTrip] = useState();
  const [trips, setTrips] = useState([]);
  const userName = localStorage.getItem("username");

  const accessToken = localStorage
    .getItem("accessToken")
    .toString()
    .split('"')[1];

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (accessToken) {
    config.headers.Authorization = `bearer ${accessToken}`;
  }

  const tripInfo = useSelector((state) => state.trip);
  useEffect(() => {
    console.log(tripInfo);
  }, [tripInfo]);

  const handleGetTrips = async () => {
    let res = await api.get("/trips", config);
    if (res) {
      console.log("Trips: ", res.data);
      setTrips(res.data);
    }
  };
  useEffect(() => {
    handleGetTrips();
  }, []);
  const currentdate = moment().format("YYYY-MM-DD");
  const nexttrips = [];
  const pasttrips = [];

  for(let x of trips){
    if(x.startAt>currentdate){
      nexttrips.push(x);
    }
    else if(x.startAt<currentdate){
      pasttrips.push(x);
    }
  }
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
            <h1>My past trips</h1>
           
          </div>          


          <div className="NextTripContent">
            <Scrollbars style={{height:"500px"}}>
            {pasttrips.length > 0 ? (
                pasttrips.map((trip) => (
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
                          <TiLocationOutline/>
                        </div>
                        <div className="DeatailTripDate">
                          <FiCalendar/>
                        </div>
                        <div className="DetailTripType">
                          <AiOutlineExclamationCircle/>
                        </div>
                        <div className="TripLocationText">
                        {trip.name}
                        </div>
                        <div className="TripDateText">
                        {trip.startAt}
                        </div>
                        <div className="TripTypeText">{trip.description}</div>
                        <div className="swiperNextTripText">
                          <h2 className="tripName">{trip.name}  </h2>
                        </div>
                        <div className="NextTripHr">
                          <hr/>
                        </div>
                      </div>
                    </div>
                ))
              ) : (
                <></>
              )}
              

            </Scrollbars>
          </div>
          

        
          {trip ? (
            <>
              {" "}
              <div className="trip12">
                <Link to="/user">
                  <IoPersonCircleOutline />
                </Link>
              </div>
              <div className="trip13">
                <img
                  className="trip13Img"
                  src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg"
                />
              </div>
            </>
          ) : (
            <></>
          )}
          {trip ? (
            <div className="trip14">
              <h2 className="trip14text">{trip.name}</h2>
            </div>
          ) : (
            <></>
          )}

        </div>
      </div>
      <Footer />
    </>
  );
};

export default NextTrip;
>>>>>>> 146f64a7f921ee7387453da31559b95f1a62546d
