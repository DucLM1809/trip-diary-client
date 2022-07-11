import React, { useEffect, useState } from "react";
import "./Profile.css";
import unknown from "../../assests/images/unknown.png";
import api from "../../api/axios";
import { AiOutlineUser } from "react-icons/ai";
import { BsGenderAmbiguous, BsEnvelope } from "react-icons/bs";
import { BiWorld } from "react-icons/bi";
import { RiCake2Line} from "react-icons/ri";
import { format } from "date-fns";
import axios from "axios";

const MyProfile = () => {
  const [infor, setInfor] = useState();
  const userName = localStorage.getItem("username");
  const config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
  };

  const accessToken = localStorage
    .getItem("accessToken")
    .toString()
    .split('"')[1];

  if (accessToken) {
    config.headers.Authorization = `bearer ${accessToken}`;
  }

  const handleGetInfor = async () => {
    let res = await api
      .get(`/users/me`, config)
      .catch((error) => console.log(error));
    if (res) {
      setInfor(res.data);
    }
  };

  useEffect(() => {
    handleGetInfor();
    
  }, []);

  return (
    <>
      <div className="flex items-end absolute left-[410px] boder-1 border-gray w-[950px] h-[80px]  bg-[#2C3639] mt-4 z-10">
        <p className="font-black text-5xl text-white pb-2 pl-8 cursor-default">
          My Profile
        </p>
      </div>
      <div className="flex flex-col justify-center mx-auto mt-14 w-[1100px] ">
        <div className="containner bg-[#DCD7C9] flex flex-col justify-between w-full  mb-10 pb-32 rounded-10  overflow-y-auto pb-10 ">
          <div className="flex justify-around items-center w-full h-[250px] mt-12  ">
            <div className="flex flex-col justify-center h-[150px] w-[250px]">
              <img
                src={infor ? (infor.avatarUrl? infor.avatarUrl : unknown) : unknown}
                alt="avatar"
                className="mx-auto flex avatar  h-[150px] w-[150px] aspect-square object-cover"
              ></img>
              <div className="flex mx-auto mt-4 text-xl text-center font-black ">
                <h1>{infor ? (infor.username ? infor.username : userName) :userName}</h1>
              </div>
            </div>
            <div className="flex h-[150px] w-[650px] ">
              <img
                src={infor ? (infor.coverImgUrl ? infor.coverImgUrl : "https://thuthuatnhanh.com/wp-content/uploads/2020/01/background-powerpoint-dep.jpg") : "https://thuthuatnhanh.com/wp-content/uploads/2020/01/background-powerpoint-dep.jpg" }
                alt="cover"
                className="object-cover h-[150px] w-[650px]  "
              ></img>
            </div>
          </div>

          <div className="flex justify-left w-full pl-36 mt-8">
            <div className="text-3xl mr-6">
              <AiOutlineUser />
            </div>
            <div className="mr-[300px]">
              <span className="font-medium  text-lg">First Name: </span>
              {infor ? (
                <span className="text-xl">
                  {infor.firstName ? infor.firstName : "N/A"}
                </span>
              ) : (
                <></>
              )}
            </div>
            <div className="">
              <span className="font-medium text-lg">Last Name: </span>
              {infor ? (
                <span className="text-xl">
                  {infor.lastName ? infor.lastName : "N/A"}
                </span>
              ) : (
                <></>
              )}
            </div>
          </div>

          <div className="flex justify-left w-full pl-36 mt-8">
            <span className="text-3xl mr-6">
              <BsGenderAmbiguous />
            </span>
            <span className="font-medium  text-lg">Gender: </span>
            
            {infor ? (
              <span className="text-xl ml-2">
                {infor.isFemale === null
                  ? "N/A"
                  : infor.isFemale
                  ? " Female"
                  : " Male"}
              </span>
            ) : (
              <></>
            )}
          </div>

          <div className="flex justify-left w-full pl-36 mt-8">
            <span className="text-3xl mr-6">
              <BsEnvelope />
            </span>
            <p className="font-medium  text-lg">Email: </p>
            {infor ? <span className="text-xl ml-2"> {infor.email}</span> : <></>}
          </div>

          <div className="flex justify-left w-full pl-36 mt-8">
            <span className="text-3xl mr-6">
              <BiWorld />
            </span>
            <p className="font-medium  text-lg">Country: </p>
            {infor ? <span className="text-xl ml-2"> {infor.country ? infor.country : "N/A"}</span> : <></>}
          </div>

          <div className="flex justify-left w-full pl-36 mt-8">
            <span className="text-3xl mr-6">
              <RiCake2Line />
            </span>
            <p className="font-medium  text-lg">Day of birth: </p>
            {infor ? <span className="text-xl ml-2"> {infor.dateOfBirth ? format(Date.parse(infor.dateOfBirth), "MMMM do, yyyy ") : "N/A"}</span> : <></>}
          </div>

          <div className="flex justify-center flex-col items-center w-full  mt-8">
           
            <p className=" underline text-lg">About me </p>
            {infor ? <div className="text-md ml-2 font-medium"> {infor.description ? infor.description : "N/A"}</div> : <></>}
          </div>


        </div>
      </div>
    </>
  );
};

export default MyProfile;
