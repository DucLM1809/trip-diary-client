import React, { useEffect, useMemo, useState } from "react";
import banner from "../../assests/images/hero.png";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { IoAirplane } from "react-icons/io5";
import { IoSend } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
import { FaMapMarkerAlt, FaMapPin, FaRegComment } from "react-icons/fa";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { FacebookShareButton } from "react-share";
import { RiShareForwardLine } from "react-icons/ri";
import unknown from "../../assests/images/unknown.png";
import api from "../../api/axios";
import { createComment, getComments } from "../../redux/actions";
import { useOpenWeather } from "react-open-weather";
import Weather from "../Weather/Weather";

const CreatedOverview = () => {
  const ApiKey = "AIzaSyBilzB8x_vXhqxeZERsxw4sMVxI2BUgYYU";

  const [like, setLike] = useState(false);
  const [numLike, setNumLike] = useState(0);
  const [comments, setComments] = useState([]);
  const [numComments, setNumComments] = useState(0);
  const [displayComment, setDisplayComment] = useState(false);
  const [editComment, setEditComment] = useState(false);
  const [editId, setEditId] = useState();
  const [replies, setReplies] = useState([]);
  const [replyId, setReplyId] = useState();
  const [displayReply, setDisplayReply] = useState(false);
  const [editReply, setEditReply] = useState(false);
  const [trip, setTrip] = useState();
  const [trips, setTrips] = useState();
  const [departure, setDeparture] = useState();
  const [destination, setDestination] = useState();
  const [userId, setUserId] = useState();
  const [utility, setUtility] = useState({ id: "", value: "" });
  const [displayUtility, setDisplayUtility] = useState(false);
  const [meId, setMeId] = useState();
  const [shareURL, setShareUrl] = useState();
  const [likeInfo, setLikeInfo] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [util, setUtil] = useState();
  const location = useLocation();
  const dispatch = useDispatch();

  const { data, isLoading, errorMessage } = useOpenWeather({
    key: "aec7705e01a74a11f8c6a6a5a43393c2",
    lat: "48.137154",
    lon: "11.576124",
    lang: "en",
    unit: "metric",
  });

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

  const handleGetMe = async () => {
    let res = await api
      .get(`/users/me`, config)
      .catch((error) => console.log(error));
    if (res) {
      setMeId(res.data.id);
    }
  };

  useEffect(() => {
    handleGetTrip();
    handleGetMe();
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
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmitComment = (data) => {
    if (
      editComment &&
      data.editComment?.length &&
      data.editComment?.length > 0
    ) {
      handleEditComment(data);
    } else if (data.comment?.length && data.comment?.length > 0) {
      handlePostComment(data);
    }
    resetField("comment");
  };

  const handlePostComment = async (data) => {
    let res = await api
      .post(
        `/trips/${location.pathname.split("/")[3]}/comments`,
        {
          content: data.comment,
        },
        config
      )
      .catch((error) => console.log(error));
    if (res) {
      dispatch(createComment(res.data));
      handleGetComments();
    }
  };

  const handleGetComments = async () => {
    let res = await api
      .get(`/trips/${location.pathname.split("/")[3]}/comments`, config)
      .catch((error) => console.log(error));
    if (res) {
      dispatch(getComments(res.data));
      setComments(res.data.filter((comment) => !comment.commentId));
      setReplies(res.data.filter((comment) => comment.commentId));
    }
  };

  const handleGetComment = async (id) => {
    let res = await api
      .get(`/trips/${location.pathname.split("/")[3]}/comments/${id}`, config)
      .catch((error) => console.log(error));
    if (res) {
      if (!res.data.commentId) {
        setValue("editComment", res.data.content);
      } else {
        setValue("editReply", res.data.content);
      }
    }
  };

  useEffect(() => {
    handleGetComments();
  }, [location]);

  useEffect(() => {
    handleGetComments();
  }, [editComment]);

  useEffect(() => {
    setNumComments(comments.length + replies.length);
  }, [comments, replies]);

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

  const handlePostLike = async () => {
    let res = await api
      .post(`/trips/${location.pathname.split("/")[3]}/likes`, {}, config)
      .catch((error) => console.log(error));
    handleGetLikes();
  };

  const handleDelLike = async () => {
    let res = await api
      .delete(`/trips/${location.pathname.split("/")[3]}/likes`, config)
      .catch((error) => console.log(error));
    handleGetLikes();
  };

  const handleGetLikes = async () => {
    let res = await api
      .get(`/trips/${location.pathname.split("/")[3]}/likes`, config)
      .catch((error) => console.log(error));

    if (res) {
      if (res.data.find((like) => like.userId === userId)) {
        setLike(true);
      } else {
        setLike(false);
      }
      setLikeInfo(res.data);
    }
  };

  useEffect(() => {
    handleGetLikes();
  }, [trip]);

  useEffect(() => {
    handleGetLikes();
  }, [userId]);

  const handleDisplayComment = () => {
    setDisplayComment(!displayComment);
  };

  const handleDeleteComment = async (id) => {
    let res = await api
      .delete(
        `/trips/${location.pathname.split("/")[3]}/comments/${id}`,
        config
      )
      .catch((error) => console.log(error));
    handleGetComments();
  };

  const handleEditComment = async (data) => {
    let res = await api
      .put(
        `/trips/${location.pathname.split("/")[3]}/comments/${editId}`,
        { content: data.editComment },
        config
      )
      .catch((error) => console.log(error));
    if (res) {
      setUtility({ id: "", value: "" });
      setEditComment(false);
    }
  };

  const handleDisplayUtil = (e) => {
    setUtility({ id: e.target.id - 0, value: "" });
    setDisplayUtility(!displayUtility);
  };

  const handleChooseUtil = (e) => {
    setUtility({ id: e.target.id - 0, value: e.target.textContent });
    setDisplayUtility(false);
    setOpenModal(false);
  };

  useEffect(() => {
    if (utility.value === "Delete") {
      handleDeleteComment(utility.id);
    } else if (utility.value === "Edit") {
      handleGetComment(utility.id);
      setEditComment(true);
      setEditReply(true);
      setEditId(utility.id);
    }
  }, [utility]);

  const handlePostReply = async (data) => {
    let res = await api
      .post(
        `/trips/${location.pathname.split("/")[3]}/comments`,
        {
          content: data.reply,
          commentId: replyId,
        },
        config
      )
      .catch((error) => console.log(error));
    if (res) {
      setReplies((prev) => [...prev, res.data]);
    }
  };

  const handleEditReply = async (data) => {
    let res = await api
      .put(
        `/trips/${location.pathname.split("/")[3]}/comments/${editId}`,
        {
          content: data.editReply,
          commentId: replyId,
        },
        config
      )
      .catch((error) => console.log(error));
    if (res) {
      setUtility({ id: "", value: "" });
      setEditReply(false);
    }
  };

  useEffect(() => {
    handleGetComments();
  }, [editReply]);

  const onSubmitReply = (data) => {
    if (editReply && data.editReply?.length && data.editReply?.length > 0) {
      handleEditReply(data);
    } else if (data.reply?.length && data.reply?.length > 0) {
      handlePostReply(data);
    }
    resetField("reply");
  };

  const handleDisplayReply = (e) => {
    setUtility({ id: e.target.id - 0, value: e.target.textContent });
    setReplyId(e.target.id);
    handleGetComment(e.target.id);
    setDisplayReply(!displayReply);
  };

  const handlePostLikeComment = async (id) => {
    let res = await api
      .post(
        `/trips/${location.pathname.split("/")[3]}/comments/${id}/likes`,
        {},
        config
      )
      .catch((error) => console.log(error));
    if (res) {
      handleGetComments();
    }
  };

  const handleDelLikeComment = async (id) => {
    let res = await api
      .delete(
        `/trips/${location.pathname.split("/")[3]}/comments/${id}/likes`,
        config
      )
      .catch((error) => console.log(error));
    if (res) {
      handleGetComments();
    }
  };

  const handleLikeComment = (e) => {
    comments.map((comment) => {
      if (comment.id === e.target.id - 0 && !comment.hasLiked) {
        handlePostLikeComment(e.target.id);
      } else if (comment.id === e.target.id - 0 && comment.hasLiked) {
        handleDelLikeComment(e.target.id);
      }
    });
    replies.map((reply) => {
      if (reply.id === e.target.id - 0 && !reply.hasLiked) {
        handlePostLikeComment(e.target.id);
      } else if (reply.id === e.target.id - 0 && reply.hasLiked) {
        handleDelLikeComment(e.target.id);
      }
    });
  };

  useEffect(() => {
    setShareUrl(`https://triparis.work/${location.pathname}`);
  }, []);

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
                return trip?.author?.id === userId &&
                  (trip?.author?.id !== meId ? trip?.isPublic : true) ? (
                  <div key={trip.id} className="relative">
                    <img
                      src={trip?.coverImgUrl || banner}
                      alt=""
                      className="w-[250px] h-[250px] object-cover rounded-5 shadow-md"
                    />
                    <div className="flex justify-center items-center absolute bottom-5 left-5 text-xl">
                      <FaMapMarkerAlt className="text-green" />
                      <Link to={`/trips/trip/${trip.id}`}>
                        <span className="text-xl text-white ml-1 hover:underline">
                          {trip?.name}
                        </span>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <></>
                );
              })
            ) : (
              <></>
            )}
          </div>
        </div>

        <div className="flex flex-col items-start mx-10 mb-10 relative">
          <h1 className="text-xl">Weather</h1>
          <Weather lat={trip?.toLat} lng={trip?.toLng} />
        </div>
        <div className="flex flex-col items-start mx-10 relative">
          <h1 className="mb-2 text-xl">Description</h1>
          <div className="mb-6">
            <p className="font-medium">{trip?.description}</p>
          </div>
          <div className="w-full border-1 border-gray rounded-5">
            <div className="w-full flex border-b-1 border-b-gray">
              <div className="flex items-center m-2 ">
                {likeInfo?.find((like) => like?.userId === meId) ? (
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
                  {numComments} {numComments > 1 ? "Comments" : "Comment"}
                </span>
              </div>
              <div className="flex items-center text-2xl m-2 ">
                <FacebookShareButton
                  className="flex items-center text-2xl"
                  url={shareURL}
                >
                  <RiShareForwardLine />
                  <span className="text-base"> Share </span>
                </FacebookShareButton>
              </div>
              <div className="flex items-center text-2xl"></div>
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
            {numComments > 0 ? (
              comments.map((comment) =>
                utility.value === "Edit" && utility.id === comment.id ? (
                  <form
                    key={comment.id}
                    className={`my-4 flex relative ${
                      displayComment ? "block" : "hidden"
                    }`}
                    onSubmit={handleSubmit(onSubmitComment)}
                  >
                    <img
                      src={unknown}
                      alt=""
                      className="w-[50px] h-[50px] ml-4"
                    />
                    <input
                      type="text"
                      placeholder="Enter comment..."
                      {...register("editComment")}
                      defaultValue={comment.content}
                      className="mx-4 px-4 border-1 border-gray w-full rounded-5"
                    />
                    <button className="absolute right-8 top-4 text-xl text-green hover:opacity-80">
                      <IoSend />
                    </button>
                  </form>
                ) : (
                  <div
                    key={comment.id}
                    className={`mb-10 flex-col ${
                      displayComment ? "block" : "hidden"
                    }`}
                  >
                    <div className="flex items-center">
                      <img
                        src={unknown}
                        alt=""
                        className="w-[50px] h-[50px] ml-4"
                      />
                      <div className="ml-4 bg-aqua rounded-5 py-2 px-4">
                        <div className="flex items-center gap-2">
                          <h2>{(comment?.author?.email.split("@"))[0]}</h2>
                          <span className="text-xs text-placeholder">
                            {comment?.updatedAt
                              ? `${comment?.updatedAt?.split("T")[0]}, ${
                                  String(new Date(comment?.updatedAt)).split(
                                    " "
                                  )[4]
                                }`
                              : `${comment?.createdAt?.split("T")[0]}, ${
                                  String(new Date(comment?.createdAt)).split(
                                    " "
                                  )[4]
                                }`}
                          </span>
                        </div>
                        <p className="text-sm font-normal">{comment.content}</p>
                      </div>
                      {(
                        trip?.author?.id !== meId
                          ? comment?.author?.id === meId
                          : true
                      ) ? (
                        <div className="relative">
                          <div
                            className="flex justify-center items-center cursor-pointer ml-2 p-2 hover:bg-gray rounded-[50%]"
                            id={comment.id}
                            onClick={(e) => handleDisplayUtil(e)}
                          >
                            <BsThreeDots
                              id={comment.id}
                              onClick={(e) => handleDisplayUtil(e)}
                            />
                          </div>
                          {displayUtility && utility.id === comment.id ? (
                            <div className="absolute top-0 left-12 border-1 border-gray rounded-5 cursor-pointer">
                              <p
                                id={comment.id}
                                className="pt-2 pl-2 pr-8 hover:bg-gray rounded-t-5"
                                onClick={(e) => handleChooseUtil(e)}
                              >
                                Edit
                              </p>
                              <p
                                id={comment.id}
                                className="pt-2 pl-2 pr-8 pb-2 hover:bg-gray rounded-b-5"
                                // onClick={(e) => handleChooseUtil(e)}
                                onClick={(e) => {
                                  setUtil(e);
                                  setOpenModal(true);
                                }}
                                // onClick={() => setOpenModal(true)}
                              >
                                Delete
                              </p>
                              {/* Modal */}
                              {openModal && (
                                <>
                                  <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                      {/*content*/}
                                      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none p-3">
                                        <button
                                          className="flex justify-end p-1 ml-autoborder-0 bg-white text-red float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                          onClick={() => setOpenModal(false)}
                                        >
                                          <span className="bg-white text-black h-6 w-6 text-3xl block outline-none focus:outline-none hover:opacity-[0.5]">
                                            ×
                                          </span>
                                        </button>
                                        {/*header*/}
                                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                          <h3 className="text-3xl font-semibold">
                                            Do you want to delete this comment?
                                          </h3>
                                        </div>
                                        {/*footer*/}
                                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                          <button
                                            className="bg-gray text-black active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => setOpenModal(false)}
                                          >
                                            Close
                                          </button>
                                          <button
                                            className="bg-danger text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg hover:opacity-[0.8] outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            // onClick={() => setOpenModal(false)}
                                            onClick={() =>
                                              handleChooseUtil(util)
                                            }
                                          >
                                            Delete
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                                </>
                              )}
                              {/* Modal */}
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                    <span
                      className={`ml-24 text-xs hover:opacity-80 cursor-pointer ${
                        comment.hasLiked ? "text-light-blue" : ""
                      }`}
                      id={comment.id}
                      onClick={(e) => handleLikeComment(e)}
                    >
                      {comment?.numOfLikes || ""}{" "}
                      {comment?.numOfLikes > 1 ? "Likes" : "Like"}
                    </span>
                    <span
                      className="ml-2 text-xs hover:opacity-80 cursor-pointer"
                      id={comment.id}
                      onClick={(e) => handleDisplayReply(e)}
                    >
                      Reply
                    </span>
                    {replies.length > 0 ? (
                      replies.map((reply, i) =>
                        utility.value === "Edit" &&
                        utility.id === reply.id &&
                        reply.commentId === comment.id ? (
                          <form
                            key={i}
                            className={`ml-20 mt-4 flex relative ${
                              utility.id === reply.id ? "block" : "hidden"
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
                              {...register("editReply")}
                              className="mx-4 px-4 border-1 border-gray w-full rounded-5"
                            />
                            <button className="absolute right-8 top-4 text-xl text-green hover:opacity-80">
                              <IoSend />
                            </button>
                          </form>
                        ) : (
                          <>
                            {reply.commentId === comment.id ? (
                              <div>
                                <div
                                  key={reply.id}
                                  className="flex items-center ml-20 mt-2"
                                >
                                  <img
                                    src={unknown}
                                    alt=""
                                    className="w-[50px] h-[50px] ml-4"
                                  />
                                  <div className="ml-4 bg-aqua rounded-5 py-2 px-4">
                                    <div className="flex items-center gap-2">
                                      <h2>
                                        {(reply?.author?.email?.split("@"))[0]}
                                      </h2>
                                      <span className="text-xs text-placeholder">
                                        {reply?.updatedAt
                                          ? `${
                                              reply?.updatedAt?.split("T")[0]
                                            }, ${
                                              String(
                                                new Date(reply?.updatedAt)
                                              ).split(" ")[4]
                                            }`
                                          : `${
                                              reply?.createdAt?.split("T")[0]
                                            }, ${
                                              String(
                                                new Date(reply?.createdAt)
                                              ).split(" ")[4]
                                            }`}
                                      </span>
                                    </div>
                                    <p className="text-sm font-normal">
                                      {/* <span key={i} className="text-light-blue">
                                        @
                                        {
                                          (comment?.author?.email?.split(
                                            "@"
                                          ))[0]
                                        }{" "}
                                      </span> */}
                                      {reply.content}
                                    </p>
                                  </div>
                                  {trip?.author?.id !== meId ? (
                                    reply?.author?.id === meId
                                  ) : true ? (
                                    <div className="relative">
                                      <div
                                        className="cursor-pointer ml-2 p-2 hover:bg-gray rounded-[50%]"
                                        id={reply.id}
                                        onClick={(e) => handleDisplayUtil(e)}
                                      >
                                        <BsThreeDots
                                          id={reply.id}
                                          onClick={(e) => handleDisplayUtil(e)}
                                        />
                                      </div>
                                      {displayUtility &&
                                      utility.id === reply.id ? (
                                        <div className="absolute top-0 left-12 border-1 border-gray rounded-5 cursor-pointer">
                                          <p
                                            id={reply.id}
                                            className="pt-2 pl-2 pr-8 hover:bg-gray rounded-t-5"
                                            onClick={(e) => handleChooseUtil(e)}
                                          >
                                            Edit
                                          </p>
                                          <p
                                            id={reply.id}
                                            className="pt-2 pl-2 pr-8 pb-2 hover:bg-gray rounded-b-5"
                                            // onClick={() => handleChooseUtil(util)}
                                            onClick={(e) => {
                                              setUtil(e);
                                              setOpenModal(true);
                                            }}
                                          >
                                            Delete
                                          </p>
                                          {/* Modal */}
                                          {openModal && (
                                            <>
                                              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                                  {/*content*/}
                                                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none p-3">
                                                    <button
                                                      className="flex justify-end p-1 ml-autoborder-0 bg-white text-red float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                      onClick={() =>
                                                        setOpenModal(false)
                                                      }
                                                    >
                                                      <span className="bg-white text-black h-6 w-6 text-3xl block outline-none focus:outline-none hover:opacity-[0.5]">
                                                        ×
                                                      </span>
                                                    </button>
                                                    {/*header*/}
                                                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                                      <h3 className="text-3xl font-semibold">
                                                        Do you want to delete
                                                        this comment?
                                                      </h3>
                                                    </div>
                                                    {/*footer*/}
                                                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                                      <button
                                                        className="bg-gray text-black active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                        type="button"
                                                        onClick={() =>
                                                          setOpenModal(false)
                                                        }
                                                      >
                                                        Close
                                                      </button>
                                                      <button
                                                        className="bg-danger text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg hover:opacity-[0.8] outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                        type="button"
                                                        // onClick={() => setOpenModal(false)}
                                                        onClick={() =>
                                                          handleChooseUtil(util)
                                                        }
                                                      >
                                                        Delete
                                                      </button>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                                            </>
                                          )}
                                          {/* Modal */}
                                        </div>
                                      ) : (
                                        <></>
                                      )}
                                    </div>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                                <span
                                  className={`ml-24 text-xs hover:opacity-80 cursor-pointer ${
                                    reply.hasLiked ? "text-light-blue" : ""
                                  }`}
                                  id={reply.id}
                                  onClick={(e) => handleLikeComment(e)}
                                >
                                  {reply?.numOfLikes || ""}{" "}
                                  {reply?.numOfLikes > 1 ? "Likes" : "Like"}
                                </span>
                                {/* <span
                                  className="ml-2 text-xs hover:opacity-80 cursor-pointer"
                                  id={reply.id}
                                  onClick={(e) => handleDisplayReply(e)}
                                >
                                  Reply
                                </span> */}
                                {utility.value === "Reply" &&
                                utility.id === reply.id ? (
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
                                ) : (
                                  <></>
                                )}
                              </div>
                            ) : (
                              <></>
                            )}
                          </>
                        )
                      )
                    ) : (
                      <></>
                    )}
                    {utility.value === "Reply" && utility.id === comment.id ? (
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
                    ) : (
                      <></>
                    )}
                  </div>
                )
              )
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
