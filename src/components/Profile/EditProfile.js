import React, { useEffect, useState } from "react";
import "./Profile.css";
import unknown from "../../assests/images/unknown.png";
import api from "../../api/axios";
import { AiOutlineUser } from "react-icons/ai";
import { BsGenderAmbiguous, BsEnvelope, BsInfoCircle,  } from "react-icons/bs";
import { BiWorld } from "react-icons/bi";
import { RiCake2Line} from "react-icons/ri";
import COUNTRYDATA from '../../data/countries.json';
import { useForm } from "react-hook-form";
import { MdOutlineFemale,MdOutlineMale} from "react-icons/md"
import { ImPencil2 } from "react-icons/im"
import { uploadFileToBlob } from "../../utils/uploadFileToBlob";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";



const EditProfile = () => {
  const sasToken = useSelector((state) => state.user.sasToken);
  const [infor, setInfor] = useState({
    id : "",
    username : "",
    firstName : "",
    lastName : "",
    isFemale : null,
    dateOfBirth : null,
    country : "",
    description : "",
    avatarUrl : "",
    coverImgUrl : "",
    isAdmin : "",
    numOfTrips : 0,
  });
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");

    const [nickname,setNickname] = useState(null);
    const [fname,setFname] = useState();
    const [lname,setLname] = useState();
    const [gender,setGender] = useState();
    const [mail,setMail] = useState();
    const [ country,setCountry] = useState();
    const [DOB,setDOB] = useState();
    const [description,setDescriptrion] = useState();
    const [avatarUrl,setAvatarUrl] = useState();
    const [coverUrl,setCoverUrl] = useState();

    const [cities,setCities] = useState();
    const [suggestions,setSuggestions] = useState();

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    mail ? <></> : setMail(infor.Email)
    handleEditProfile(data);
  };

  const handleEditProfile = async (data) => {
    let res = await api
      .put(`/users/${infor.id}`, {
        id: infor.id,
        email: mail,
        username : nickname,
        firstName : fname,
        lastName : lname,
        isFemale : gender,
        country : country,
        dateOfBirth : DOB,
        avatarUrl : avatarUrl,
        coverImgUrl : coverUrl,
        description : description,
        createdAt : infor.createdAt,
        isAdmin : infor.isAdmin,
        numOfTrips: infor.numOfTrips,
      },config)
      .catch((error) => {
        setErr(error.response.data.detail);
        setSuccess("");
        
      });
      (res) ? setSuccess("Saved") : setSuccess("")
      console.log(res);
  };

  useEffect(() => {
    handleGetInfor();
    setErr("");
    setSuccess("");
  }, []);

  

  const handleUploadImg = (e) => {
    uploadFileToBlob(e.target.files[0], sasToken).then((result) => {
      e.target.name === "avatarUrl"?
      setAvatarUrl(result) : setCoverUrl(result)
    });
  };

  useEffect(() => {
    setNickname(infor.username);
    setFname(infor.firstName);
    setLname(infor.lastName);
    setMail(infor.email);
    setCountry(infor.country);
    setGender(infor.isFemale);
    setDOB(infor.dateOfBirth);
    setDescriptrion(infor.description);
    setAvatarUrl(infor.avatarUrl);
    setCoverUrl(infor.coverImgUrl);
  }, [infor]);

  const handleChecked = () => {
    setGender(!gender)
  }

//   const CountryAutocomplete = ({
//   }) => {
//     const handleSelect = async (data) => {
//     };

//     return (
//       <Combobox aria-labelledby="demo">
//         <ComboboxInput value={country} onChange={e=> setCountry(e.target.value)}/>
//         <ComboboxPopover>
//           <ComboboxList>
//           {COUNTRYDATA.map((data) => {
//                 return(

//           <ComboboxOption value={data.name} />)})}
       
//             {/* {COUNTRYDATA.filter((val)=>{
//                 if(country==""){
//                   return val
//                 } else if (val.name.toLocaleLowerCase().includes(country.toLocaleLowerCase())){
//                   return val
//                 }
//               }).map((data) => {
//                 return(

