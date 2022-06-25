import React,{ useState, useEffect } from "react";
import { Link } from "react-router-dom";
import des5 from "../../assests/images/Destination5.png";
import des6 from "../../assests/images/Destination6.jpg";
import city from "../../assests/images/city.jpg";
import api from "../../api/axios";
import unknown from "../../assests/images/unknown.png";
import { useSelector } from "react-redux";
import pnf from "../../assests/images/pnf.png";
import { v4 as uuidv4 } from "uuid";


const Trip = () => {
  const searchRes = useSelector((state) => state.searchRes);
  const [visible, setVisible] = useState(6);

  const showMoreTrips = () =>{
    setVisible(prevValue => prevValue + 6); 
  }

  return (
    <div className="pt-8 flex gap-4 px-3 flex-wrap">
      {searchRes.length > 0 ? (
        searchRes.slice(0 , visible).map((res, index) => {
          return (
            <div
              key={index}
              className="w-[468px] relative mb-8 hover:scale-[1.02] hover:duration-[0.1s] hover:ease-in"
            >
              <Link to={`/trips/trip/${res.id}`} key={uuidv4()}>
                <img
                  src={res?.coverImgUrl || city}
                  alt=""
                  className="w-full h-full rounded-10 object-cover opacity-100"
                />
                <div className="w-full h-full bg-black absolute top-0 left-0 right-0 bottom-0 opacity-20 rounded-10"></div>
                <div className="absolute text-white font-bold bottom-10 left-8 text-2xl">
                  {res?.name}
                </div>
                <div className="absolute flex justify-center items-center text-white w-[100px] h-[30px] bg-black opacity-60 bottom-10 right-8 rounded-5">
                  {res?.numOfLikes} {res?.numOfLikes > 1 ? 'likes' : 'like'}
                </div>
                <img
                  src={unknown}
                  alt=""
                  className="absolute top-10 right-8 w-[50px] h-[50px] border-2 border-white rounded-[50%]"
                />
                
              </Link>
            </div>
            

          );

        })
        
      ) : (
        <>
          <img src={pnf} alt="" className="m-auto" />
        </>
      )}
      <div className="flex mx-auto">
      <button onClick={showMoreTrips}
       className=" flex justify-center">LOAD MORE
       </button>
       </div>

      {/* <button className="block bg-light-blue text-white rounded-5 py-2 px-10 hover:bg-medium-blue shadow-lg mx-auto mb-10">
        LOAD MORE
      </button> */}
    </div>
  );
};

export default Trip;
