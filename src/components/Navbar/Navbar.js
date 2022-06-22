import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assests/images/logo.png";
import unknown from "../../assests/images/unknown.png";
import { GoSearch, GoGlobe } from "react-icons/go";
import { FaMapMarkedAlt, FaSignOutAlt } from "react-icons/fa";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { FiChevronDown } from "react-icons/fi";
import { AiFillSetting } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { getSearchResponse, logOut } from "../../redux/actions";
import { useForm } from "react-hook-form";
import api from "../../api/axios";

const Navbar = () => {
  const homeRef = useRef();
  const tripRef = useRef();
  const createRef = useRef();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userInfo = useSelector((state) => state.user);
  const [displayOut, setDisplayOut] = useState(false);
  const [searchInfo, setSearchInfo] = useState("");
  const [searchRes, setSearchRes] = useState([]);
  const userName = localStorage.getItem("username");

  const clickColor = "text-medium-blue";

  const handleClick = useEffect(() => {
    if (location.pathname === "/home") {
      homeRef.current.classList.add(clickColor);
      tripRef.current.classList.remove(clickColor);
      createRef.current.classList.remove(clickColor);
    } else if (location.pathname === "/trips") {
      tripRef.current.classList.add(clickColor);
      homeRef.current.classList.remove(clickColor);
      createRef.current.classList.remove(clickColor);
    } else if (
      location.pathname === "/create" ||
      location.hash === "#overview"
    ) {
      createRef.current.classList.add(clickColor);
      homeRef.current.classList.remove(clickColor);
      tripRef.current.classList.remove(clickColor);
    } else {
      createRef.current.classList.remove(clickColor);
      homeRef.current.classList.remove(clickColor);
      tripRef.current.classList.remove(clickColor);
    }
  }, [location]);

  const accessToken = localStorage
    .getItem("accessToken")
    ?.toString()
    .split('"')[1];

  const config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
    params: {
      search: searchInfo,
    },
  };

  if (accessToken) {
    config.headers.Authorization = `bearer ${accessToken}`;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setSearchInfo("");
  }, []);

  const onSubmit = (data) => {
    console.log(data);
    // setSearchInfo(data.search);
    handleSearch(data.search);
  };

  const handleSearch = async (info) => {
    let res = await api
      .get("/trips", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Authorization": `bearer ${accessToken}`
        },
        params: {
          search: info,
        },
      })
      .catch((error) => console.log(error));
    if (res) {
      console.log(res.data);
      setSearchRes(res.data);
      dispatch(getSearchResponse(res.data));
      navigate("/trips/search");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");
    localStorage.removeItem("auth")
    dispatch(logOut());
    navigate("/sign-in");
  };

  const handleDisplayOut = () => {
    setDisplayOut(!displayOut);
  };

  return (
    <div className="bg-white w-full shadow-lg py-3 sticky top-0 left-0 z-50">
      <div className="flex items-center justify-between mx-6 ">
        <div className="flex justify-start items-center flex-1">
          <Link to="/home" className="flex mr-24">
            <img src={logo} alt="logo" className="w-9" />
            <span className="text-light-blue font-extrabold text-3xl ml-2 font-logo">
              TriPari's
            </span>
          </Link>
          <div>
            <form className="flex relative" onSubmit={handleSubmit(onSubmit)}>
              <input
                type="text"
                placeholder="Search"
                {...register("search")}
                className="pl-3 py-3 w-96 rounded-10 border-[0.2px]  border-gray focus:outline-double bg-aqua font-normal"
              ></input>
              <button className="absolute top-3 right-2 text-2xl ">
                <GoSearch />
              </button>
            </form>
          </div>
        </div>
        <div className="flex flex-1 justify-around items-center text-base ml-48">
          <Link
            to="/home"
            ref={homeRef}
            onClick={handleClick}
            className="flex flex-col items-center justify-center  hover:text-medium-blue"
          >
            <GoGlobe className="text-2xl" />
            <span className="font-normal">Home</span>
          </Link>
          <Link
            to="/trips"
            ref={tripRef}
            onClick={handleClick}
            className="flex flex-col items-center justify-center  hover:text-medium-blue"
          >
            <FaMapMarkedAlt className="text-2xl" />
            <span className="font-normal">Trips</span>
          </Link>
          <Link
            to="/create"
            ref={createRef}
            onClick={handleClick}
            className="flex flex-col items-center justify-center  hover:text-medium-blue"
          >
            <BsFillPlusCircleFill className="text-2xl" />
            <span className="font-normal">Create</span>
          </Link>
        </div>
        <div className="flex flex-1 justify-end items-center">
          <img src={unknown} alt="unknown" className="w-10 h-10" />
          <Link to="/user" className="ml-5">
            {userName}
          </Link>
          <button
            className="ml-5 translate-y-[1px] relative"
            onClick={handleDisplayOut}
          >
            <FiChevronDown className=" hover:bg-gray rounded-[50%]" />
            <div
              className={`${
                displayOut ? "block" : "hidden"
              } absolute top-[30px] right-0 bg-white shadow-md border-1 border-gray rounded-5`}
            >
              <div className="flex pl-4 pr-16 pt-4 pb-2 font-normal">
                <AiFillSetting className="text-2xl mr-4" />
                Settings
              </div>
              <div
                className="flex pl-4 pr-16 pt-2 pb-4 font-normal"
                onClick={handleLogout}
              >
                <FaSignOutAlt className="text-2xl mr-4" />
                Logout
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
