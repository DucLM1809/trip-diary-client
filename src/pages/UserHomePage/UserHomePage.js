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
import { Link } from "react-router-dom";
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
import { Modal } from "../../components";

const UserHomePage = () => {
  const [trips, setTrips] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const [type, setType] = useState("all");
  const [display, setDisplay] = useState(false);
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
    params: {
      type: type,
    },
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

  // const handleDeleteTrip = async (id) => {
  //   let res = await api
  //     .delete(`/trips/${id}`, config)
  //     .catch((error) => console.log(error));
  //   if (res) {
  //     setIsDeleted(true);
  //     console.log("DELETE SUCCESSFULL");
  //   }
  // };

  useEffect(() => {
    if (isDeleted) {
      handleGetTrips();
    }
  }, [isDeleted]);

  const handleFilterType = async () => {
    let res = await api
      .get("/trips/me", config)
      .catch((error) => console.log(error));
    if (res) {
      setTrips(res.data);
      setIsDeleted(false);
    }
  };

  useEffect(() => {
    handleFilterType();
  }, [type]);

  const handleChooseType = () => {
    setDisplay(!display);
  };

  const handleType = (e) => {
    console.log(e.target.textContent);
    if (e.target.textContent === "Single") {
      setType("single");
      setDisplay(false);
    } else if (e.target.textContent === "Around") {
      setType("around");
      setDisplay(false);
    } else {
      setType("all");
      setDisplay(false);
    }
  };

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
              <div className="f1 cursor-pointer" onClick={(e) => handleType(e)}>
                All trip
              </div>
              <div className="f2">
                <BiFilter /> Filter area{" "}
              </div>
              <div className="f3 flex flex-col">
                <div
                  className="flex items-center cursor-pointer"
                  onClick={handleChooseType}
                >
                  <BiFilter display={""} />
                  <span>Filter type</span>
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
              {trips.length > 0 ? (
                trips.map((trip) => (
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
          <div className="NextTripButton">
            <button className="buttonShow">Show all</button>
          </div>
          <div className="NextTripCreate">
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
            {/* <Swiper
              slidesPerView={3}
              spaceBetween={30}
              freeMode={true}
              pagination={{
                clickable: true,
              }}
              modules={[FreeMode, Pagination]}
              className="mySwiper"
            >
              <SwiperSlide>
                <div className="swiperTrip">
                  <div className="swiperTrip1">
                    <img
                      className="imgTrip object-cover"
                      alt=""
                      src="https://m.economictimes.com/thumb/msid-86044087,width-1200,height-900,resizemode-4,imgsize-99220/us.jpg"
                    />
                  </div>
                  <div className="swiperTrip2">
                    <div className="trip12_1">
                      <Link to="/homepage">
                        <IoPersonCircleOutline />
                      </Link>
                    </div>
                  </div>
                  <div className="swiperTrip3">
                    <h2 className="tripName">The United States of America </h2>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="swiperTrip">
                  <div className="swiperTrip1">
                    <img
                      className="imgTrip"
                      alt=""
                      src="https://m.economictimes.com/thumb/msid-86044087,width-1200,height-900,resizemode-4,imgsize-99220/us.jpg"
                    />
                  </div>
                  <div className="swiperTrip2">
                    <div className="trip12_1">
                      <Link to="/homepage">
                        <IoPersonCircleOutline />
                      </Link>
                    </div>
                  </div>
                  <div className="swiperTrip3">
                    <h2 className="tripName">The United States of America </h2>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                {" "}
                <img
                  className="imgTrip"
                  alt=""
                  src="https://m.economictimes.com/thumb/msid-86044087,width-1200,height-900,resizemode-4,imgsize-99220/us.jpg"
                />
              </SwiperSlide>
              <SwiperSlide>
                {" "}
                <img
                  className="imgTrip"
                  alt=""
                  src="https://m.economictimes.com/thumb/msid-86044087,width-1200,height-900,resizemode-4,imgsize-99220/us.jpg"
                />
              </SwiperSlide>
              <SwiperSlide>
                {" "}
                <img
                  className="imgTrip"
                  alt=""
                  src="https://m.economictimes.com/thumb/msid-86044087,width-1200,height-900,resizemode-4,imgsize-99220/us.jpg"
                />
              </SwiperSlide>
              <SwiperSlide>
                {" "}
                <img
                  className="imgTrip"
                  alt=""
                  src="https://m.economictimes.com/thumb/msid-86044087,width-1200,height-900,resizemode-4,imgsize-99220/us.jpg"
                />
              </SwiperSlide>
            </Swiper> */}
          </div>
          <div className="PastTripButton">
            <button className="buttonShow">Show all</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserHomePage;
