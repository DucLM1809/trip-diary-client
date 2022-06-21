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
import { useSelector } from "react-redux";
import banner from "../../assests/images/hero.png";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

const UserHomePage = () => {
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

  
  const currentdate = moment().format("YYYY-MM-DD");

  useEffect(() => {
    handleGetTrips();
  }, []);

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

 
  

  // const handleGetTrip = async () => {
  //   let res = await api
  //     .get(`/trips/${tripInfo.tripID}`, config)
  //     .catch((error) => console.log(error));
  //   if (res) {
  //     setTrip(res.data);
  //     // console.log("Trip: ", res);
  //   }
  // };
  // useEffect(() => {
  //   handleGetTrip();
  // }, []);

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
                  <h4 className="profileInfoName">{userName}</h4>
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
                  <SwiperSlide>
                    
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
                        <div className="swiperImgIcon">
                          <Link to="/">
                            <IoPersonCircleOutline />
                          </Link>
                        </div>
                        <div className="swiperNextTripText">
                          <h2 className="tripName">{trip.name}  </h2>
                          
                        </div>
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
            My next trips
          </div>
          <div className="UserNextTripHr">
            <hr/>
          </div>
          <div className="NextTripButton">
          <Link to="/nexttrip">
            <button className="buttonShow">Show all</button>
            </Link>
          </div>
          <div className="NextTripCreate">
            <Link to="/create">
              <button>
                <AiFillPlusCircle size={"35px"} />
              </button>
            </Link>
          </div>

          <div className="PastTripTitle">
            <h1>My past trips</h1>
            
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
                  <SwiperSlide>
                    
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
                        <div className="swiperImgIcon">
                          <Link to="/">
                            <IoPersonCircleOutline />
                          </Link>
                        </div>
                        <div className="swiperNextTripText">
                          <h2 className="tripName">{trip.name}  </h2>
                          
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))
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

export default UserHomePage;
