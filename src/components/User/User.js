import React, { useEffect, useState } from "react";
import des4 from "../../assests/images/Destination4.png";
import unknown from "../../assests/images/unknown.png";
import { FaSuitcaseRolling } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import pnf from "../../assests/images/pnf.png";

const User = () => {
  const [users, setUsers] = useState([]);
  const searchRes = useSelector((state) => state.searchRes);

  const filterUser = (searchRes) => {
    let temp = [];
    temp = searchRes.filter((res) => {
      if (!temp.includes(res?.author?.email)) {
        return temp.push(res?.author?.email);
      }
    });
    setUsers(temp);
  };

  useEffect(() => {
    filterUser(searchRes);
  }, [searchRes]);

  return (
    <div className="pt-8 flex px-3 flex-wrap">
      {users.length > 0 ? (
        users.map((user, index) => {
          return (
            <div key={index} className="w-[360px] relative mb-8">
              <Link to="/home">
                <img src={des4} alt="" />
                <div
                  className="bg-white absolute w-[348.7px] h-[180px] bottom-0 right-[6px] rounded-10 shadow-lg 
        flex flex-col items-center justify-center
        "
                >
                  <h1 className="text-xl mt-3">
                    {user?.author?.email.split("@")[0]}
                  </h1>
                  <h2 className="opacity-40">United States</h2>
                  <div className="mt-3 flex justify-center items-center gap-2">
                    <FaSuitcaseRolling className="text-2xl" />
                    <div className="flex flex-col justify-center">
                      <span className="leading-4">{user?.author?.numOfTrips}</span>
                      <span className="leading-4 opacity-40">Trips</span>
                    </div>
                  </div>
                </div>
                <img
                  src={unknown}
                  alt=""
                  className="w-[80px] h-[80px] absolute top-[40px] left-1/2 -translate-x-1/2 rounded-[50%] border-1 border-white"
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
    </div>
  );
};

export default User;
