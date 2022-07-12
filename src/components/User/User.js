import React, { useEffect, useState } from "react";
import city1 from "../../assests/images/city1.jpg";
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

  useEffect(() => {
    console.log(users);
  }, [users]);

  return (
    <div className="pt-8 flex px-3 flex-wrap ">
      {users.length > 0 ? (
        users.map((user, index) => {
          return (
            <div key={index} className="w-[350px] h-[300px] relative mb-8 mr-2">
              <Link to="/home">
                <img
                  src={
                    user?.author?.coverImgUrl ? user?.author?.coverImgUrl : city1
                  }
                  alt=""
                  className="w-full h-auto rounded-10"
                />
                <div
                  className="bg-white absolute w-full h-[180px] bottom-0 rounded-10 shadow-lg flex flex-col items-center justify-center"
                >
                  <h1 className="text-xl mt-3">
                    {user?.author?.email.split("@")[0]}
                  </h1>
                  <h2 className="opacity-40">{user?.author?.country}</h2>
                  <div className="mt-3 flex justify-center items-center gap-2">
                    <FaSuitcaseRolling className="text-2xl" />
                    <div className="flex flex-col justify-center">
                      <span className="leading-4">
                        {user?.author?.numOfTrips}
                      </span>
                      <span className="leading-4 opacity-40">Trips</span>
                    </div>
                  </div>
                </div>
                <img
                  src={user.author.avatarUrl ? user.author.avatarUrl : unknown}
                  alt=""
                  className="w-[80px] h-[80px] absolute top-[75px] left-1/2 -translate-x-1/2 rounded-[50%] border-1 border-white"
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
