import React, { useState } from "react";
import { useForm } from "react-hook-form";
import logo from "../../assests/images/logo.png";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import api from "../../api/axios";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    handleForgetPassword(data);
  };

  const handleForgetPassword = async (data) => {
    let res = await api
      // .post("/api/users/forgot-password", {
      .post("/users/forgot-password", {
        email: data.account,
      })
      .catch((error) => {
        console.log(error);
        // alert(error.response.data.detail);
      });

    if (res) {
      setSuccess("Check your email to reset password");
      // alert("Check your email to reset password");
    }

    console.log(res.data);
  };

  return (
    <div className="bg-sign-in bg-no-repeat bg-center bg-cover h-screen flex items-center justify-center">
      <div className="bg-modal shadow-xl w-2/5 h-3/5 py-10 rounded-10 flex flex-col items-center justify-center">
        <div className="flex flex-col justify-left items-center ">
          <img src={logo} alt="logo" width={50} height={50} />
          <span className="text-white font-extrabold text-5xl mt-2 ml-2 font-logo">
            TriPari's
          </span>
        </div>
        <div className="flex flex-col justify-left items-center text-white mt-3">
          Forgot your password?
        </div>
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          {success ? (
            <>
              <div className="bg-light-success border-1 border-success text-success py-2 px-2 mt-3 rounded-3 relative text-center">
                <span class="block sm:inline">{success}</span>
              </div>
            </>
          ) : (
            <></>
          )}
          <input
            type="text"
            {...register("account", {
              required: "You must specify an email",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email format",
              },
            })}
            placeholder="Email"
            className="outline-medium-blue border-solid border-gray border-1 mt-8 py-2 w-72 p-3 rounded-3 font-normal text-sm"
          />
          {errors?.account && (
            <p className="text-xs mt-2 font-normal text-danger before:inline before:content-['⚠'] ">
              {errors?.account?.message}
            </p>
          )}
          <button className="bg-light-blue py-[0.6rem] mt-4 mb-2 font-semibold text-white rounded-3 hover:opacity-90 hover:text-gray">
            Send request
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
