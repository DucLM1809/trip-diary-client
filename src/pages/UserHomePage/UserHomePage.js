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

const UserHomePage = () => {
  const [trip, setTrip] = useState();
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

  // const handleGetTrips = async () => {
  //   let res = await api.get("/trips", config);
  //   if (res) {
  //     console.log("Trips: ", res);
  //   }
  // };
  // handleGetTrips();

  const handleGetTrip = async () => {
    let res = await api
      .get(`/trips/${tripInfo.tripID}`, config)
      .catch((error) => console.log(error));
    if (res) {
      setTrip(res.data);
      // console.log("Trip: ", res);
    }
  };
  useEffect(() => {
    handleGetTrip();
  }, []);

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
          <div className="trip1"></div>
          <div className="trip2"></div>
          <div className="trip3">
            <h1>My next trips</h1>
          </div>
          <div className="trip4">
            <button className="buttonShow">Show all</button>
          </div>
          {trip ? (
            <>
              <div className="trip5">
                <img
                  class="imgTrip"
                  alt=""
                  src={trip.coverImgUrl ? trip.coverImgUrl : banner}
                />
              </div>
              <div className="trip6">
                <Link to="/create">
                  <button>
                    <AiFillPlusCircle size={"35px"} />
                  </button>
                </Link>
              </div>
            </>
          ) : (
            <></>
          )}

          <div className="trip7">
            <h1>My past trips</h1>
          </div>
          <div className="trip8"></div>

          <div className="trip10"></div>
          <div className="trip11"></div>
          {trip ? (
            <>
              {" "}
              <div className="trip12">
                <Link to="/homepage">
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

          <div className="trip15">
            <hr className="hrTrip15" />
          </div>
          <div className="trip16"></div>
          <div className="trip17">
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
              <SwiperSlide>
                <div className="swiperTrip">
                  <div className="swiperTrip1">
                    <img
                      class="imgTrip"
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
                    <h2 className="trip14text">
                      The United States of America{" "}
                    </h2>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="swiperTrip">
                  <div className="swiperTrip1">
                    <img
                      class="imgTrip"
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
                    <h2 className="trip14text">
                      The United States of America{" "}
                    </h2>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                {" "}
                <img
                  class="imgTrip"
                  alt=""
                  src="https://m.economictimes.com/thumb/msid-86044087,width-1200,height-900,resizemode-4,imgsize-99220/us.jpg"
                />
              </SwiperSlide>
              <SwiperSlide>
                {" "}
                <img
                  class="imgTrip"
                  alt=""
                  src="https://m.economictimes.com/thumb/msid-86044087,width-1200,height-900,resizemode-4,imgsize-99220/us.jpg"
                />
              </SwiperSlide>
              <SwiperSlide>
                {" "}
                <img
                  class="imgTrip"
                  alt=""
                  src="https://m.economictimes.com/thumb/msid-86044087,width-1200,height-900,resizemode-4,imgsize-99220/us.jpg"
                />
              </SwiperSlide>
              <SwiperSlide>
                {" "}
                <img
                  class="imgTrip"
                  alt=""
                  src="https://m.economictimes.com/thumb/msid-86044087,width-1200,height-900,resizemode-4,imgsize-99220/us.jpg"
                />
              </SwiperSlide>
              <SwiperSlide>
                {" "}
                <img
                  class="imgTrip"
                  alt=""
                  src="https://m.economictimes.com/thumb/msid-86044087,width-1200,height-900,resizemode-4,imgsize-99220/us.jpg"
                />
              </SwiperSlide>
              <SwiperSlide>
                {" "}
                <img
                  class="imgTrip"
                  alt=""
                  src="https://m.economictimes.com/thumb/msid-86044087,width-1200,height-900,resizemode-4,imgsize-99220/us.jpg"
                />
              </SwiperSlide>
              <SwiperSlide>
                {" "}
                <img
                  class="imgTrip"
                  alt=""
                  src="https://m.economictimes.com/thumb/msid-86044087,width-1200,height-900,resizemode-4,imgsize-99220/us.jpg"
                />
              </SwiperSlide>
            </Swiper>
          </div>
          <div className="trip18">
            <button className="buttonShow">Show all</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserHomePage;
