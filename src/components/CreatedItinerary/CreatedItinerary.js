import "@reach/combobox/styles.css";
import React, { useState} from "react";
import { FaCalendarAlt } from "react-icons/fa";
import destination1 from "../../assests/images/Destination1.png";
import destination2 from "../../assests/images/Destination2.png";
import destination3 from "../../assests/images/Destination3.png";
import destination4 from "../../assests/images/Destination4.png";
import { AiFillCaretUp } from "react-icons/ai";
import { HiLocationMarker } from "react-icons/hi";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper";
import { v4 as uuidv4 } from "uuid"
 
function CreatedItinerary() {
  const [show,setShow]= useState(true);
  const handleShow = () => {
    setShow(!show);
    console.log(show);
  };
  const tripName = "My Trip to the Future";
  const locations = [
    {
      num: 1,
      location: "Quán Cafe Túi Mơ To",
      date: "2/6/2021",
      image: [
        destination1,
        destination2,
        destination1,
        destination2,
        destination1,
      ],
      description:
        "Macbeth returns to his castle, followed almost immediately by King Duncan. The Macbeths plot together to kill Duncan and wait until everyone is asleep. At the appointed time, Lady Macbeth gives the guards drugged wine so Macbeth can enter and kill the King. He regrets this almost immediately, but his wife reassures him.",
    },
    {
      num: 2,
      location: "Chợ đêm",
      date: " 3/6/2021",
      image: [destination3, destination4],
      description:
        "Macbeth returns to his castle, followed almost immediately by King Duncan. The Macbeths plot together to kill Duncan and wait until everyone is asleep. At the appointed time, Lady Macbeth gives the guards drugged wine so Macbeth can enter and kill the King. He regrets this almost immediately, but his wife reassures him.",
    },
    {
      num: 3,
      location: "Cây thông cô đơn",
      date: " 3/6/2021",
      image: [destination3, destination4],
      description:
        "Macbeth returns to his castle, followed almost immediately by King Duncan. The Macbeths plot together to kill Duncan and wait until everyone is asleep. At the appointed time, Lady Macbeth gives the guards drugged wine so Macbeth can enter and kill the King. He regrets this almost immediately, but his wife reassures him.",
    },
  ];

  return (
    <div className="flex flex-col justify-center mx-auto mt-10 w-[1100px]">
      <div className="border-1 border-gray flex flex-col justify-between w-full h-full mb-10 rounded-10 shadow-lg overflow-y-auto pb-10">
        <h1 className="text-3xl text-center mb-5 mt-10 ">{tripName}</h1>
        <div className="flex justify-start w-full ">
          <h1 className="text-2xl text-left justify-start font-bold underline ml-10 mb-5 ">
            Itinerary
          </h1>
        </div>

        {locations.map((location) => {
          return (
            <div 
            key={uuidv4()}
            >
              <div className="flex justify-between w-100 py-[5px] ">
                <AiFillCaretUp className="my-auto text-2xl ml-10" onClick={() => handleShow()}></AiFillCaretUp>
                <span className="text-xl pl-4">Location {location.num}</span>
                <span className="flex  pl-4 align-middle w-[8rem] items-center">
                  <FaCalendarAlt className=" my-auto" />
                  <p className="ml-2">{location.date}</p>
                </span>
                <div className="flex-grow border-t-[0.7px] my-auto mx-4"></div>
              </div>
             
              <div className={"flex flex-col items-center mb-5 "+(show? "hidden":"")}>
                <div className="flex justify-left w-4/5 mt-3">
                  <HiLocationMarker className="my-auto" />
                  <span className="text-base ml-2">{location.location}</span>
                </div>
                <div className="flex justify-left w-4/5 mt-3">
                  <span className="text-base ml-2 font-light">
                    {location.description}
                  </span>
                </div>
                <div className="flex justify-center gap-1 w-4/5 mt-3">
                  <Swiper
                    slidesPerView={
                      location.image.length < 3 ? location.image.length : 3
                   }
                   
                    spaceBetween={30}
                    freeMode={true}
                    pagination={{
                      clickable: true,
                    }}
                    modules={[FreeMode, Pagination]}
                    className="mySwiper"
                  >
                    {location.image.map((img) => {
                      return (
                          <SwiperSlide key={uuidv4()}>
                            {" "}
                            <img
                              src={img}
                              alt=""
                              className="w-[250px] h-[250px]"
                            />{" "}
                          </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CreatedItinerary;