// <ComboboxOption value={data.name} />
//                 )
//               })} */}
//           </ComboboxList>
//         </ComboboxPopover>
//       </Combobox>
//     );
//   };
  return (
    <>
    
      <div className="flex items-end absolute left-[410px] boder-1 border-gray w-[950px] h-[80px]  bg-[#2C3639] mt-4 z-10">
        <p className="font-black text-5xl text-white pb-2 pl-8 cursor-default">
         Edit My Profile
        </p>
      </div>
      <div className="flex flex-col justify-center mx-auto mt-14 w-[1100px] ">
        <div className="containner bg-[#DCD7C9] flex flex-col justify-between w-full  mb-10 pb-32 rounded-10  overflow-y-auto pb-10 ">
          <div className="flex justify-around items-center w-full h-[250px] mt-12  ">
            <div className="avatarContainner flex relative justify-center items-center h-[150px] w-[250px]">
            <input
                     
                      type="file"
                      {...register(`avatarUrl`)}
                      onChange={(e) => handleUploadImg(e)}
                      className="absolute h-[120px] w-[120px] z-20 opacity-0"
                    />
              <ImPencil2 className="absolute h-[75px] w-[75px]  editImg  transition delay-150 "/>
              <img
                src={infor ? (avatarUrl? avatarUrl : unknown) : unknown}
                alt="avatar"
                className="mx-auto flex avatar h-[150px] w-[150px]  "
              ></img>
            </div>
            <div className="flex h-[150px] w-[650px] coverContainner relative justify-center items-center ">
            <input
                     
                      type="file"
                      {...register(`coverUrl`)}
                      onChange={(e) => handleUploadImg(e)}
                      className="absolute h-[120px] w-[120px] z-20 opacity-0"
                    />
            <ImPencil2 className="absolute h-[75px] w-[75px]  editImg  transition delay-150  "/>
              <img
                src={infor ? (coverUrl ? coverUrl : "https://thuthuatnhanh.com/wp-content/uploads/2020/01/background-powerpoint-dep.jpg") : "https://thuthuatnhanh.com/wp-content/uploads/2020/01/background-powerpoint-dep.jpg" }
                alt="cover"
                className="cover object-cover h-[150px] w-[650px]  "
              ></img>
            </div>
          </div>
        <form className="flex flex-col" onSubmit={handleSubmit()}></form>
          <div className="flex justify-left w-full pl-36 mt-8">
          <div className="text-3xl mr-6">
              <BsInfoCircle />
            </div>
            <span className="font-medium  text-lg">Nick Name: </span>
                {nickname !=null ? <></>: setNickname(userName)}
                <input type="text" className="text-lg ml-4 w-[300px] border-2 border-black" value={nickname}  onChange={e=> setNickname(e.target.value)} ></input>
              </div>

          <div className="flex justify-left w-full pl-36 mt-8">
            <div className="text-3xl mr-6">
              <AiOutlineUser />
            </div>
            <div className="mr-[50px]">
              <span className="font-medium  text-lg">First Name: </span>
              <input type="text" className="text-lg ml-4 w-[250px] border-2 border-black" value={fname}  onChange={e=> setFname(e.target.value)} ></input>
            </div>
            <div className="">
              <span className="font-medium text-lg">Last Name: </span>
              <input type="text" className="text-lg ml-4 w-[250px] border-2 border-black" value={lname}  onChange={e=> setLname(e.target.value)} ></input>
            </div>
          </div>

          <div className="flex justify-left w-full pl-36 mt-8">
            <span className="text-3xl mr-6">
              <BsGenderAmbiguous />
            </span>
            <span className="font-medium  text-lg">Gender: </span>
            <MdOutlineFemale className="text-3xl ml-20"/>
            <input type="Checkbox" className="text-lg  w-[50px] border-2 border-black" checked={gender}  onChange={handleChecked} ></input>
            <MdOutlineMale className="text-3xl ml-32"/>
            <input type="Checkbox" className="text-lg  w-[50px] border-2 border-black" checked={!gender}  onChange={handleChecked} ></input>
            {/* {console.log(gender)} */}
          </div>

          {/* <div className="flex justify-left w-full pl-36 mt-8">
            <span className="text-3xl mr-6">
              <BsEnvelope />
            </span>
            <p className="font-medium  text-lg">Email: </p>
            <input type="text" {...register("Email", {
                  
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Invalid email format",
                  },
                })} className="text-lg ml-4 w-[450px] border-2 border-black" value={mail}  onChange={e=> setMail(e.target.value)} ></input>
                {errors?.Email && (
                <p className="text-xs mt-2 font-normal text-danger before:inline before:content-['⚠'] ">
                  {errors?.Email?.message}
                </p>
              )}
          </div> */}

          <div className="flex justify-left w-full pl-36 mt-8 ">
            <span className="text-3xl mr-6">
              <BiWorld />
            </span>
            <p className="font-medium  text-lg">Country: </p>
            {/* <CountryAutocomplete/> */}
            {/* <input type="text" className="text-lg ml-4 w-[250px] border-2 border-black" value={country}  onChange={e=> setCountry(e.target.value)} ></input> */}
            <select className="text-lg ml-4 w-[250px] border-2 border-black" onChange={e=> setCountry(e.target.value)}>
              {COUNTRYDATA.map((data) => {
                return(
                  <option >{data.name}</option>
                )
              })}
            </select>
          </div>

          <div className="flex justify-left w-full pl-36 mt-8">
            <span className="text-3xl mr-6">
              <RiCake2Line />
            </span>
            <p className="font-medium  text-lg">Day of birth: </p>
            <input type="date" {...register(`DoB`)}className="text-lg ml-4  border-2 border-black" value={DOB}  onChange={e=> setDOB(e.target.value)} ></input>
            {/* {console.log(DOB)} */}
          </div>

          <div className="flex justify-center flex-col items-center w-full  mt-8">
           
            <p className=" underline text-lg">About me </p>
            <textarea rows="5" cols="60" className="text-lg ml-4 font-medium border-2 border-black" value={description}  onChange={e=> setDescriptrion(e.target.value)} ></textarea>
          </div>

          <button
                  className="block py-2 px-6 text-lg bg-light-blue text-white rounded-5 hover:bg-medium-blue shadow-lg mt-10 w-[130px] mx-auto"
                  onClick={handleSubmit(onSubmit)}
                >
                  SAVE
                </button>
                {success ? (
              <>
                <div className="bg-light-success border-1 border-success text-success py-2 px-2 mx-auto my-3 rounded-3 relative text-center w-[200px]">
                  <span className="block sm:inline">{success}</span>
                  
                </div>
              </>
            ) : (
              <></>
            )}
            {err ? (
                <>
                  <div className="bg-light-pink border-1 border-red text-red py-2 px-3 mt-3 rounded-3 relative text-center">
                    <span className="block sm:inline">{err}</span>
                  </div>

                </>
              ) : (
                <></>
              )}
          
        </div>
      </div>
    </>
  );
};

export default EditProfile;
