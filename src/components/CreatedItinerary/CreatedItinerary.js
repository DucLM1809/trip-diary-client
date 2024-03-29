import "@reach/combobox/styles.css";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { AiFillCaretUp } from "react-icons/ai";
import { HiLocationMarker } from "react-icons/hi";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper";
import api from "../../api/axios";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateLocations } from "../../redux/actions";

function CreatedItinerary() {
  const ApiKey = "AIzaSyBilzB8x_vXhqxeZERsxw4sMVxI2BUgYYU";
  const dispatch = useDispatch();

  const location = useLocation();
  const [locations, setLocations] = useState([]);
  const [images, setImages] = useState([]);
  const [departures, setDepartures] = useState([]);
  const [showFullScreen, setShowFullScreen] = useState(false);
  const [imgFullScreen, setImgFullScreen] = useState();

  const tripID = location.pathname.split("/")[3];

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

  const handleGetLocations = async () => {
    let res = await api
      .get(`/trips/${tripID}/locations`, config)
      .catch((error) => console.log(error));
    if (res) {
      setLocations(res.data);
    }
  };

  useEffect(() => {
    console.log("LOCATIONS: ", locations);
  }, [locations]);

  const handleGetImages = async () => {
    let temp = [];
    locations.map((location) => {
      let getImages = async () => {
        let res = await api
          .get(`/trips/${tripID}/locations/${location.id}/files`, config)
          .catch((error) => console.log(error));
        if (res) {
          temp.push(res.data);
          setImages(temp);
        }
      };
      getImages();
    });
  };

  const handleGetDepartures = async () => {
    let temp = [];
    locations.map((location) => {
      let urlDep = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${ApiKey}`;
      let getDepatures = async () => {
        let res = await axios.get(urlDep).catch((error) => console.log(error));
        if (res) {
          temp.push({
            departure:
              res.data.results[res.data.results.length - 2].formatted_address,
            id: location.id,
          });
          setDepartures(temp);
        }
      };
      getDepatures();
    });
  };

  useEffect(() => {
    handleGetLocations();
  }, []);

  useEffect(() => {
    handleGetDepartures();
    handleGetImages();
  }, [locations]);

  useEffect(() => {
    console.log(showFullScreen);
  }, [showFullScreen]);

  return (
    <div className="flex flex-col justify-center mx-auto mt-10 w-[1100px] min-h-[80vh]">
      <div className="border-1 border-gray flex flex-col justify-between w-full mb-10 rounded-10 shadow-lg overflow-y-auto pb-10 h-full">
        <div className="flex justify-start w-full ">
          <h1 className="text-2xl text-left justify-start font-bold ml-10 mt-10 mb-5 ">
            Itinerary
          </h1>
        </div>

        {locations ? (
          locations.map((location, index) => {
            return (
              <div key={index} className="">
                <div className="flex justify-between w-100 py-[5px] ">
                  <AiFillCaretUp className="my-auto text-2xl ml-10"></AiFillCaretUp>
                  <span className="text-xl pl-4">Location {index + 1}</span>
                  <span className="flex  pl-4 align-middle w-[8rem] items-center">
                    <FaCalendarAlt className=" my-auto" />
                    <p className="ml-2">{location.startAt}</p>
                  </span>
                  <div className="flex-grow border-t-[0.7px] my-auto mx-4"></div>
                </div>
                <div className="flex flex-col items-center mb-5">
                  <div className="flex justify-left w-4/5 mt-3">
                    <HiLocationMarker className="my-auto" />

                    {departures.map((dep) => {
                      if (dep.id === location.id) {
                        return (
                          <span key={dep.id} className="text-base ml-2">
                            {dep.departure}
                          </span>
                        );
                      }
                    })}
                  </div>
                  <div className="flex justify-left w-4/5 mt-3">
                    <span className="text-base ml-2 font-light">
                      {location.review}
                    </span>
                  </div>
                  <div className="flex justify-center gap-1 w-4/5 mt-3">
                    {/* <Swiper
                      slidesPerView={3}
                      spaceBetween={30}
                      freeMode={true}
                      pagination={{
                        clickable: true,
                      }}
                      modules={[FreeMode, Pagination]}
                      className="mySwiper"
                    > */}
                    {/* {location.image.map((img) => {
                        return (
                          <SwiperSlide>
                            {" "}
                            <img
                              src={img}
                              alt=""
                              className="w-[250px] h-[250px]"
                            />{" "}
                          </SwiperSlide>
                        );
                      })} */}
                    {images.length > 0 ? (
                      images.map((imgs) => {
                        return (
                          <div
                            key={uuidv4()}
                            className="flex justify-start flex-wrap gap-2"
                          >
                            {" "}
                            {imgs.map((img) => {
                              if (img.locationId === location.id) {
                                return img.type === "image" ? (
                                  <img
                                    key={uuidv4()}
                                    src={img.url}
                                    alt=""
                                    className="w-[250px] h-[250px] object-cover cursor-pointer"
                                    onClick={() => {
                                      setShowFullScreen(true);
                                      setImgFullScreen(img.url);
                                    }}
                                  />
                                ) : (
                                  <video
                                    key={uuidv4()}
                                    src={img.url}
                                    controls
                                    className="w-[250px] h-[250px]"
                                  />
                                );
                              }
                            })}
                            {showFullScreen && (
                              <>
                                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none mt-8">
                                  <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                    {/*content*/}
                                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none p-3">
                                      <button
                                        className="flex justify-end p-1 ml-autoborder-0 bg-white text-red float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowFullScreen(false)}
                                      >
                                        <span className="bg-white text-black h-6 w-6 text-3xl mb-3 block outline-none focus:outline-none hover:opacity-[0.5]">
                                          ×
                                        </span>
                                      </button>
                                      <img
                                            className="w-[600px] h-[600px] object-cover mr-1 mb-1 cursor-pointer"
                                            src={imgFullScreen}
                                            alt=""
                                          />
                                    </div>
                                  </div>
                                </div>
                                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                              </>
                            )}
                          </div>
                        );
                      })
                    ) : (
                      <></>
                    )}
                    {/* </Swiper> */}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default CreatedItinerary;
