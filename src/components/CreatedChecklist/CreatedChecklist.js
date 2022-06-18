import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { useLocation } from "react-router-dom";
import { BsCheckLg } from "react-icons/bs";

const CreatedChecklist = () => {
  const location = useLocation();

  const [checklist, setChecklist] = useState([]);

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const accessToken = localStorage
    .getItem("accessToken")
    .toString()
    .split('"')[1];

  if (accessToken) {
    config.headers.Authorization = `bearer ${accessToken}`;
  }

  const handleGetChecklist = async () => {
    let res = await api.get(
      `/trips/${location.pathname.split("/")[3]}/checklist`,
      config
    );
    if (res) {
      console.log(res.data);
      setChecklist(res.data);
    }
  };

  useEffect(() => {
    handleGetChecklist();
  }, []);

  return (
    <div className="flex flex-col justify-start h-[80vh] w-1/2 mx-auto">
      <div className="shadow-lg border-1 border-gray h-fit my-10 py-10 flex flex-col rounded-10 relative overflow-y-auto">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl ml-14">Checklist Items</h1>
          </div>
        </div>
        <div className="flex flex-col mx-16 mt-8">
          {checklist.map((item) => {
            return (
              <div
                key={item.id}
                className="flex w-full items-center pt-3 px-5 mt-8 border-2 border-t-gray border-l-0 border-r-0 border-b-0"
              >
                <div className="mr-10">{item.name}</div>
                <div className="rounded-5 py-2 px-2">{item.notes}</div>
                <div>{item.hasPrepared ? <BsCheckLg /> : <></>}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CreatedChecklist;
