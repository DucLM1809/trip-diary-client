import React, { useEffect, useMemo, useState } from "react";
import banner from "../../assests/images/hero.png";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { IoAirplane } from "react-icons/io5";
import { IoSend } from "react-icons/io5";
import { FaMapMarkerAlt, FaMapPin, FaRegComment } from "react-icons/fa";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import destination1 from "../../assests/images/Destination1.png";
import unknown from "../../assests/images/unknown.png";
import { v4 as uuidv4 } from "uuid";
import api from "../../api/axios";

const CreatedOverview = () => {
  const ApiKey = "AIzaSyDos6imos6382Si_EC5LVBJ5yRNllrZurU";

  const [like, setLike] = useState(false);
  const [numLike, setNumLike] = useState(0);
  const [comments, setComments] = useState([]);
  const [displayComment, setDisplayComment] = useState(false);
  const [replies, setReplies] = useState([]);
  const [displayReply, setDisplayReply] = useState(false);
  const [trip, setTrip] = useState();
  const [trips, setTrips] = useState();
  const [departure, setDeparture] = useState();
  const [destination, setDestination] = useState();
  const [userId, setUserId] = useState();

  const userName = localStorage.getItem("username");
  const location = useLocation();

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

  const handleGetTrip = async () => {
    let res = await api
      .get(`/trips/${location.pathname.split("/")[3]}`, config)
      .catch((error) => console.log(error));
    if (res) {
      setTrip(res.data);
      setUserId(res.data?.author?.id);
      setNumLike(res.data?.numOfLikes);
    }
  };

  useEffect(() => {
    handleGetTrip();
  }, [location]);

  const handleGetTrips = async () => {
    let res = await api.get("/trips", config);
    if (res) {
      // console.log("Trips: ", res.data);
      setTrips(res.data);
    }
  };
  useEffect(() => {
    handleGetTrips();
  }, []);

  useEffect(() => {
    try {
      let urlDep = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${trip.fromLat},${trip.fromLng}&key=${ApiKey}`;
      fetch(urlDep)
        .then((response) => response.json())
        .then((data) => {
          try {
            setDeparture(
              data.results[data.results.length - 2].formatted_address ||
                data.results[0].formatted_address
            );
          } catch (error) {}
        })
        .catch((error) => console.log(error));
    } catch (error) {}
  }, [location, trip]);

  useEffect(() => {
    try {
      let urlDep = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${trip.toLat},${trip.toLng}&key=${ApiKey}`;
      fetch(urlDep)
        .then((response) => response.json())
        .then((data) => {
          try {
            setDestination(
              data.results[data.results.length - 2].formatted_address ||
                data.results[0].formatted_address
            );
          } catch (error) {}
        })
        .catch((error) => console.log(error));
    } catch (error) {}
  }, [location, trip]);

  const tripInfo = useSelector((state) => state.trip);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: ApiKey,
    libraries: "places",
  });

  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  const center = useMemo(() => ({ lat: 43.45, lng: -80.49 }), []);

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm();

  const onSubmitComment = (data) => {
    console.log(data);
    let listComments = [...comments];
    listComments.push(data.comment);
    setComments(listComments);
    resetField("comment");
  };

  const onSubmitReply = (data) => {
    console.log(data);
    let listReplies = [...replies];
    listReplies.push(data.reply);
    setReplies(listReplies);
    resetField("reply");
  };

  const handleLike = () => {
    setLike(true);
    setNumLike(numLike + 1);
    handlePostLike();
  };

  const handleDisLike = () => {
    setLike(false);
    setNumLike(numLike - 1);
    handleDelLike();
  };

  const handleDisplayComment = () => {
    setDisplayComment(!displayComment);
  };

  const handleDisplayReply = () => {
    setDisplayReply(!displayReply);
  };

  const handlePostLike = async () => {
    let res = await api
      .post(`/trips/${location.pathname.split("/")[3]}/likes`, {}, config)
      .catch((error) => console.log(error));
    if (res) {
      console.log("Likes: ", res.data);
    }
  };

  const handleDelLike = async () => {
    let res = await api
      .delete(`/trips/${location.pathname.split("/")[3]}/likes`, config)
      .catch((error) => console.log(error));
  };

  const handleGetLikes = async () => {
    let res = await api
      .get(`/trips/${location.pathname.split("/")[3]}/likes`, config)
      .catch((error) => console.log(error));

    if (res) {
      console.log("Num lIkes: ", res.data);
      if (res.data.find((like) => like.userId === userId)) {
        setLike(true);
      } else {
        setLike(false);
      }
    }
  };

  useEffect(() => {
    handleGetLikes();
  }, [trip, userId]);

  return (
    <div className="flex flex-col justify-center mx-auto mt-10 min-w-[1100px] max-w-[1200px]">
      <div
        className="w-full h-96 relative 
          after:absolute after:content-[''] 
          after:top-0 after:right-0 after:left-0 after:bottom-0 
        after:bg-black after:opacity-25 after:rounded-10"
      >
        <img
          src={trip?.coverImgUrl || banner}
          className="min-w-full h-full object-cover rounded-10 relative"
        />
      </div>
      <div className="shadow-lg border-1 border-gray h-fit my-10 py-10 rounded-10">
        <h1 className="text-3xl text-center mb-14">{trip?.name}</h1>
        <div className="flex justify-between items-start mx-10 relative font-bold text-base">
          <div className="flex flex-col justify-center">
            <span className="">From: {trip?.startAt}</span>
            <span className="flex items-center justify-center">
              <FaMapMarkerAlt /> {departure}
            </span>
          </div>

          <div className="text-green m-auto -translate-x-1/2">
            <IoAirplane />
          </div>
          <div className=""></div>
          <div className="flex flex-col justify-center">
            <span>To: {trip?.backTripAt}</span>
            <span className="flex items-center justify-center">
              <FaMapPin /> {destination}
            </span>
          </div>
        </div>
        <div className="w-full h-[500px] my-10">
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={trip ? { lat: trip.fromLat, lng: trip.fromLng } : center}
              zoom={6}
            >
              <Marker
                position={
                  trip ? { lat: trip.fromLat, lng: trip.fromLng } : center
                }
              />
              <Marker
                position={trip ? { lat: trip.toLat, lng: trip.toLng } : center}
              />
            </GoogleMap>
          ) : (
            <></>
          )}
        </div>
        <div className="flex flex-col items-start mx-10 mb-10 relative text-xl">
          <h1 className="mb-2">Visited Places</h1>
          <div className="flex flex-wrap gap-8">
            {trips ? (
              trips.map((trip) => {
                return (
                  <div key={trip.id} className="relative">
                    <img
                      src={trip?.coverImgUrl || banner}
                      alt=""
                      className="w-[250px] h-[250px] object-cover rounded-5"
                    />
                    <div className="flex justify-center items-center absolute bottom-5 left-5 text-xl">
                      <FaMapMarkerAlt className="text-green" />
                      <span className="text-xl text-white ml-1">
                        {trip?.name}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="flex flex-col items-start mx-10 relative">
          <h1 className="mb-2 text-xl">Description</h1>
          <div className="mb-6">
            <p className="font-medium">{trip?.description}</p>
          </div>
          <div className="w-full border-1 border-gray rounded-5">
            <div className="w-full flex border-b-1 border-b-gray">
              <div className="flex items-center m-2 ">
                {like ? (
                  <AiFillHeart
                    className="text-3xl text-[#ff274b] cursor-pointer hover:opacity-80"
                    onClick={() => handleDisLike()}
                  />
                ) : (
                  <AiOutlineHeart
                    className="text-3xl cursor-pointer"
                    onClick={() => handleLike()}
                  />
                )}

                <span className="text-base ml-1">
                  {numLike} {numLike > 1 ? "Likes" : "Like"}
                </span>
              </div>
              <div className="flex items-center text-2xl m-2">
                <FaRegComment
                  className="cursor-pointer"
                  onClick={handleDisplayComment}
                />
                <span className="text-base ml-1">
                  {comments.length}{" "}
                  {comments.length > 1 ? "Comments" : "Comment"}
                </span>
              </div>
            </div>
            <form
              className={`my-4 flex relative ${
                displayComment ? "block" : "hidden"
              }`}
              onSubmit={handleSubmit(onSubmitComment)}
            >
              <img src={unknown} alt="" className="w-[50px] h-[50px] ml-4" />
              <input
                type="text"
                placeholder="Enter comment..."
                {...register("comment")}
                className="mx-4 px-4 border-1 border-gray w-full rounded-5"
              />
              <button className="absolute right-8 top-4 text-xl text-green hover:opacity-80">
                <IoSend />
              </button>
            </form>
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div
                  key={uuidv4()}
                  className={`mb-10 flex-col ${
                    displayComment ? "block" : "hidden"
                  }`}
                >
                  <div className="flex">
                    <img
                      src={unknown}
                      alt=""
                      className="w-[50px] h-[50px] ml-4"
                    />
                    <div className="ml-4 bg-aqua rounded-5 py-2 px-4">
                      <div className="flex items-center gap-2">
                        <h2>{userName}</h2>
                        <span className="text-xs text-placeholder">
                          06/06/2022, 03:21:17
                        </span>
                      </div>
                      <p className="text-sm font-normal">{comment}</p>
                    </div>
                  </div>
                  <span
                    className="ml-24 text-xs hover:opacity-80 cursor-pointer"
                    onClick={handleDisplayReply}
                  >
                    Reply
                  </span>
                  {replies.length > 0 ? (
                    replies.map((reply) => (
                      <div className="flex ml-20 mt-2">
                        <img
                          src={unknown}
                          alt=""
                          className="w-[50px] h-[50px] ml-4"
                        />
                        <div className="ml-4 bg-aqua rounded-5 py-2 px-4">
                          <div className="flex items-center gap-2">
                            <h2>{userName}</h2>
                            <span className="text-xs text-placeholder">
                              06/06/2022, 03:21:17
                            </span>
                          </div>
                          <p className="text-sm font-normal">{reply}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <></>
                  )}
                  <form
                    className={`ml-20 mt-4 flex relative ${
                      displayReply ? "block" : "hidden"
                    }`}
                    onSubmit={handleSubmit(onSubmitReply)}
                  >
                    <img
                      src={unknown}
                      alt=""
                      className="w-[50px] h-[50px] ml-4"
                    />
                    <input
                      type="text"
                      placeholder="Enter comment..."
                      {...register("reply")}
                      className="mx-4 px-4 border-1 border-gray w-full rounded-5"
                    />
                    <button className="absolute right-8 top-4 text-xl text-green hover:opacity-80">
                      <IoSend />
                    </button>
                  </form>
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatedOverview;
