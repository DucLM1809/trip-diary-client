import React, { useEffect, useState } from "react";
import logo from "../../assests/images/logo.png";
import { useParams } from "react-router-dom";
import api from "../../api/axios";

const RemindTrip = () => {
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const { id } = useParams();

  const accessToken = localStorage.getItem("accessToken")
    ? JSON.parse(localStorage.getItem("accessToken"))
    : null;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (accessToken) {
    config.headers.Authorization = `bearer ${accessToken}`;
  }
  const getErrorMessageFromServer = (error) => {
    const errorMessage = error.response
      ? error.response.data.detail || error.response.detail[0].msg
      : "Oops, something went wrong. Try later!";
    return errorMessage;
  };

  const handleRemindTrip = async () => {
    const res = await api
      .post(`/trips/${id}/remind-again`, {}, config)
      .catch((e) => setErr(getErrorMessageFromServer(e)));
    if (res) {
      setSuccess(
        "You will receive one more reminder email about your upcoming trip!"
      );
    }
  };
  useEffect(() => {
    handleRemindTrip();
  }, []);

  return (
    <div className="bg-sign-in bg-no-repeat bg-center bg-cover h-screen flex items-center justify-center">
      <div className="bg-modal shadow-xl w-2/5 py-10 rounded-10 flex flex-col items-center justify-center">
        <div className="flex flex-col justify-center items-center">
          <img src={logo} alt="logo" className="w-9" />
          <span className="text-white font-extrabold text-3xl ml-2 font-logo">
            TriPari's
          </span>
          {!err ? (
            <div className="bg-light-success border-1 border-success text-success py-2 px-2 mt-3 rounded-3 relative text-center">
              <span className="block sm:inline">{success}</span>
            </div>
          ) : (
            <div className="bg-light-pink border-1 border-red text-red py-2 px-2 mt-3 rounded-3 relative text-center">
              <span className="block sm:inline">{err}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RemindTrip;
